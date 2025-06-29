const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const dotenv = require('dotenv');

// Dynamically load env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

module.exports = (env, argv) => {
  const mode = argv.mode || process.env.NODE_ENV || 'development';

  console.log(`🚀 [Webpack] Mode: ${mode}`);
  console.log(`📦 [Webpack] Using env file: ${envFile}`);

  return {
    mode,
    output: {
      path: join(__dirname, '../../dist/apps/server-express'),
    },
    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: mode === 'production',
        outputHashing: mode === 'production' ? 'all' : 'none',
        generatePackageJson: true,
      }),
    ],
  };
};
