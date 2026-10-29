# Unggah satu file ke G3 bucket konten dari PC: python alat/unggah-g3.py <file> <key>
import sys, boto3
from botocore.config import Config
env = dict(l.strip().split("=", 1) for l in open(r"E:\Rakazo\.g3-s3-konten.env") if "=" in l)
s3 = boto3.client("s3", endpoint_url=env["S3_ENDPOINT"], aws_access_key_id=env["S3_ACCESS_KEY"],
                  aws_secret_access_key=env["S3_SECRET"], region_name=env["S3_REGION"], config=Config(s3={"addressing_style": "path"}, retries={"max_attempts": 10, "mode": "standard"}))
f, key = sys.argv[1], sys.argv[2]
s3.upload_file(f, "konten", key, ExtraArgs={"ContentType": "video/mp4" if f.endswith(".mp4") else "image/png"})
print("G3", key)
