document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("newsletter-form");
  const inputElement = document.getElementById("email");
  const mobileNotification = document.getElementById("mobile-notification");
  const desktopNotification = document.getElementById("desktop-notification");

  let currentErrorMessage = "";

  function checkEmpty() {
    if (inputElement.value == "") {
      showError("Whoops! It looks like you forgot to add your email");
      return true;
    } else {
      clearError();
      return false;
    }
  }

  function showError(message) {
    inputElement.classList.add("is-invalid")
    currentErrorMessage = message;
    updateErrorDisplay();
  }

  function clearError() {
    currentErrorMessage = "";
    mobileNotification.classList.remove("show-up");
    mobileNotification.innerText = "";
    desktopNotification.classList.remove("show-up");
    desktopNotification.innerText = "";
    inputElement.classList.remove("is-invalid");
  }

  function updateErrorDisplay() {
    if (currentErrorMessage) {
      if (window.innerWidth < 768) {
        mobileNotification.classList.add("show-up");
        mobileNotification.innerText = currentErrorMessage;
        desktopNotification.classList.remove("show-up");
        desktopNotification.innerText = "";
      } else {
        desktopNotification.classList.add("show-up");
        desktopNotification.innerText = currentErrorMessage;
        mobileNotification.classList.remove("show-up");
        mobileNotification.innerText = "";
      }
    }
  }

  function validateInput() {
    if (!checkEmpty()) {
      validateEmail();
    }
  }

  function validateEmail() {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regex.test(inputElement.value.trim())) {
      showError("Please provide a valid email address");
    } else {
      clearError();
    }
  }

  inputElement.addEventListener("input", function () {
    validateInput();
  });

  window.addEventListener("resize", updateErrorDisplay);
});
