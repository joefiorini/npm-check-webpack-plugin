import any from 'lodash/collection/any';
import findup from 'findup-sync';
import path from 'path';
import {exec} from 'child_process';

export function npmInstall() {
  return new Promise((resolve, reject) => {
    exec('npm install', (error, stdout) => {
      console.log('error: ', error);
      if (error) {
        reject(error);
        return;
      }

      console.log('stdout:', stdout);
      resolve(stdout);
    });
  });
}

export function needsInstall(deps) {
  return any(deps, (dep) => dep.isInstalled != dep.packageWanted);
}

export function findPackageJson() {
  return path.dirname(findup('package.json'));
}
