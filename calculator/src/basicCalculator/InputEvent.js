import { calculate } from "../math.js";
const basicCalculatorContainer = document.getElementById("basicCalculator");
const keysPressed = new Set();
function focusOnDiv(divElement) {
  divElement.focus();
  // 将光标移到末尾
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(divElement);
  range.collapse(false); // false 表示光标放在内容末尾
  selection.removeAllRanges();
  selection.addRange(range);
}

function showResult(actualInputElement, container) {
  if (container.querySelector("p.answer")) {
    container.removeChild(container.querySelector("p.answer"));
  }
  const result = calculate(actualInputElement.value);
  const answerElement = document.createElement("p");
  answerElement.className = "answer";
  container.appendChild(answerElement);
  const resultContent = ` ${result}`;
  // answerElement.textContent = resultContent;
  let i = 0; // 声明并初始化计数器
  const typingInterval = setInterval(function () {
    if (i < resultContent.length) {
      if (answerElement.parentNode) {
        // 确保元素还存在
        answerElement.textContent += resultContent[i];
        i++;
      } else {
        clearInterval(typingInterval); // 元素被删除时清除定时器
      }
    } else {
      clearInterval(typingInterval);
    }
  }, 40);
}

basicCalculatorContainer.addEventListener("keydown", function (event) {
  keysPressed.add(event.key);
  //actual
  const actualInputElement = event.target;
  const container = actualInputElement.parentElement;
  const actualInputFrame = actualInputElement.parentElement.parentElement;
  //
  const inputFrames = document.getElementsByClassName("inputFrame");
  const inputElements = document.getElementsByClassName("mf");

  if (event.key === "Enter") {
    // 检查当前元素是否是 math-field 或者是否有其他默认的 Enter 键行为
    // 在 mathlive 中，Enter 键可能有默认行为，所以先检查是否已被处理
    if (event.defaultPrevented) {
      // 如果默认行为已经被处理，则不执行我们的逻辑
      return;
    }

    // 检测是否有特殊键组合 (如 Shift+Enter, Ctrl+Enter 等)
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      // 如果有特殊键组合，保留原始行为
      return;
    }
    event.preventDefault();
    const inputFrame = document.createElement("div");
    inputFrame.className = "inputFrame";

    const inputIndex = document.createElement("div");
    inputIndex.className = "inputIndex";

    inputIndex.textContent = "1";

    const inputDetails = document.createElement("div");
    inputDetails.className = "inputDetails";

    const input = document.createElement("math-field");
    input.className = "mf";
    // input.contentEditable = "true";

    // 组装元素结构
    inputDetails.appendChild(input);
    inputFrame.appendChild(inputIndex);
    inputFrame.appendChild(inputDetails);

    // 添加到容器中
    basicCalculatorContainer.insertBefore(
      inputFrame,
      actualInputFrame.nextSibling
    );
    const inputIndexes = document.getElementsByClassName("inputIndex");
    for (let i = 0; i < inputIndexes.length; i++) {
      inputIndexes[i].textContent = i + 1;
    }

    // 聚焦到新创建的输入框
    focusOnDiv(input);
  }
  if (
    event.key === "Delete" ||
    (event.key === "Backspace" && actualInputElement.value.length === 0)
  ) {
    event.preventDefault();
    if (inputFrames.length > 1) {
      const currentIndex = Array.prototype.indexOf.call(
        inputElements,
        actualInputElement
      );
      actualInputFrame.remove();
      const inputIndexes = document.getElementsByClassName("inputIndex");
      for (let i = 0; i < inputIndexes.length; i++) {
        inputIndexes[i].textContent = i + 1;
      }
      // const inputElements = document.getElementsByClassName("input");
      if (currentIndex === 0) {
        focusOnDiv(inputElements[currentIndex]);
      } else {
        focusOnDiv(inputElements[currentIndex - 1]);
      }
    }
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    const currentIndex = Array.prototype.indexOf.call(
      inputElements,
      actualInputElement
    );
    if (currentIndex > 0) {
      focusOnDiv(inputElements[currentIndex - 1]);
    }
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    const currentIndex = Array.prototype.indexOf.call(
      inputElements,
      actualInputElement
    );
    if (currentIndex < inputElements.length - 1) {
      focusOnDiv(inputElements[currentIndex + 1]);
    }
  }
});

basicCalculatorContainer.addEventListener("keyup", function (event) {
  keysPressed.delete(event.key);
});

basicCalculatorContainer.addEventListener(
  "blur",
  function () {
    keysPressed.clear();
  },
  true
);

basicCalculatorContainer.addEventListener("input", function (event) {
  const inputElement = event.target;
  console.log(inputElement.value);
  const container = inputElement.parentElement;
  const currentValue = inputElement.value;
  const i = currentValue.length - 1;
  if (currentValue[i] === "=") {
    showResult(inputElement, container);
  } else {
    if (container.querySelector("p.answer")) {
      container.removeChild(container.querySelector("p.answer"));
    }
  }
});
