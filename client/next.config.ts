import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  webpack: (config, { isServer }) => {
    // Only add these loaders for client-side compilation
    if (!isServer) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
            },
          },
        ],
      });
    }
    return config;
  },
  
  transpilePackages: [
    '@mui/x-data-grid',
    '@mui/material',
    '@mui/system',
    '@mui/icons-material'
  ],
};

export default nextConfig;