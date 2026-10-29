# Unggah proyek/<kode>/hasil/* ke G3 bucket konten: youtube/<kode>/
import os, sys, glob, boto3
from botocore.config import Config
d = sys.argv[1].rstrip("/"); kode = os.path.basename(d)
s3 = boto3.client("s3", endpoint_url=os.environ["S3_ENDPOINT"], aws_access_key_id=os.environ["S3_ACCESS_KEY"],
                  aws_secret_access_key=os.environ["S3_SECRET"], region_name=os.environ.get("S3_REGION", "auto"),
                  config=Config(s3={"addressing_style": "path"}, retries={"max_attempts": 10, "mode": "standard"}))
fs = glob.glob(os.path.join(d, "hasil", "*"))
for f in fs:
    key = f"youtube/{kode}/{os.path.basename(f)}"
    s3.upload_file(f, "konten", key, ExtraArgs={"ContentType": "video/mp4" if f.endswith(".mp4") else "image/png"})
    print("G3", key)
if not any(f.endswith(".mp4") for f in fs): sys.exit("tidak ada mp4")
