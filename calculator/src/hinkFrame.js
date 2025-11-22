import { canUseSign, canUseFunc } from "./mainInformation.js";

const canUseFuncLength = [];
const inputElement = document.getElementById("input");
const container = document.getElementById("mainContainer");
const hintFrame = document.createElement("div");

hintFrame.className = "hintFrame";
hintFrame.style.minWidth = "60px";
hintFrame.style.maxWidth = "80px";
hintFrame.style.minHeight = "60px";
// hintFrame.style.border = "2px solid #000";
hintFrame.style.borderRadius = "8px";
hintFrame.style.backgroundColor = "#3271a8ff";
hintFrame.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.8)";
hintFrame.style.display = "none";
hintFrame.style.position = "fixed";

for (let i = 0; i < canUseFunc.length; i++) {
  canUseFuncLength.push(canUseFunc[i].length);
}
const maxCanUseFuncLength = Math.max(...canUseFuncLength);

container.appendChild(hintFrame);
inputElement.addEventListener("input", function (event) {
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
  const inputText = inputValue.match(/([a-zA-Z]+|[^a-zA-Z]+)/g) || [];
  console.log(`tokens: ${inputText}`);
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
  console.log(`HINK!!! ${startOffset}`);

  let tokenLength = 0;
  let cursorToken = "";
  for (let i = 0; i < inputText.length; i++) {
    tokenLength += inputText[i].length;
    if (tokenLength >= startOffset) {
      cursorToken = inputText[i];
      break;
    }
  }
  let newValue = cursorToken;
  //hint
  hintFrame.textContent = "";
  hintFrame.style.display = "none";
  console.log("The input is " + inputElement.textContent);
  if (newValue.length <= maxCanUseFuncLength && newValue.length !== 0) {
    for (let i = 0; i < canUseFunc.length; i++) {
      if (canUseFunc[i].slice(0, newValue.length) === newValue) {
        hintFrame.style.left = `${cursorLeft}px`;
        hintFrame.style.top = `${cursorTop + 5}px`;
        hintFrame.style.display = "block";
        hintFrame.innerHTML +=
          `<p style="line-height: 0">${canUseFunc[i]}<p>` + "<hr id='hinkHr'/>";
      }
    }
  }
});
