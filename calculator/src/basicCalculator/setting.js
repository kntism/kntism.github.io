import { settings } from "../mainInformation.js";
const degreeChoice = document.getElementById("degreeChoice");
const radChoice = document.getElementById("radChoice");
const generalChoice = document.getElementById("generalChoice");
function changeChoice(choice) {
  if (typeof choice === "object" && choice !== null && choice.nodeType === 1) {
    const choiceParent = choice.parentElement;
    const choiceShadow = choiceParent.querySelector(".choiceShadow");
    const choiceRect = choice.getBoundingClientRect();
    const parentRect = choiceParent.getBoundingClientRect();

    const leftPos = choiceRect.left - parentRect.left;
    const topPos = choiceRect.top - parentRect.top;
    const newWidth = choiceRect.width;
    const newHeight = choiceRect.height;
    choiceShadow.style.left = leftPos - 5 + "px";
    choiceShadow.style.top = topPos - 3 + "px";
    choiceShadow.style.width = newWidth + 2 + "px";
    choiceShadow.style.height = newHeight + "px";
  }
}

function emptySetting(theme) {
  for (const key in settings[theme]) {
    settings[theme][key] = false;
  }
}

changeChoice(generalChoice);

radChoice.addEventListener("click", () => {
  changeChoice(radChoice);
  emptySetting("degreeOrRad");
  settings.degreeOrRad.rad = true;
});

degreeChoice.addEventListener("click", () => {
  changeChoice(degreeChoice);
  emptySetting("degreeOrRad");
  settings.degreeOrRad.degree = true;
});

generalChoice.addEventListener("click", () => {
  changeChoice(generalChoice);
  emptySetting("degreeOrRad");
  settings.degreeOrRad.general = true;
});
