const homeButton = document.getElementById("home");
const settingButton = document.getElementById("setting");
const aboutButton = document.getElementById("about");
const settingQuit = document.getElementById("settingQuit");
const settingFrame = document.getElementById("settingFrame");

function showSetting() {
  // settingFrame.style.display = "block";
  settingFrame.style.width = "900px";
  settingFrame.style.backgroundColor = "#4d4d4d";
}

function hideSetting() {
  // settingFrame.style.display = "none";
  settingFrame.style.width = "0";
  settingFrame.style.backgroundColor = "#8ca0d4";
}

homeButton.addEventListener("click", function () {
  window.location.href = "../index.html";
});

settingButton.addEventListener("click", function () {
  showSetting();
});

settingQuit.addEventListener("click", function () {
  hideSetting();
});
