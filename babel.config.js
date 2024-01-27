module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: {
          '@/api/': './app/api',
          '@/assets': './app/assets',
          '@/components': './app/components/',
          '@/config': './app/config/',
          '@/constants': './app/constants',
          '@/hooks': './app/hooks',
          '@/navigator': './app/navigator',
          '@/screens': './app/screens',
          '@/services': './app/services',
          '@/store': './app/store',
          '@/theme': './app/theme',
          '@/types': './app/types/',
          '@/utils': './app/utils/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
