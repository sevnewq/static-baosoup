/**
 * CloudFront Functions - SPA Router
 * 
 * 用途: 將不帶 index.html 的目錄路徑自動導向到 index.html
 * 例如: /about -> /about/index.html
 *       /product/5 -> /product/5/index.html
 * 
 * 適用於: 所有單頁應用程序 (SPA) 和靜態網站
 */

function handler(event) {
    const request = event.request;
    const uri = request.uri;
    
    // 正規化路徑 (移除末尾的 /)
    const normalizedUri = uri.endsWith('/') ? uri.slice(0, -1) : uri;
    
    // 定義需要路由到 index.html 的路徑
    const routes = [
        '/about',
        '/product',
        '/order',
        '/order2'
    ];
    
    // 檢查是否為已知的路由
    if (routes.includes(normalizedUri)) {
        request.uri = `${normalizedUri}/index.html`;
        return request;
    }
    
    // 檢查是否為產品詳情頁 (/product/1 至 /product/15)
    const productMatch = normalizedUri.match(/^\/product\/(\d+)$/);
    if (productMatch) {
        const productId = productMatch[1];
        const id = parseInt(productId);
        
        // 確保產品 ID 在有效範圍內 (1-15)
        if (id >= 1 && id <= 15) {
            request.uri = `${normalizedUri}/index.html`;
            return request;
        }
    }
    
    return request;
}