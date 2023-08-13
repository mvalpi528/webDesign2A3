// progress bar --- update value on scroll

// selecting the progress bar
const progressBar = document.getElementById("progress-bar");

// Listening for the scroll event on the document object
// This means that the webpage will detect when the user scrolls anywhere on the page
document.addEventListener("scroll", () => {
  // This is the number of pixels that the user has scrolled from the top of the page
  const pixelsFromTop = document.documentElement.scrollTop;

  // this calculation subtracts the client height (the size of the user's viewport)
  // so that the progress bar completes when the user reaches the bottom of the page
  // this is because the top of the viewport can never reach the bottom of the page
  const totalPixelsOnPage =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  // This calculates the percentage scrolled from the top
  const scrollProgress = (pixelsFromTop / totalPixelsOnPage) * 100;

  progressBar.value = scrollProgress;
});

// Surfboard Dialogs ---

// Shortboard

const shortboardDialog = document.querySelector("#shortboard-dialog");
const shortboardOpenButton = document.querySelector("#shortboard-learn-more");
const shortboardCloseButton = shortboardDialog.querySelector(
  'sl-button[slot="footer"]'
);

shortboardOpenButton.addEventListener("click", () => shortboardDialog.show());
shortboardCloseButton.addEventListener("click", () => shortboardDialog.hide());

// Fish

const fishDialog = document.querySelector("#fish-dialog");
const fishOpenButton = document.querySelector("#fish-learn-more");
const fishCloseButton = fishDialog.querySelector('sl-button[slot="footer"]');

fishOpenButton.addEventListener("click", () => fishDialog.show());
fishCloseButton.addEventListener("click", () => fishDialog.hide());

// Midlength

const midlengthDialog = document.querySelector("#midlength-dialog");
const midlengthOpenButton = document.querySelector("#midlength-learn-more");
const midlengthCloseButton = midlengthDialog.querySelector(
  'sl-button[slot="footer"]'
);

midlengthOpenButton.addEventListener("click", () => midlengthDialog.show());
midlengthCloseButton.addEventListener("click", () => midlengthDialog.hide());

// Surfboard Calculator

const calculateButton = document.getElementById("choose-board-button");

function calculateBoardType() {
  const userHeight = document.querySelector("#user-height").value;
  console.log(userHeight);
}

calculateButton.addEventListener("click", () => {
  calculateBoardType();
});

// Gallery Images -- image popups ------

// Store all gallery images in a variable
// Selects all images that are contained within elements that have the class "image-container"
const galleryImages = document.querySelectorAll(".img-container img");

function createImagePopUp(imageCollection) {
  imageCollection.forEach((image) => {
    image.onclick = () => {
      document.querySelector(".popup-image").style.display = "block";
      document.querySelector(".popup-image img").src =
        image.getAttribute("src");
    };
  });

  document.querySelector(".popup-image span").onclick = () => {
    document.querySelector(".popup-image").style.display = "none";
  };
}

createImagePopUp(galleryImages);
