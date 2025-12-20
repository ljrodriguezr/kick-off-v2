/* eslint-disable prefer-arrow/prefer-arrow-functions */
module.exports = {
  staticPageGenerationTimeout: 180,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['rc-util', 'rc-table', 'rc-tree'],
  async rewrites() {
    return [];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
