import mkDebug from 'debug'
import npmCheck from 'npm-check';
import {Logger} from './logger';
import {needsInstall, npmInstall, findPackageJson} from './utils';

const debug = mkDebug('npm-check-webpack-plugin');

export class DependencyCheck {

  constructor(options = { autoInstall: true }, watch) {
    this.options = options;
    this.log = new Logger(options.silent);
    this.watch = watch;
  }

  processCheck(result) {
    return new Promise((resolve, reject) => {

      debug('npm-check result:');
      debug(result);

      if (needsInstall(result)) {
        debug('Needs npm install');
        reject('NEEDS_INSTALL');
      } else {
        debug('No missing dependencies');
        resolve();
      }
    });
  }

  performCheck() {
    this.log.debug('Checking dependencies');
    let checkOptions =
      { skipUnused: true,
        path: findPackageJson()
      };

    debug('Using options for npmCheck:');
    debug(checkOptions);
    return npmCheck(checkOptions)
      .then(this.processCheck)
      .catch((reason) => {
        debug('CAUGHT ' + reason);;
        if (reason !== 'NEEDS_INSTALL') {
          throw reason;
        }

        debug('autoInstall: ' + this.options.autoInstall);

        if (this.options.autoInstall) {
          this.log.debug('Installing new dependencies...');
          return npmInstall();
        } else {
          this.log.warn('');
          this.log.warn('There are new dependencies, please run "npm install" to install them.');
          this.log.warn('');
          return 'missing_deps';
        }
      }).catch(error => {
        this.log.error('Error installing dependencies:');
        this.log.error(error);
      });
  }

  apply(context, args) {
    let callback = args[1];

    //skip checking for changes if we're in watch mode and the package.json file hasn't changed
    if(this.watch){
      try{
        let packageJson = findPackageJson() + '/package.json';
        let filesChanged = Object.keys(args[0].compiler.watchFileSystem.watcher.mtimes);

        //if there are no files changed this is probably the initial run of watch and we should check anyways
        if(filesChanged.length > 0 && filesChanged.indexOf(packageJson) === -1){
          this.log.debug('No package.json changes found');
          callback();
          return;
        }
      }catch(e){
        this.log.error(e);
      }
    }

    this.performCheck()
      .then(() => callback())
      .catch(() => callback());
  }
}
