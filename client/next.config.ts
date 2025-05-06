import type { NextConfig } from "next";

const path = require('path');
const { i18n } = require('./next-i18next.config')

const nextConfig: NextConfig = {
  reactStrictMode: true,

  i18n,
  
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),  // Points @/ to src/
      '@/types': path.resolve(__dirname, 'src/types')
    };
    config.resolve.plugins = config.resolve.plugins || [];

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