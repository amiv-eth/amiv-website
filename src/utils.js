function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function copyToClipboard(element, text = null) {
  const htmlElement = element;

  if (text) {
    htmlElement.innerHTML = text;
    // Wait for some time until the DOM has been updated.
    await sleep(1000);
  }

  const range = document.createRange();
  range.selectNode(htmlElement);
  window.getSelection().addRange(range);

  let successful = false;

  try {
    successful = document.execCommand('copy');
  } catch (err) {
    console.log(`Oops, unable to copy "${text}"!`);
    console.log(err);
    successful = false;
  }

  window.getSelection().removeAllRanges();

  return successful;
}

export { copyToClipboard, sleep };
