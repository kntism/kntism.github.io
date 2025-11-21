import { canUseFunc } from "./mainInformation.js";
const inputElement = document.getElementById("input");

inputElement.addEventListener("input", function (event) {
  //获取输入内容
  const inputValue = inputElement.textContent || "";
  const inputText = inputValue.match(/([a-zA-Z]+|[^a-zA-Z]+)/g) || [];
  console.log(`tokens: ${inputText}`);
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const cursorOffset = range.startOffset;

  let lengthOffset = 0;
  let cursorTokenOrder;
  let surplus;
  for (let i = 0; i < inputText.length; i++) {
    lengthOffset += inputText[i].length;
    if (lengthOffset >= cursorOffset) {
      cursorTokenOrder = i;
      console.log(`inputText[i].length: ${inputText[i].length}`);
      console.log(`i: ${i}`);
      console.log(`lengthOffset: ${lengthOffset}`);
      console.log(`cursorOffset: ${cursorOffset}`);
      surplus = inputText[i].length - (lengthOffset - cursorOffset);
      console.log(
        `surplus: ${inputText[i].length} - (${lengthOffset} - ${cursorOffset})`
      );
      break;
    }
  }

  console.log(`coloerInput: ${inputText}`);
  let coloredText = "";
  for (let token of inputText) {
    if (canUseFunc.includes(token)) {
      coloredText += `<span class="can-use-func">${token}</span>`;
    } else {
      coloredText += `<span>${token}</span>`;
    }
  }
  inputElement.innerHTML = coloredText;

  //恢复光标位置
  // 清除原有选区
  selection.removeAllRanges();
  const newRange = document.createRange();
  let container = inputElement.childNodes[cursorTokenOrder];
  if (container) {
    container = container.childNodes[0];
    newRange.setStart(container, surplus);
  }
  // 应用新的 Range（恢复光标）
  selection.addRange(newRange);
});
