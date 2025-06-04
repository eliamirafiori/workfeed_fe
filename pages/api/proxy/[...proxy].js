// pages/api/proxy.js
import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: "https://work-feed-be.onrender.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api/proxy": "", // remove base path
  },
});

export default function handler(req, res) {
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    return result;
  });
}
