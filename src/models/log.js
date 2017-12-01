import { verbose } from './config';

export function log(message) {
  if (verbose === true) console.log(message);
}

export function error(message) {
  if (verbose === true) console.error(message);
}
