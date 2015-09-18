import any from 'lodash/collection/any';
import npm from 'npm';
import findup from 'findup-sync';
import path from 'path';

export function npmInstall() {
  return new Promise((resolve) => {
        npm.load(() => npm.commands.install(resolve));
  });
}

export function needsInstall(deps) {
  return any(deps, (dep) => dep.isInstalled != dep.packageWanted);
}

export function findPackageJson() {
  return path.dirname(findup('package.json'));
}
