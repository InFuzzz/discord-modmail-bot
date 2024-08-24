const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');

const logFilePath = path.join(__basedir, 'logs/full.log');
const errorFilePath = path.join(__basedir, 'logs/error.log');

fs.writeFileSync(logFilePath, '');
fs.writeFileSync(errorFilePath, '');

const logger = {
  info: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgCyan('[INFO]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [INFO] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  },
  command: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgBrightMagenta('[COMMAND]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [COMMAND] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  },
  error: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgBrightRed('[ERROR]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [ERROR] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(errorFilePath, `${logMessage}\n`);
  },
  loading: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgBlue('[LOADING]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [LOADING] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  },
  warn: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgBrightYellow('[WARN]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [WARN] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  },
  cron: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgBlue('[CRON]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [CRON] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  },
  ok: (message, extra = '') => {
    const formattedMessage = `${colors.gray(getTimestamp())} ${colors.bgGreen('[LOADED]')} : ${message} ${formatExtra(extra)}`;
    const logMessage = `${getTimestamp()} [LOADED] : ${message} ${formatExtra(extra)}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, `${logMessage}\n`);
  }
};

function getTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function formatExtra(extra) {
  if (typeof extra === 'object') {
    try {
      return JSON.stringify(extra, null, 2);
    } catch (error) {
      return '[Object cannot be stringified]';
    }
  }
  return extra;
}

module.exports = logger;
