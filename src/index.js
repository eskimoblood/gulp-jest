import jest from 'jest-cli';
import gutil from 'gulp-util';
import through2 from 'through2';

export default (options = {}) => {
  return through2.obj((file, enc, cb) => {
    options = Object.assign({
      config: {
        rootDir: file ? file.path : undefined
      }
    }, options);

    jest.runCLI(options, options.config.rootDir, (result) => {
      if(result.numFailedTests) {
        cb(new gutil.PluginError('gulp-jest', { message: 'Tests Failed' }));
      } else {
        cb();
      }
    });
  })
};
