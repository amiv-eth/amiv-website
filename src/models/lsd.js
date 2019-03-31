let isEnabled = false;

export function isLsdTripEnabled() {
  return isEnabled;
}

export function setLsdTripState(state) {
  isEnabled = state;
}

export function getTadaAnimation() {
  return `animation: tada 1s linear ${Math.floor(Math.random() * 500)}ms infinite !important`;
}

export function getTada2Animation() {
  return `animation: tada2 1s linear ${Math.floor(Math.random() * 500)}ms infinite !important`;
}
