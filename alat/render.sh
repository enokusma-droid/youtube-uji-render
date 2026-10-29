#!/usr/bin/env bash
# Push, render di GitHub Actions, tunggu, unduh, buat grid frame QC, pastikan video ada di G3.
# Pakai (dari E:\youtube-proyek\render-wb): bash alat/render.sh <kode> [semua|whiteboard-video-skill|handanim]
set -euo pipefail
KODE="$1"; TOOL="${2:-semua}"
R=enokusma-droid/youtube-uji-render
export GH_TOKEN="$(gh auth token -u enokusma-droid)"  # per proses, JANGAN gh auth switch
cd "$(dirname "$0")/.."
# kunci sederhana supaya 2 render paralel tidak bentrok di git
until mkdir .git/render.lock 2>/dev/null; do sleep 3; done; trap 'rmdir .git/render.lock 2>/dev/null || true' EXIT
git add -A "proyek/$KODE" .github alat pustaka
git -c user.name="faceless-ci" -c user.email="ci@nusawebsite.com" commit -qm "proyek $KODE" || true
git pull -q --rebase origin main || true
git push -q origin HEAD
rmdir .git/render.lock; trap - EXIT
gh workflow run render.yml -R $R -f kode="$KODE" -f tool="$TOOL"
# cari run milik kode ini (run-name "render <kode> <tool>"), aman bila beberapa render jalan bersamaan
ID=""; for i in $(seq 1 30); do sleep 5; ID=$(gh run list -R $R -w render.yml -L 20 --json databaseId,displayTitle,status -q "[.[]|select(.displayTitle==\"render $KODE $TOOL\" and .status!=\"completed\")][0].databaseId // empty"); [ -n "$ID" ] && break; done
[ -n "$ID" ] || { echo "run tidak ditemukan"; exit 1; }
echo "run $ID: https://github.com/$R/actions/runs/$ID"
while [ "$(gh run view $ID -R $R --json status -q .status)" != completed ]; do sleep 20; done
gh run view $ID -R $R --json conclusion,jobs -q '.conclusion+" | "+([.jobs[]|.steps[]|select(.name|test("whiteboard|handanim|Simpan"))|select(.conclusion!="skipped")|"\(.name)=\(.conclusion) \(.startedAt[11:19])-\(.completedAt[11:19])"]|join("; "))'
OUT="proyek/$KODE/hasil-ci"; rm -rf "$OUT"
gh run download $ID -R $R -D "$OUT"
for f in $(find "$OUT" -name "*.mp4"); do
  n=$(basename "$f" .mp4)
  echo "$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f") dtk"
  ffmpeg -v error -y -i "$f" -vf "fps=1/15,scale=384:-1,tile=4x3" -frames:v 1 "$OUT/grid-$n.png"
  # G3 dari Actions kadang putus → unggah ulang dari PC (idempoten)
  python alat/unggah-g3.py "$f" "youtube/$KODE/$n.mp4"
done
echo "LIHAT grid: $OUT/grid-*.png  ·  embed md: /media/g3/konten/youtube/$KODE/<tool>.mp4"
