import { canUseSign, canUseFunc } from "./mainInformation.js";

const canUseFuncLength = [];
const inputElement = document.getElementById("usersEquationInput");
const container = document.getElementById("mainContainer");
const hintFrame = document.createElement("div");

hintFrame.className = "hintFrame";
hintFrame.position = "absolute";
hintFrame.style.minWidth = "60px";
hintFrame.style.maxWidth = "80px";
hintFrame.style.minHeight = "60px";
hintFrame.style.border = "2px solid #000";
hintFrame.style.borderRadius = "8px";
hintFrame.style.backgroundColor = "#f0f8ff";
hintFrame.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.8)";
hintFrame.style.display = "none";

for (let i = 0; i < canUseFunc.length; i++) {
  canUseFuncLength.push(canUseFunc[i].length);
}
const maxCanUseFuncLength = Math.max(...canUseFuncLength);
let lastText = "";
let newValue = "";
let start = inputElement.selectionStart; //0
let end = inputElement.selectionEnd; //0
inputElement.addEventListener("input", function (event) {
  //newValue
  let nowStart = inputElement.selectionStart;
  let nowText = event.target.value;

  for (let i = 0; i < Math.max(lastText.length, nowText.length); i++) {
    if (nowText[i] !== lastText[i]) {
      if (nowStart !== start + 1) {
        if (nowText[i - 1] === undefined) {
          newValue = "";
        } else if (
          canUseSign.includes(nowText[i - 1]) ||
          /[^a-zA-Z]/.test(nowText[i - 1])
        ) {
          newValue = "";
        }
      }
      console.log(`${nowText[i]} !== ${lastText[i]}`);
      if (canUseSign.includes(nowText[i]) || /[^a-zA-Z]/.test(nowText[i])) {
        newValue = "";
      } else {
        newValue += nowText[i];
        console.log(`hinkFrame!!! newValue: ${newValue}`);
      }
      break;
    }
  }
  lastText = nowText;
  // let signPosition = [];
  // for (let i = 0; i < canUseSign.length; i++) {
  //   if (event.target.value.includes(canUseSign[i])) {
  //     signPosition.push(event.target.value.lastIndexOf(canUseSign[i]));
  //   }
  // }
  // if (event.target.value.includes(" ")) {
  //   signPosition.push(event.target.value.lastIndexOf(" "));
  // }
  // const theLastSignPosition =
  //   signPosition.length > 0 ? Math.max(...signPosition) : null;
  // if (signPosition.length === 0) {
  //   newValue = event.target.value;
  // } else if (theLastSignPosition !== event.target.value.length - 1) {
  //   newValue = event.target.value.slice(theLastSignPosition + 1);
  // } else {
  //   newValue = "";
  // }
  //hint
  hintFrame.textContent = "";
  hintFrame.style.display = "none";
  console.log("The input is " + event.target.value);
  if (newValue.length <= maxCanUseFuncLength && newValue.length !== 0) {
    container.appendChild(hintFrame);
    for (let i = 0; i < canUseFunc.length; i++) {
      if (canUseFunc[i].slice(0, newValue.length) === newValue) {
        hintFrame.style.display = "block";
        hintFrame.innerHTML +=
          `<p style="line-height: 0">${canUseFunc[i]}<p>` + "<hr/>";
      }
    }
  }
});
