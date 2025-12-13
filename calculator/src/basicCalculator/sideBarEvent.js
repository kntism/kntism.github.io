const homeButton = document.getElementById("home");
const settingButton = document.getElementById("setting");
const aboutButton = document.getElementById("about");
const settingQuit = document.getElementById("settingQuit");
const settingFrame = document.getElementById("settingFrame");

function showSetting() {
  // settingFrame.style.display = "block";
  settingFrame.style.visibility = "visible";
}

function hideSetting() {
  // settingFrame.style.display = "none";
  settingFrame.style.visibility = "hidden";
}

homeButton.addEventListener("click", function () {
  window.location.href = "/index.html";
});

settingButton.addEventListener("click", function () {
  showSetting();
});

settingQuit.addEventListener("click", function () {
  hideSetting();
});
