import os
import re

FRONTEND_DIR = r"c:\Users\jhaad\acmwebsite\frontend\src"

def fix_urls():
    for root, dirs, files in os.walk(FRONTEND_DIR):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Find the old fallback and replace it with a PROD-aware fallback
                new_content = content.replace(
                    "import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'",
                    "import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://acmwebsite.onrender.com/api/' : 'http://127.0.0.1:8000/api/')"
                )

                if new_content != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated {file}")

if __name__ == "__main__":
    fix_urls()
