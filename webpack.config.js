const path = require('path');

module.exports = {
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'CrocodileEngine-v'+require(path.resolve(__dirname, 'src/components/Engine.ts')).Engine.version+'.js',
    path: path.resolve(__dirname, 'build'),
  },
};