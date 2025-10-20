# 煲好湯 (BaoSoup) - 靜態網站

一個現代化的靜態網站，為「煲好湯」品牌提供完整的產品展示、訂購和品牌資訊。此專案已完全準備好用於生產部署。

## 📋 目錄

- [快速開始](#快速開始)
- [專案結構](#專案結構)
- [功能特性](#功能特性)
- [部署](#部署)
- [本地開發](#本地開發)
- [技術棧](#技術棧)

## 🚀 快速開始

### 需求

- Python 3.7+
- 現代網頁瀏覽器

### 本地測試

```bash
python3 server.py
```

伺服器將在 `http://127.0.0.1:8000` 啟動。

**可訪問的頁面:**
- 首頁: http://127.0.0.1:8000/
- 關於: http://127.0.0.1:8000/about
- 產品: http://127.0.0.1:8000/product
- 產品詳情: http://127.0.0.1:8000/product/1-15
- 訂購: http://127.0.0.1:8000/order 和 /order2

## 📁 專案結構

```
static-baosoup/
├── static/                           # 靜態網站資源 (56.6 MB)
│   ├── index.html                    # 首頁
│   ├── about/index.html              # 關於頁面
│   ├── product/                      # 產品頁面
│   │   ├── index.html                # 產品列表
│   │   └── 1-15/index.html           # 15 個產品詳情頁
│   ├── order/index.html              # 訂購頁面
│   ├── order2/index.html             # 訂購頁面 v2
│   ├── css/                          # 樣式表
│   │   ├── main.css
│   │   ├── product.css
│   │   ├── order.css
│   │   └── bootstrap.min.css
│   ├── js/                           # JavaScript
│   │   ├── jquery.js
│   │   ├── bootstrap.min.js
│   │   ├── order.js
│   │   └── order2.js
│   ├── hfood/                        # 品牌資源
│   │   ├── favicon/                  # Favicon 檔案
│   │   └── images/home/              # 品牌圖片
│   ├── hproduct/                     # 49 個產品圖片
│   │   ├── *.jpg (34 個)
│   │   └── *.png (15 個)
│   ├── robots.txt                    # SEO Robots 設定
│   └── sitemap.xml                   # 網站地圖
│
├── cloudfront/                        # AWS CloudFront 配置
│   └── functions/
│       └── static-baosoup-index.js    # Functions SPA 路由器
│
├── server.py                          # 本地開發伺服器
└── README.md                          # 本文件
```

### 關鍵目錄說明

| 目錄 | 說明 | 檔案數 |
|------|------|--------|
| `static/` | 完整的靜態網站 | 133 個 |
| `static/hproduct/` | 產品圖片 | 49 個 |
| `static/hfood/images/` | 品牌圖片 | 50+ 個 |
| `cloudfront/` | AWS 部署設定 | 1 個 |

## ✨ 功能特性

### 網站功能
- ✅ 響應式設計 (桌面、平板、手機)
- ✅ 15 個產品詳情頁面
- ✅ 兩個版本的訂購系統
- ✅ 完整的品牌展示
- ✅ SEO 最佳化 (sitemap.xml, robots.txt)

### 技術特性
- ✅ 靜態檔案架構 (無伺服器)
- ✅ CDN 就緒 (AWS CloudFront)
- ✅ SPA 路由支援
- ✅ 自動 index.html 導向
- ✅ 生產環境就緒

### 圖片資源
- **49 個產品圖片**: 34 JPG + 15 PNG
- **50+ 品牌圖片**: 頁頭、頁尾、首頁、產品展示
- **自動格式檢測**: 正確的副檔名和引用

## 🚢 部署

### AWS S3 + CloudFront 部署

1. **上傳靜態檔案到 S3**
```bash
aws s3 sync static/ s3://your-bucket-name/ --delete
```

2. **創建 CloudFront 分發**
   - 來源: 您的 S3 bucket
   - Functions 關聯: 使用 `cloudfront/functions/static-baosoup-index.js`
   - 觸發事件: 檢視請求

3. **設定 CloudFront 函數**

此函數自動實現：
- 目錄路由到 `index.html` (SPA 支援)
- 產品 ID 1-15 的驗證
- 末尾斜線正規化

**路由示例:**
```
/about           → /about/index.html
/product         → /product/index.html
/product/1       → /product/1/index.html
/order           → /order/index.html
```

## 🛠️ 本地開發

### 啟動開發伺服器

```bash
python3 server.py
```

功能：
- 自動將目錄路由到 `index.html`
- 即時日誌記錄
- 404 錯誤檢測
- 快取策略測試

### 添加新產品

1. 在 `static/product/{id}/` 創建新目錄
2. 添加 `index.html` 檔案
3. 上傳產品圖片到 `static/hproduct/`
4. 若產品 ID > 15，更新 CloudFront 函數中的範圍檢查

### 更新樣式

編輯以下 CSS 檔案：
- `static/css/main.css` - 全局樣式
- `static/css/product.css` - 產品頁面
- `static/css/order.css` - 訂購頁面

## 📊 統計數據

| 項目 | 數量/大小 |
|------|---------|
| **頁面總數** | 19 個 |
| **CSS 檔案** | 5 個 |
| **JavaScript 檔案** | 4 個 |
| **產品圖片** | 49 個 |
| **品牌圖片** | 50+ 個 |
| **總大小** | 56.6 MB |
| **靜態檔案** | 133 個 |

## 🔧 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| HTML5 | Latest | 結構 |
| CSS3 | Latest | 樣式 |
| JavaScript | ES5+ | 互動 |
| Bootstrap | 4.x | 響應式框架 |
| jQuery | 3.x | DOM 操作 |
| Python | 3.7+ | 開發伺服器 |
| AWS CloudFront | - | CDN 分發 |
| AWS CloudFront Function | Node.js 14+ | 邊緣計算 |

## 🌐 瀏覽器支援

| 瀏覽器 | 支援版本 |
|--------|---------|
| Chrome | 最新 2 個版本 ✓ |
| Firefox | 最新 2 個版本 ✓ |
| Safari | 最新 2 個版本 ✓ |
| Edge | 最新 2 個版本 ✓ |
| IE 11 | 有限支援 ⚠️ |

## � 檔案清單

### 產品圖片 (49 個)

#### JPEG 圖片 (34 個)
```
1671971266_1.jpg
1671971266_2.jpg
1671971266_3.jpg
1671971266_4.jpg
1671971266_5.jpg
1671971266_6.jpg
1671971266_7.jpg
1671971266_8.jpg
1671971266_9.jpg
1671971266_10.jpg
... (以此類推到 1671971266_34.jpg)
```

#### PNG 圖片 (15 個)
```
1671971314_1.png
1671971314_2.png
1671971314_3.png
... (以此類推到 1671971314_15.png)
```

**位置:** `static/hproduct/`
**狀態:** ✅ 所有檔案已驗證，所有引用正確

### HTML 頁面 (19 個)

| 頁面 | 路徑 | 狀態 |
|------|------|------|
| 首頁 | `/` | ✅ |
| 關於 | `/about` | ✅ |
| 產品列表 | `/product` | ✅ |
| 產品 1 | `/product/1` | ✅ |
| 產品 2 | `/product/2` | ✅ |
| ... | ... | ✅ |
| 產品 15 | `/product/15` | ✅ |
| 訂購 v1 | `/order` | ✅ |
| 訂購 v2 | `/order2` | ✅ |

## 🔍 驗證和測試

### 檔案完整性檢查

所有檔案已通過以下檢查：
- ✅ 產品圖片: 49 個檔案 (34 JPG + 15 PNG)
- ✅ 品牌圖片: 50+ 個檔案
- ✅ HTML 參考: 所有 49 個產品都正確引用
- ✅ CSS 資源: 所有圖片路徑已驗證
- ✅ 無 404 錯誤

### 本地測試清單

```bash
# 1. 啟動伺服器
python3 server.py

# 2. 測試主要路由
# 在瀏覽器中訪問：
# - http://127.0.0.1:8000/
# - http://127.0.0.1:8000/about
# - http://127.0.0.1:8000/product
# - http://127.0.0.1:8000/product/1-15
# - http://127.0.0.1:8000/order
# - http://127.0.0.1:8000/order2

# 3. 檢查控制台
# 應無 JavaScript 錯誤或 404 消息
```

## 🔐 安全性

- ✅ 無任何伺服器端代碼執行
- ✅ 完全靜態檔案部署
- ✅ 支持 HTTPS/TLS (通過 CloudFront)
- ✅ 內容安全策略就緒
- ✅ 已移除所有暫時檔案

## 📦 CloudFront Functions 函數

### 功能

原始版本 (156 行) 已最佳化為 44 行，改進 71% 程式碼效率。

**新增功能:**
- 中央路由配置
- 動態產品 ID 驗證 (1-15)
- 末尾斜線正規化
- 自動 index.html 重定向

### 部署

1. 複製 `cloudfront/functions/static-baosoup-index.js` 內容
2. 在 AWS CloudFront 中創建新函數
3. 關聯到 CloudFront 分發 (檢視器請求觸發)

## ⚙️ 伺服器配置 (server.py)

本地開發伺服器具備以下功能：

```python
# 自動 SPA 路由
# 所有目錄請求 → index.html

# 功能：
- SimpleHTTPRequestHandler 子類
- 自定義 GET 請求處理
- 即時日誌記錄
- 404 檢測
- MIME 類型設定

# 啟動：
python3 server.py
```

## 🐛 故障排除

### 404 錯誤

如果看到 404 錯誤：

1. **檢查檔案存在**
```bash
ls -la static/hproduct/ | grep "\.jpg\|\.png"
```

2. **驗證 HTML 引用**
```bash
grep -r "hproduct" static/ | head -20
```

3. **檢查 CloudFront 日誌**
   - 在 AWS CloudFront 控制台中查看
   - 查看 CloudFront Function 執行日誌

### 頁面無法加載

1. 確認 S3 bucket 為公開訪問
2. 驗證 CloudFront 分發啟用
3. 檢查 CloudFront 函數是否正確關聯
4. 清除瀏覽器快取

## 📧 支持

如需幫助：

1. 檢查 CloudFront 日誌
2. 在本地使用 `python3 server.py` 測試
3. 驗證 S3 bucket 權限
4. 檢查 CORS 設定

## 📄 授權

此專案包含煲好湯品牌的靜態資源。

## 🎯 下一步

### 準備部署

- [ ] 創建 AWS S3 bucket
- [ ] 配置 bucket 為靜態網站
- [ ] 上傳 `static/` 目錄到 S3
- [ ] 創建 CloudFront 分發
- [ ] 部署 CloudFront 函數
- [ ] 設定自訂域名
- [ ] 設定 SSL/TLS 憑證
- [ ] 設定 DNS 記錄

### 功能增強

- [ ] 添加更多產品
- [ ] 最佳化圖片大小
- [ ] 添加圖片延遲載入
- [ ] 實現購物車功能
- [ ] 集成支付系統

## 📞 聯絡資訊

- 網站: https://www.baosoup.com.tw (原始)
- 專案: 靜態鏡像版本
- 最後更新: 2024

---

**專案狀態:** ✅ 生產環境就緒

所有靜態檔案已完全驗證並準備好部署到 AWS CloudFront + S3。

### 步驟 1: 下載靜態檔案

```bash
python3 scraper.py
```

該腳本會：
- 下載所有指定頁面的 HTML
- 自動下載所有相關的資源（CSS、JS、圖片等）
- 生成 `sitemap.xml`
- 生成 `robots.txt`
- 建立 CloudFront 配置指南

### 步驟 2: 建立 S3 Bucket

```bash
# 建立 bucket（使用全球唯一的名稱）
aws s3 mb s3://your-unique-bucket-name --region ap-southeast-1

# 啟用版本控制（可選但建議）
aws s3api put-bucket-versioning \
  --bucket your-unique-bucket-name \
  --versioning-configuration Status=Enabled

# 啟用伺服器端加密（推薦）
aws s3api put-bucket-encryption \
  --bucket your-unique-bucket-name \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

### 步驟 3: 建立 CloudFront Origin Access Identity (OAI)

```bash
aws cloudfront create-cloud-front-origin-access-identity \
  --cloud-front-origin-access-identity-config CallerReference=baosoup-$(date +%s),Comment="BaoSoup OAI"
```

記下返回的 ID（例如：E123456789XYZ）

### 步驟 4: 設定 S3 Bucket 政策

建立 `bucket-policy.json`：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity/E123456789XYZ"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-unique-bucket-name/*"
    }
  ]
}
```

套用政策：

```bash
aws s3api put-bucket-policy \
  --bucket your-unique-bucket-name \
  --policy file://bucket-policy.json
```

### 步驟 5: 上傳檔案到 S3

```bash
./deploy.sh your-unique-bucket-name
```

或手動上傳：

```bash
aws s3 sync ./static s3://your-unique-bucket-name/ --delete --cache-control "max-age=3600"

# 設定 assets 更長的快取時間
aws s3 cp ./static/assets s3://your-unique-bucket-name/assets/ \
  --recursive --cache-control "max-age=31536000,public"

# 設定 HTML 檔案較短的快取時間
aws s3 cp ./static s3://your-unique-bucket-name/ \
  --recursive --exclude "*" --include "*.html" \
  --cache-control "max-age=300,must-revalidate"
```

### 步驟 6: 建立 CloudFront Distribution

使用 AWS Console 或 CLI：

```bash
# 建立 CloudFront 分配（使用 JSON 設定）
aws cloudfront create-distribution --distribution-config file://cloudfront-distribution.json
```

或在 AWS Console 中：
1. 前往 CloudFront
2. 點擊「Create distribution」
3. 選擇 S3 bucket 作為 origin
4. 使用上面記下的 OAI
5. 設定 Default Root Object 為 `index.html`
6. 設定 Error Pages：
   - 403 → /index.html (HTTP 200)
   - 404 → /index.html (HTTP 200) [如果需要 SPA 路由]

### 步驟 7: 驗證部署

```bash
# 取得 CloudFront 分配 ID
aws cloudfront list-distributions --query 'DistributionList.Items[].{Id:Id,DomainName:DomainName}' --output table

# 測試訪問
curl https://your-cloudfront-domain-name/
```

## CloudFront 最佳實踐

### 快取策略

- **HTML 檔案**: 快取 5 分鐘 (300 秒) + must-revalidate
- **Assets（CSS、JS）**: 快取 1 年 (31536000 秒)
- **圖片**: 快取 1 年 (31536000 秒)

### 安全性

- 啟用 HTTPS/TLS
- 設定 Minimum TLS Version: TLSv1.2_2021
- 啟用 HTTP/2

### 性能優化

- 啟用 Gzip 壓縮
- 啟用 Brotli 壓縮（如果支援）
- 設定 Origin Shield（可選，增加成本但改善快取命中率）

## 清除快取

當更新檔案後，清除 CloudFront 快取：

```bash
# 清除所有快取
aws cloudfront create-invalidation \
  --distribution-id E123DISTRIBUTION123 \
  --paths "/*"

# 清除特定路徑
aws cloudfront create-invalidation \
  --distribution-id E123DISTRIBUTION123 \
  --paths "/index.html" "/about/*"
```

## 常見問題

### Q: 如何更新網站內容？
A: 重新執行 `python3 scraper.py`，然後 `./deploy.sh`，最後清除 CloudFront 快取。

### Q: 如何設定自訂域名？
A: 
1. 在 Route 53 或 DNS 提供商建立 CNAME 記錄
2. 指向 CloudFront 分配域名
3. 在 CloudFront 中新增備用域名 (Alternate Domain Names)
4. 上傳 SSL 證書或使用 AWS Certificate Manager (ACM)

### Q: 成本估計？
- S3 儲存: ~$0.023/GB/月
- CloudFront: ~$0.085/GB（北美）
- 通常每月 < $1（小型網站）

### Q: 如何監控？
- CloudFront Metrics: AWS Console → CloudFront → Monitoring
- S3 Access Logs: 啟用 logging
- CloudWatch: 監控請求和錯誤

## 故障排除

### 問題: 403 Forbidden 錯誤
**解決**: 確認 OAI 在 bucket 政策中正確配置

### 問題: 頁面內容過時
**解決**: 
1. 清除 CloudFront 快取
2. 檢查 Origin Shield 設定

### 問題: 圖片無法載入
**解決**: 
1. 驗證 scraper.py 下載了圖片
2. 檢查 S3 中的檔案路徑
3. 驗證 CloudFront 快取規則

## 技術細節

### Scraper 特性

- 自動追蹤相對和絕對 URL
- 過濾外部連結
- 智能路由（`/product` → `/product/index.html`）
- User-Agent 偽裝以避免被阻止
- 错误处理和重试机制

### 支援的資源類型

- HTML 頁面
- CSS 樣式表
- JavaScript 檔案
- 圖片（JPG、PNG、GIF、WebP、SVG）
- 字體（WOFF、WOFF2、TTF、EOT）
- 其他靜態資源

## 安全建議

1. 永遠不要在原始碼中儲存 AWS 認證
2. 使用 IAM 角色和政策最小化權限
3. 啟用 CloudTrail 進行審計
4. 定期檢查 S3 bucket 權限
5. 使用 bucket encryption 和 versioning
6. 限制 public access

## 許可證

此專案用於個人使用。請尊重原網站的 Terms of Service 和 robots.txt。

## 支援

如有問題，請檢查：
1. AWS CLI 是否正確安裝和設定
2. Internet 連接是否正常
3. Python 版本是否 ≥ 3.6
4. 所有依賴是否已安裝
