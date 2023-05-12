const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      assetPlugins: ["expo-asset/tools/hashAssetFiles"]
    },
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'] //add here
    },
  };
