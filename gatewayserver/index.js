import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 6969;

app.use(cors());

// Định tuyến đến các Microservices
const routes = {
    // Identity Service (Auth, User, Profile, Admin Users)
    '/v1/api/auth': 'http://localhost:6972',
    '/v1/api/login': 'http://localhost:6972',
    '/v1/api/register': 'http://localhost:6972',
    '/v1/api/verify-otp': 'http://localhost:6972',
    '/v1/api/resend-otp': 'http://localhost:6972',
    '/v1/api/refresh-token': 'http://localhost:6972',
    '/v1/api/forgot-password': 'http://localhost:6972',
    '/v1/api/profile': 'http://localhost:6972',
    '/v1/api/update-profile': 'http://localhost:6972',
    '/v1/api/user': 'http://localhost:6972',
    '/v1/api/notifications': 'http://localhost:6972',
    '/v1/api/admin/users': 'http://localhost:6972',
    '/v1/api/admin/stats/users': 'http://localhost:6972',

    // Order Service (Orders, Admin Orders)
    '/v1/api/orders': 'http://localhost:6973',
    '/v1/api/admin/orders': 'http://localhost:6973',
    '/v1/api/admin/stats/revenue': 'http://localhost:6973',

    // Payment Service
    '/v1/api/payment': 'http://localhost:6974',
    '/v1/api/voucher': 'http://localhost:6974',

    // Cart Service
    '/v1/api/cart': 'http://localhost:6970',

    // Product Service (Products, Categories, Reviews, Recommendations, Admin Products)
    '/v1/api/products': 'http://localhost:6971',
    '/v1/api/create-products': 'http://localhost:6971',
    '/v1/api/newest': 'http://localhost:6971',
    '/v1/api/best-sellers': 'http://localhost:6971',
    '/v1/api/categories': 'http://localhost:6971',
    '/v1/api/reviews': 'http://localhost:6971',
    '/v1/api/recommendations': 'http://localhost:6971',
    '/v1/api/admin/products': 'http://localhost:6971',
    '/v1/api/admin/categories': 'http://localhost:6971'
};

for (const [path, target] of Object.entries(routes)) {
    app.use(path, createProxyMiddleware({ target, changeOrigin: true }));
}

// Fallback proxy (nếu không map được, gửi tạm về productservice hoặc một service mặc định)
app.use('/v1/api', createProxyMiddleware({ target: 'http://localhost:6971', changeOrigin: true }));

app.listen(PORT, () => {
    console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});
