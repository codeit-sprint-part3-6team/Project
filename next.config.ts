import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // SVG 파일을 찾습니다.
      use: [
        {
          loader: '@svgr/webpack', // SVGR 로더 사용
          options: {
            icon: true, // 기본적으로 SVG를 아이콘 크기로 조정
          },
        },
      ],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
