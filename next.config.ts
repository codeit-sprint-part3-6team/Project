import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'export',
  webpack(config, { isServer }) {
    // SVG 로더 추가
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

    // publicPath 설정
    config.output.publicPath = '/';

    // devServer 설정 추가 (클라이언트 전용)
    if (!isServer) {
      config.devServer = {
        ...config.devServer,
        devMiddleware: {
          publicPath: '/',
        },
      };
    }

    return config;
  },
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'], // 외부 이미지 도메인 추가
  },
};

export default nextConfig;
