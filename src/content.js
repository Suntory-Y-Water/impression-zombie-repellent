function simulateInput(element, value) {
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
}

function simulateSpaceAndBackspace(element) {
  element.value += ' ';
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.value = element.value.slice(0, -1);
  element.dispatchEvent(new Event('input', { bubbles: true }));
}

function waitForElementToDisplay(selector, time) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (document.querySelector(selector) !== null) {
        clearInterval(intervalId);
        resolve(document.querySelector(selector));
      }
    }, time);
  });
}

async function processInputValue(value) {
  const addButton = await waitForElementToDisplay(
    'a[aria-label="ミュートする単語またはフレーズを追加"]',
    500,
  );
  addButton.click();

  const inputElement = await waitForElementToDisplay('input[name="keyword"]', 500);
  simulateInput(inputElement, value);

  inputElement.blur();
  await new Promise((r) => setTimeout(r, 500));

  inputElement.focus();
  simulateSpaceAndBackspace(inputElement);
  await new Promise((r) => setTimeout(r, 500));

  inputElement.blur();
  const saveButton = await waitForElementToDisplay('div[data-testid="settingsDetailSave"]', 500);
  if (!saveButton.hasAttribute('disabled')) {
    saveButton.click();
    console.log(`登録した単語 : ${value}`);
  } else {
    console.log(`登録できませんでした : ${value}`);
  }
}

async function processInputValues(values) {
  for (let value of values) {
    await processInputValue(value);
    await new Promise((r) => setTimeout(r, 1000));
  }
}

window.alert('該当ページを開きました！');
const values = [
  'ا',
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ك',
  'ل',
  'م',
  'ن',
  'ه',
  'و',
  'ي',
];
processInputValues(values);
