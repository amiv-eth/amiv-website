import { verbose } from './config';

/**
 * Print `log message` to the console if verbose is enabled.
 *
 * @param {*} message log message to be printed to the console.
 */
export function log(message) {
  if (verbose === true) console.log(message);
}

/**
 * Print `error message` to the console if verbose is enabled.
 *
 * @param {*} message error message to be printed to the console.
 */
export function error(message) {
  if (verbose === true) console.error(message);
}
