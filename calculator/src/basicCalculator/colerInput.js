import { canUseFunc } from "../mainInformation.js";
const inputElements = document.getElementsByClassName("input");
// const inputElement = document.getElementById("input");

const basicCalculatorContainer = document.getElementById("basicCalculator");
basicCalculatorContainer.addEventListener("input", function (event) {
  // const actualInputElement = event.target;
  // const actualContainer = actualInputElement.parentElement;
  // if (actualContainer.querySelector("p.answer")) {
  //   actualContainer.removeChild(actualContainer.querySelector("p.answer"));
  // }

  if (!event.target.classList.contains("input")) {
    return;
  }
  const inputElement = event.target;
  //获取输入内容
  const inputValue = inputElement.textContent || "";
  // const inputText = inputValue.replace(/\n/, "").match(/([a - zA - Z] +| [^ a - zA - Z] +) / g) || [];
  const inputText = inputValue.match(/([a-zA-Z]+|[^a-zA-Z]+)/g) || [];
  console.log(`START!!! tokens: ${inputText}`);
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  // 获取全局光标偏移量（核心修复）value
  const getGlobalCursorOffset = (el, range) => {
    const preRange = document.createRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
  };

  // 替换原 cursorOffset 获取逻辑
  const cursorOffset = getGlobalCursorOffset(inputElement, range);
  // const cursorOffset = range.startOffset;
  console.log(cursorOffset);

  let tokenLength = 0;
  let cursorTokenOrder = 0;
  let surplus = 0;
  for (let i = 0; i < inputText.length; i++) {
    tokenLength += inputText[i].length;
    if (tokenLength >= cursorOffset) {
      cursorTokenOrder = i;
      console.log(`inputText[i].length: ${inputText[i].length}`);
      console.log(`i: ${i}`);
      console.log(`tokenLength: ${tokenLength}`);
      console.log(`cursorOffset: ${cursorOffset}`);
      surplus =
        tokenLength === cursorOffset
          ? inputText[i].length
          : inputText[i].length - (tokenLength - cursorOffset);
      // surplus = inputText[i].length - (tokenLength - cursorOffset);
      console.log(
        `surplus: ${inputText[i].length} - (${tokenLength} - ${cursorOffset})`
      );
      break;
    }
  }

  //添加文本高亮
  inputElement.innerHTML = "";
  for (let token of inputText) {
    const span = document.createElement("span");
    if (canUseFunc.includes(token)) span.classList.add("can-use-func");
    span.textContent = token;
    inputElement.appendChild(span);
  }

  //恢复光标位置
  // 清除原有选区
  selection.removeAllRanges();
  const newRange = document.createRange();
  let container = inputElement.childNodes[cursorTokenOrder];
  if (container) {
    container = container.childNodes[0];
    newRange.setStart(container, surplus);
    selection.addRange(newRange);
  } else {
    newRange.setStart(inputElement, 0);
  }
  // 应用新的 Range（恢复光标）
});
