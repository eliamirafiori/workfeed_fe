/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode for better development experience (optional)
  reactStrictMode: true,

  // Environment variables can be used directly here, for example:
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
  },

  // Rewrites configuration to proxy requests to your backend
  async rewrites() {
    console.log("DEBUGGING PUBLIC API URL");
    console.log(process.env.NEXT_PUBLIC_API_URL); // Debugging line

    return [
      {
        source: "/endpoint/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // Proxy to Backend
      },
      {
        source: "/data/:path*",
        destination: `${process.env.NEXT_PUBLIC_MEDIA_URL}/data/:path*`,
      },
    ];
  },

  // Set custom headers for all pages, for example, to handle CORS issues, security headers, etc.
  /*
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            // Replace with your domain
            // value: "*", // Replace with your frontend's origin
            value: "https://work-feed-be.onrender.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept- Version, Content - Length, Content - MD5, Content - Type, Date, X - Api - Version",
          },
        ],
      },
    ];
  },
  */
};

export default nextConfig;
