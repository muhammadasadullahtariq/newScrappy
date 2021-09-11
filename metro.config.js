/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        sourceExts: ['js', 'json', 'ts', 'tsx'],
        inlineRequires: true,
      },
      resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx'], //add here
      },
    }),
  },
};
