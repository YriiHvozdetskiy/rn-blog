export const BASE_URL = process.env.local.APP_URL;

export const apiRoutes = {
   login: `${BASE_URL}/auth/login`,
   verify: `${BASE_URL}/auth/verify-email`,
   orders: (id) => `${BASE_URL}/account${id ? `/orders/${id}` : '/orders'}`,
}