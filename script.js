const form = document.getElementById("multi-step-form");
const steps = document.querySelectorAll(".form-step");
const progress = document.getElementById("progress");
const prevButtons = document.querySelectorAll(".prev-btn");
const nextButtons = document.querySelectorAll(".next-btn");
const progressSteps = document.querySelectorAll(".progress-step");
const reviewInfo = document.getElementById("review-info");

let currentStep = 0;

function updateProgress() {
  progressSteps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  const progressWidth = (currentStep / (progressSteps.length - 1)) * 100;
  progress.style.width = `${progressWidth}%`;
}

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  // If it's the final step, populate the review information
  if (stepIndex === steps.length - 1) {
    populateReviewInfo();
  }
}

function populateReviewInfo() {
  const formData = new FormData(form);
  let reviewHTML = "<ul>";

  // Loop through all form inputs and display their values
  formData.forEach((value, key) => {
    if (value) {
      // Format the key for better readability (e.g., "first-name" => "First Name")
      const formattedKey = key
        .split("-") // Split by hyphens
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join with spaces

      reviewHTML += `<li><strong>${formattedKey}:</strong> ${value}</li>`;
    }
  });

  reviewHTML += "</ul>";
  reviewInfo.innerHTML = reviewHTML;
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
      updateProgress();
    }
  });
});

prevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      updateProgress();
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
});
