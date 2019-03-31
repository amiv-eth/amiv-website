function copyToClipboard(text, inputElement) {
  const input = inputElement;
  input.value = text;
  input.focus();
  input.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy', err);
  }
}

export { copyToClipboard };
