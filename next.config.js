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
  // Turbopack configuration (Next.js 16+)
  // Turbopack automatically handles fallbacks like fs, so no additional config needed
  turbopack: {},
};
