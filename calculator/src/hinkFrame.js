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
inputElement.oninput = function () {
  let newValue = "";
  let signPosition = [];
  for (let i = 0; i < canUseSign.length; i++) {
    if (this.value.includes(canUseSign[i])) {
      signPosition.push(this.value.lastIndexOf(canUseSign[i]));
    }
  }
  if (this.value.includes(" ")) {
    signPosition.push(this.value.lastIndexOf(" "));
  }
  const theLastSignPosition =
    signPosition.length > 0 ? Math.max(...signPosition) : null;
  if (signPosition.length === 0) {
    newValue = this.value;
  } else if (theLastSignPosition !== this.value.length - 1) {
    newValue = this.value.slice(theLastSignPosition + 1);
  } else {
    newValue = "";
  }
  hintFrame.textContent = "";
  hintFrame.style.display = "none";
  console.log("The input is " + this.value);
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
};
