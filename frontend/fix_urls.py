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

                # Replace standard quotes
                new_content = re.sub(
                    r"['\"]http://127\.0\.0\.1:8000/api/([^'\"]*)['\"]",
                    r"`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}\1`",
                    content
                )
                
                # Replace backticks (template literals)
                new_content = re.sub(
                    r"`http://127\.0\.0\.1:8000/api/([^`]+)`",
                    r"`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}\1`",
                    new_content
                )

                if new_content != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated {file}")

if __name__ == "__main__":
    fix_urls()
