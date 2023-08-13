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

// display values for range inputs

const yearsSurfingSlider = document.getElementById("user-years-surfing");
const yearsSurfingSliderValue = document.getElementById("years-surfing-value");

yearsSurfingSlider.addEventListener("input", function () {
  yearsSurfingSliderValue.textContent = yearsSurfingSlider.value;
});

const surfFrequencySlider = document.getElementById("user-surf-frequency");
const surfFrequencySliderValue = document.getElementById(
  "surf-frequency-value"
);

surfFrequencySlider.addEventListener("input", function () {
  surfFrequencySliderValue.textContent = surfFrequencySlider.value;
});

// Defining a helper function that is called by the calculate board type function
function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  const BMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  return BMI;
}

// Calculate the board type
function calculateBoardType() {
  const userHeight = parseInt(document.querySelector("#user-height").value);
  console.log(`userHeight: ${userHeight}`);
  const userAge = parseInt(document.querySelector("#user-age").value);
  console.log(`userAge: ${userAge}`);
  const userWeight = parseInt(document.querySelector("#user-weight").value);
  console.log(`userWeight: ${userWeight}`);
  const BMI = calculateBMI(userHeight, userWeight);
  console.log(`BMI: ${BMI}`);

  // Preferences from the shoelace UI components
  const userYearsSurfing = document.querySelector("#user-years-surfing").value;
  console.log(`userYearsSurfing: ${userYearsSurfing}`);
  const userSurfFrequency = document.querySelector(
    "#user-surf-frequency"
  ).value;
  console.log(`userSurfFrequency: ${userSurfFrequency}`);

  const likesSharpTurns = document.getElementById("switch-sharp-turns").checked;
  console.log(`likesSharpTurns: ${likesSharpTurns}`);
  const likesWavesEarlier = document.getElementById(
    "switch-waves-earlier"
  ).checked;
  console.log(`likesWavesEarlier: ${likesWavesEarlier}`);
  const likesToCruise = document.getElementById("switch-cruise").checked;
  console.log(`likesToCruise: ${likesToCruise}`);

  // each board type will be represented by a number
  // factors that mean the user will likely ride a short board will be represented by a 1
  // fish = 2, midlength = 3
  // the most frequently occuring number will determine the board that is recommended
  const boardTypeWeightings = [];

  // people with lower BMIs require less surfboard volume for the same buoyancy
  if (BMI < 22) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (BMI < 26) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  // people generally lose strength and mobilty as they age making it increasingly
  // difficult to ride smaller boards
  if (userAge < 35) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (userAge < 50) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  // people with less experience find it difficult to ride smaller boards
  if (userYearsSurfing > 5) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (userYearsSurfing > 3) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  // people who surf more frequently are more likely to handle a smaller board
  if (userSurfFrequency > 4) {
    // increase weighting for shortboard
    boardTypeWeightings.push(1);
  } else if (userSurfFrequency > 2) {
    // increase weighting for fish
    boardTypeWeightings.push(2);
  } else {
    // increase weighting for midlength
    boardTypeWeightings.push(3);
  }

  for (let i = 0; i < boardTypeWeightings.length; i++) {
    console.log(boardTypeWeightings[i]);
  }
}

// getting the button to store in a variable
const calculateButton = document.getElementById("choose-board-button");
// Calls the function when the button is pushed
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
