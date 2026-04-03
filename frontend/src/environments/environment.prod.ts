/**
 * Production API base (HTTPS). Baked in at `ng build --configuration production`.
 * Replace `YOUR_API_HOST` with your deployed backend host (no trailing slash before `/api`).
 * Example: `https://budget-api.onrender.com/api`
 */
export const environment = {
  production: true,
  apiBaseUrl: 'https://YOUR_API_HOST/api'
};
