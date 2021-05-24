const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

class LoggerService {
  constructor(route) {
    this.log_data = null;
    this.route = route;
    const options = {
      file: {
        level: 'info',
        filename: `${appRoot}/logs/${route}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      fileErr: {
        level: 'error',
        filename: `${appRoot}/logs/${route}-error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      },
    };

    const log = createLogger({
      transports: [
        new transports.File(options.file),
        new transports.File(options.fileErr),
        new transports.Console(options.console),
      ],
      format: combine(
        format.timestamp(),
        format.align(),
        format.printf((info) => {
          let message = `${[
            info.timestamp,
          ]} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
          message = info.obj
            ? message + `data:${JSON.stringify(info.obj)} | `
            : message;
          message = this.log_data
            ? message + `log_data:${JSON.stringify(this.log_data)} | `
            : message;
          return message;
        })
      ),
      exitOnError: false, // do not exit on handled exceptions
    });
    this.logger = log;
  }

  setLogData(log_data) {
    this.log_data = log_data;
  }

  async info(message) {
    this.logger.log('info', message);
  }

  async info(message, obj) {
    this.logger.log('info', message, { obj });
  }

  async debug(message) {
    this.logger.log('debug', message);
  }

  async debug(message, obj) {
    this.logger.log('debug', message, { obj });
  }

  async error(message) {
    this.logger.log('error', message);
  }

  async error(message, obj) {
    this.logger.log('error', message, { obj });
  }
}

// create a stream object with a 'write' function that will be used by `morgan`\

LoggerService.stream = {
  write: function (message, encoding) {
    LoggerService.info(message);
  },
};

module.exports = LoggerService;
