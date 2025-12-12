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
    // inputElement.appendChild(answerElement);
  }
  const result = calculate(actualInputElement.textContent);
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
  const inputElements = document.getElementsByClassName("input");
  // if (event.key !== "Enter" && event.key !== "Delete") {
  //   if (container.querySelector("p.answer")) {
  //     container.removeChild(container.querySelector("p.answer"));
  //   }
  // }

  // if (event.key === "=") {
  //   showResult(actualInputElement, container);
  // }

  if (event.key === "Enter") {
    event.preventDefault();
    const inputFrame = document.createElement("div");
    inputFrame.className = "inputFrame";

    const inputIndex = document.createElement("div");
    inputIndex.className = "inputIndex";

    inputIndex.textContent = "1";

    const inputDetails = document.createElement("div");
    inputDetails.className = "inputDetails";

    const input = document.createElement("div");
    input.className = "input";
    input.contentEditable = "true";

    // 组装元素结构
    inputDetails.appendChild(input);
    inputFrame.appendChild(inputIndex);
    inputFrame.appendChild(inputDetails);

    // 添加到容器中
    basicCalculatorContainer.insertBefore(
      inputFrame,
      actualInputFrame.nextSibling
    );
    // basicCalculatorContainer.appendChild(inputFrame);
    const inputIndexes = document.getElementsByClassName("inputIndex");
    for (let i = 0; i < inputIndexes.length; i++) {
      inputIndexes[i].textContent = i + 1;
    }

    // 聚焦到新创建的输入框
    focusOnDiv(input);
  }
  if (event.key === "Delete") {
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
  const container = inputElement.parentElement;
  const currentValue = inputElement.textContent;
  const i = currentValue.length - 2;
  if (currentValue[i] === "=" && currentValue[i + 1] === "=") {
    showResult(inputElement, container);
  } else {
    if (container.querySelector("p.answer")) {
      container.removeChild(container.querySelector("p.answer"));
    }
  }
});
