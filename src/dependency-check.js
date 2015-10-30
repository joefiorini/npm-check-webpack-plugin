import mkDebug from 'debug'
import npmCheck from 'npm-check';
import {Logger} from './logger';
import {needsInstall, npmInstall, findPackageJson} from './utils';

const debug = mkDebug('npm-check-webpack-plugin');

export class DependencyCheck {

  constructor(options = { autoInstall: true }) {
    this.options = options;
    this.log = new Logger(options.silent);
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
        console.error('Error installing dependencies:');
        console.error(error);
      });
  }

  apply(context, args) {
    let callback = args[1];

    this.performCheck()
      .then(() => callback())
      .catch(() => callback());
  }
}
