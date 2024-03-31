// Wait until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // SWIPER JS Section - Initializes swiper elements and autoplay based on viewport visibility.
  const swiperElements = document.querySelectorAll(".mySwiper");

  // Observer to enable or disable swiper autoplay based on element visibility.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start autoplay when the swiper element is in view.
          entry.target.swiper.autoplay.start();
        } else {
          // Stop autoplay when the swiper element is not in view.
          entry.target.swiper.autoplay.stop();
        }
      });
    },
    { threshold: 0.05, rootMargin: "-50px" }
  );

  // Observes each swiper element for visibility changes.
  swiperElements.forEach((el) => {
    observer.observe(el);
  });

  // FORM Section - Selecting form elements by their IDs.
  const nameElement = document.getElementById("Name");
  const surnameElement = document.getElementById("Surname");
  const emailElement = document.getElementById("Email");
  const phoneNumberElement = document.getElementById("phoneNumber");
  const messageElement = document.getElementById("Message");
  const lengthCurrent = document.getElementById("length-current");

  // NOTIFICATIONS - Functions to show success or error states on input fields.
  function showError(input, message = "Xəta baş verdi") {
    input.classList.add("is-invalid");
    let notificationSpan;
    if (input.id === "Message") {
      // Special handling for the message input to show error message in a specific location.
      notificationSpan = document.querySelector(
        "#message-notification-area .notification-message"
      );
    } else {
      notificationSpan = input.nextElementSibling;
    }
    notificationSpan.classList.add("error-message");
    notificationSpan.innerText = message;
  }

  function showSuccess(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    let notificationSpan;
    if (input.id === "Message") {
      // Special handling for the message input to clear error message from a specific location.
      notificationSpan = document.querySelector(
        "#message-notification-area .notification-message"
      );
    } else {
      notificationSpan = input.nextElementSibling;
    }
    notificationSpan.classList.remove("error-message");
    notificationSpan.classList.add("success-message");
    notificationSpan.innerText = "";
  }

  // EMPTY INPUT CHECKING - Verifies that inputs are not empty.
  function checkRequired(inputs) {
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        showError(input, "Zəhmət olmasa, sahəni doldurun");
      } else {
        showSuccess(input, "");
      }
    });
  }

  // VALIDATING INPUTS - General structure to validate inputs using specific validation functions.
  function validateInput(inputElement, validationFunction) {
    checkRequired([inputElement]);
    if (inputElement.value.trim() !== "") {
      validationFunction(inputElement);
    }
  }

  // EMAIL VALIDATION - Uses a regular expression to validate email format.
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    regex.test(email.value.trim())
      ? showSuccess(emailElement, "")
      : showError(emailElement, "E-poçt yanlışdır");
  }

  // PHONE NUMBER VALIDATION - Validates phone number format using a regular expression.
  function validatePhoneNumber(phoneNumber) {
    const regex =
      /^(?:\+994|994)?(?:50|10|51|55|70|77|99|0?50|0?51|0?10|0?55|0?70|0?77|0?99)\d{7}$/;
    regex.test(phoneNumber.value.trim())
      ? showSuccess(phoneNumberElement, "")
      : showError(phoneNumberElement, "Telefon nömrəsi yanlışdır");
  }

  // MESSAGE LENGTH VALIDATION - Displays current message length and applies styles based on length.
  function messageLengthCheck() {
    const messageLength = messageElement.value.length;
    lengthCurrent.innerText = messageLength;
    lengthCurrent.classList.remove("length-caution", "length-danger");
    if (messageLength >= 100 && messageLength < 150) {
      lengthCurrent.className = "length-caution";
    } else if (messageLength >= 150) {
      lengthCurrent.className = "length-danger";
    }
  }

  // Real-time validation on input events for each form field.
  nameElement.addEventListener("input", function () {
    checkRequired([nameElement]);
  });

  surnameElement.addEventListener("input", function () {
    checkRequired([surnameElement]);
  });

  emailElement.addEventListener("input", function () {
    validateInput(emailElement, validateEmail);
  });

  phoneNumberElement.addEventListener("input", function () {
    validateInput(phoneNumberElement, validatePhoneNumber);
  });

  messageElement.addEventListener("input", function () {
    checkRequired([messageElement]);
    messageLengthCheck();
  });

  // Form submission handling.
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents the form from submitting the traditional way.

      // Runs validation checks on all form fields.
      checkRequired([
        nameElement,
        surnameElement,
        emailElement,
        phoneNumberElement,
        messageElement,
      ]);
      validateEmail(emailElement);
      validatePhoneNumber(phoneNumberElement);
      messageLengthCheck();

      // Checks if the form is valid (i.e., no inputs have the 'is-invalid' class).
      const isFormValid = !document.querySelectorAll(".is-invalid").length;

      if (isFormValid) {
        // If form is valid, attempt to send the form data using EmailJS.
        emailjs.sendForm("service_541kq36", "template_zokm20i", this).then(
          function () {
            // On successful form submission.
            Swal.fire({
              title: "Əla!",
              text: "Mesaj uğurla göndərildi!",
              icon: "success",
            });
            contactForm.reset(); // Resets form fields.
            document
              .querySelectorAll(".form-control.is-valid")
              .forEach(function (input) {
                input.classList.remove("is-valid"); // Removes success state from inputs.
              });
            lengthCurrent.classList.remove("length-caution", "length-danger");
            lengthCurrent.innerText = "0"; // Resets message length display.
          },
          function (error) {
            // On form submission failure.
            Swal.fire({
              title: "Əfsus!",
              text: "Xəta baş verdi, xahiş edirik yenidən cəhd edin!",
              icon: "error",
            });
          }
        );
      } else {
        // If form is not valid, focuses the first invalid input.
        document.querySelector(".is-invalid")?.focus();
      }
    });
  }
});

// This script combines functionality for initializing and handling swiper elements, form validation (including real-time input validation), and form submission using EmailJS, with appropriate user feedback for success or failure states.

// Shahin - 30.03.2024.
