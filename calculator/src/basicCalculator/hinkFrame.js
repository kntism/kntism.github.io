import { canUseFuncNames } from "../mainInformation.js";

const canUseFuncLength = [];

for (let i = 0; i < canUseFuncNames.length; i++) {
  canUseFuncLength.push(canUseFuncNames[i].length);
}
const maxCanUseFuncLength = Math.max(...canUseFuncLength);

const basicCalculatorContainer = document.getElementById("basicCalculator");
let lastContent = "";
basicCalculatorContainer.addEventListener("input", function (event) {
  const inputElement = event.target;
  // let hintFrame = inputElement.nextElementSibling;
  // if (!hintFrame || !hintFrame.classList.contains("hint-frame")) {
  //   hintFrame = document.createElement("div");
  //   hintFrame.className = "abrazineGlassStyle hinkFrame";
  //   hintFrame.style.display = "none";
  //   hintFrame.style.position = "absolute";
  //   inputElement.parentNode.insertBefore(hintFrame, inputElement.nextSibling);
  // }
  const existHinkFrames = document.getElementsByClassName("hinkFrame");
  if (existHinkFrames.length > 0) {
    for (const existHinkFrame of existHinkFrames) {
      existHinkFrame.remove();
    }
  }
  const hintFrame = document.createElement("div");
  hintFrame.className = "abrazineGlassStyle hinkFrame";
  hintFrame.style.display = "none";
  inputElement.parentNode.insertBefore(hintFrame, inputElement.nextSibling);
  function getCursorGlobalPosition() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return [rect.left, rect.top];
  }
  const [cursorLeft, cursorTop] = getCursorGlobalPosition();

  //newValue
  const inputValue = inputElement.textContent || "";
  const inputText = inputValue.match(/([a-zA-Z]+|[^a-zA-Z()]+|\(|\))/g) || [];
  // const startOffset = inputElement.selectionStart;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  // 获取全局光标偏移量（核心修复）
  const getGlobalCursorOffset = (el, range) => {
    const preRange = document.createRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
  };

  // 替换原 cursorOffset 获取逻辑
  const startOffset = getGlobalCursorOffset(inputElement, range);

  let tokenLength = 0;
  let cursorToken = "";
  let index;
  for (let i = 0; i < inputText.length; i++) {
    tokenLength += inputText[i].length;
    if (tokenLength >= startOffset) {
      cursorToken = inputText[i];
      index = i;
      break;
    }
  }
  let newValue = cursorToken;
  //hint
  hintFrame.textContent = "";
  hintFrame.style.display = "none";
  if (newValue.length <= maxCanUseFuncLength && newValue.length !== 0) {
    for (let i = 0; i < canUseFuncNames.length; i++) {
      if (canUseFuncNames[i].slice(0, newValue.length) === newValue) {
        hintFrame.style.left = `${cursorLeft}px`;
        hintFrame.style.top = `${cursorTop + 50}px`;
        hintFrame.style.display = "block";
        hintFrame.innerHTML +=
          `<p style="line-height: 0">${canUseFuncNames[i]}<p>` +
          "<hr id='hinkHr'/>";
      }
    }
    if (hintFrame.lastChild) {
      hintFrame.removeChild(hintFrame.lastChild);
    }
  }

  if (
    cursorToken === "(" &&
    index !== undefined &&
    inputElement.textContent.length > lastContent.length
  ) {
    const brackets = document.createElement("span");
    brackets.textContent = ")";
    inputElement.insertBefore(brackets, inputElement.childNodes[index + 1]);

    // 设置光标位置到括号内
    const range = document.createRange();
    const selection = window.getSelection();

    // 将光标定位在 "(" 后面（即括号内开始位置）
    range.setStart(brackets.firstChild, 1); // 定位到 "(" 后，也就是 ")" 前
    range.collapse(true); // 折叠范围到起点

    // 清除现有选择并添加新范围
    selection.removeAllRanges();
    selection.addRange(range);
  }
  lastContent = inputElement.textContent;
});
