import {DependencyCheck} from './dependency-check';

export default class NpmCheckPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('run', new DependencyCheck(this.options));
    compiler.plugin('watch-run', new DependencyCheck(this.options, true));
  }
}
