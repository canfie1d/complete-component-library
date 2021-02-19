module.exports = api => {
  const env = api.env();

  let dev = false;
  let modules;

  switch (env) {
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
    case 'dist-prod':
    case 'esm':
    default:
      modules = false;
      break;
    // case 'cjs':
    //   modules = 'commonjs';
  }

  return {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-object-rest-spread'],
  };
};
