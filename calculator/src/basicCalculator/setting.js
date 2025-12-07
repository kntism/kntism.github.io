const angleChoice = document.getElementById("angleChoice");
const arcChoice = document.getElementById("arcChoice");
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
    choiceShadow.style.top = topPos - 5 + "px";
    choiceShadow.style.width = newWidth + "px";
    choiceShadow.style.height = newHeight - 2 + "px";
  }
}

changeChoice(angleChoice);

arcChoice.addEventListener("click", () => {
  changeChoice(arcChoice);
});

angleChoice.addEventListener("click", () => {
  changeChoice(angleChoice);
});
