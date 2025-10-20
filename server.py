#!/usr/bin/env python3
"""
本地 HTTP 測試伺服器
用於驗證靜態網站的內容和結構
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path
from datetime import datetime

# 設定
PORT = 8000
STATIC_DIR = "./static"
HOSTNAME = "127.0.0.1"


class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """自訂 HTTP 處理器，支援 SPA 路由"""

    def __init__(self, *args, directory=None, **kwargs):
        self.directory = directory
        super().__init__(*args, directory=directory, **kwargs)

    def end_headers(self):
        """添加自訂標頭以最佳化快取測試"""
        self.send_header("Cache-Control", "max-age=0")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        super().end_headers()

    def do_GET(self):
        """處理 GET 請求"""
        path = self.translate_path(self.path)

        # 日誌記錄
        print(f"[{self._get_timestamp()}] GET {self.path} -> {path}")

        # 檢查路徑是否存在
        if os.path.isdir(path):
            # 如果是目錄，查找 index.html
            index_path = os.path.join(path, "index.html")
            if os.path.exists(index_path):
                print(f"  ✓ 找到: index.html")
                self.path = self.path.rstrip("/") + "/index.html"
                return super().do_GET()
            else:
                print(f"  ✗ 警告: 找不到 index.html")
                self.send_error(404, "index.html not found")
                return

        # 正常檔案請求
        if os.path.exists(path):
            print(f"  ✓ 檔案存在")
            return super().do_GET()
        else:
            print(f"  ✗ 找不到: {path}")
            self.send_error(404, "File not found")
            return

    def _get_timestamp(self):
        """取得時間戳"""
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def log_message(self, format, *args):
        """關閉預設日誌，使用自訂日誌"""
        pass


def check_static_files():
    """檢查靜態檔案完整性"""
    print("\n📂 檢查靜態檔案完整性...")
    print("=" * 60)

    required_files = [
        "index.html",
        "about/index.html",
        "product/index.html",
        "order/index.html",
        "order2/index.html",
        "sitemap.xml",
        "robots.txt",
        "css/main.css",
        "js/jquery.js",
    ]

    missing = []
    for file_path in required_files:
        full_path = os.path.join(STATIC_DIR, file_path)
        if os.path.exists(full_path):
            size = os.path.getsize(full_path)
            print(f"✓ {file_path:40s} ({size:,} bytes)")
        else:
            print(f"✗ {file_path:40s} (缺失)")
            missing.append(file_path)

    print("=" * 60)
    if missing:
        print(f"\n⚠️  警告: 缺失 {len(missing)} 個檔案")
        return False
    else:
        print("\n✅ 所有必需檔案都存在")
        return True


def print_header():
    """列印頁面標題"""
    print(
        f"""
╔════════════════════════════════════════════════════════╗
║                                                        ║
║      🌐 BaoSoup 靜態網站本地測試伺服器                     ║
║                                                        ║
╚════════════════════════════════════════════════════════╝

⏰ 開始時間: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
🌍 訪問地址: http://{HOSTNAME}:{PORT}/
📁 靜態目錄: {os.path.abspath(STATIC_DIR)}/

🔗 快速連結:
   • 首頁: http://{HOSTNAME}:{PORT}/
   • 關於: http://{HOSTNAME}:{PORT}/about
   • 產品: http://{HOSTNAME}:{PORT}/product
   • 訂購: http://{HOSTNAME}:{PORT}/order

📊 功能:
   • 自動路由到 index.html
   • 即時日誌記錄
   • 快取策略測試
   • 404 錯誤檢查

⌨️  操作:
   • 開啟瀏覽器: http://{HOSTNAME}:{PORT}/
   • 停止服務: Ctrl+C
   • 檢視日誌: 即時輸出
"""
    )


def print_test_urls():
    """列印測試 URL"""
    print("\n" + "=" * 60)
    print("📝 推薦測試 URL")
    print("=" * 60)

    test_urls = [
        ("首頁", f"http://{HOSTNAME}:{PORT}/"),
        ("關於頁面", f"http://{HOSTNAME}:{PORT}/about"),
        ("產品列表", f"http://{HOSTNAME}:{PORT}/product"),
        ("產品詳情 #1", f"http://{HOSTNAME}:{PORT}/product/1"),
        ("訂購頁面", f"http://{HOSTNAME}:{PORT}/order"),
        ("訂購頁面2", f"http://{HOSTNAME}:{PORT}/order2"),
        ("Sitemap", f"http://{HOSTNAME}:{PORT}/sitemap.xml"),
        ("Robots", f"http://{HOSTNAME}:{PORT}/robots.txt"),
        ("CSS", f"http://{HOSTNAME}:{PORT}/css/main.css"),
        ("JS", f"http://{HOSTNAME}:{PORT}/js/jquery.js"),
    ]

    for name, url in test_urls:
        print(f"\n{name:15s} → {url}")


def start_server():
    """啟動 HTTP 伺服器"""
    # 改變到靜態檔案目錄
    os.chdir(STATIC_DIR)

    # 檢查檔案完整性
    if not check_static_files():
        print("\n⚠️  部分檔案缺失，但伺服器會嘗試啟動...")

    # 列印標題
    print_header()

    # 列印測試 URL
    print_test_urls()

    # 建立伺服器
    handler = lambda *args, **kwargs: CustomHTTPHandler(*args, directory=None, **kwargs)

    try:
        with socketserver.TCPServer((HOSTNAME, PORT), handler) as httpd:
            print("\n" + "=" * 60)
            print(f"✅ 伺服器運行中... 按 Ctrl+C 停止")
            print("=" * 60 + "\n")

            # 自動開啟瀏覽器
            try:
                webbrowser.open(f"http://{HOSTNAME}:{PORT}/")
                print("🌐 已開啟瀏覽器\n")
            except Exception as e:
                print(f"⚠️  無法自動開啟瀏覽器: {e}\n")

            # 啟動伺服器
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n\n⏹️  伺服器已停止")
        sys.exit(0)
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n❌ 連接埠 {PORT} 已被使用")
            print(f"\n💡 解決方案:")
            print(f"   1. 停止其他佔用連接埠的服務")
            print(f"   2. 或使用不同的連接埠: python3 server.py --port 8080")
        else:
            print(f"\n❌ 錯誤: {e}")
        sys.exit(1)


def main():
    """主函數"""
    import argparse

    global PORT

    parser = argparse.ArgumentParser(description="本地 HTTP 測試伺服器")
    parser.add_argument(
        "--port", type=int, default=8000, help="伺服器連接埠 (預設: 8000)"
    )
    parser.add_argument(
        "--host", type=str, default="127.0.0.1", help="伺服器主機名 (預設: 127.0.0.1)"
    )
    parser.add_argument(
        "--check", action="store_true", help="只檢查檔案完整性，不啟動伺服器"
    )

    args = parser.parse_args()

    PORT = args.port

    # 檢查靜態目錄是否存在
    if not os.path.isdir(STATIC_DIR):
        print(f"❌ 錯誤: 找不到靜態目錄 '{STATIC_DIR}'")
        print(f"\n💡 請確保在 static-baosoup 目錄中運行此腳本")
        sys.exit(1)

    # 如果只檢查，就檢查並退出
    if args.check:
        check_static_files()
        sys.exit(0)

    # 啟動服務器
    start_server()


if __name__ == "__main__":
    main()
