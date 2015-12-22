import chalk from 'chalk';

export class Logger {
  constructor(silent = false) {
    this.silent = silent;
  }

  debug(msg) {
    this.print('log', msg);
  }

  warn(msg) {
    this.print('warn', msg, chalk.yellow);
  }

  error(msg) {
    this.print('error', msg, chalk.red);
  }

  print(level, msg, formatter = (msg) => msg) {
    if (this.silent && level !== 'error') return;

    console[level].apply(console, [formatter(msg)]);
  }
}

