const homeButton = document.getElementById("home");
const settingButton = document.getElementById("setting");
const aboutButton = document.getElementById("about");
const settingQuit = document.getElementById("settingQuit");
const settingFrame = document.getElementById("settingFrame");

function showSetting() {
  // settingFrame.style.visibility = "visible";
  settingFrame.style.width = "40vw";
}

function hideSetting() {
  // settingFrame.style.visibility = "hidden";
  settingFrame.style.width = "0vw";
}

homeButton.addEventListener("click", function () {
  window.location.href = "./index.html";
});

settingButton.addEventListener("click", function () {
  showSetting();
});

settingQuit.addEventListener("click", function () {
  hideSetting();
});
