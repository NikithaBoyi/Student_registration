// validate.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");

  // Error elements
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const phoneError = document.getElementById("phoneError");
  const photoError = document.getElementById("photoError");
  const signatureError = document.getElementById("signatureError");

  // Previews
  const photoInput = document.getElementById("photo");
  const photoPreview = document.getElementById("photoPreview");
  const signatureInput = document.getElementById("signature");
  const signaturePreview = document.getElementById("signaturePreview");

  // Range
  const range = document.getElementById("percentage");
  const rangeValue = document.getElementById("rangeValue");

  // Show % when sliding
  range.addEventListener("input", () => {
    rangeValue.textContent = range.value + "%";
  });

  // Validate image size (100x100 px photo, 100x50 px signature)
  function validateImage(file, width, height, errorElement, previewElement) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === width && img.height === height) {
          errorElement.textContent = "";
          previewElement.src = URL.createObjectURL(file);
          previewElement.style.display = "block";
          resolve(true);
        } else {
          errorElement.textContent = `Image must be ${width}x${height}px.`;
          previewElement.style.display = "none";
          resolve(false);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  }

  photoInput.addEventListener("change", async () => {
    if (photoInput.files.length > 0) {
      await validateImage(photoInput.files[0], 100, 100, photoError, photoPreview);
    }
  });

  signatureInput.addEventListener("change", async () => {
    if (signatureInput.files.length > 0) {
      await validateImage(signatureInput.files[0], 100, 50, signatureError, signaturePreview);
    }
  });

  // Form validation
  form.addEventListener("submit", async (e) => {
    let isValid = true;

    // Name validation
    const name = document.getElementById("name").value.trim();
    if (name.length < 3) {
      nameError.textContent = "Name must be at least 3 characters.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Password validation
    const password = document.getElementById("password").value;
    if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    // Phone validation
    const phone = document.getElementById("phone").value.trim();
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      phoneError.textContent = "Enter a valid 10-digit phone number.";
      isValid = false;
    } else {
      phoneError.textContent = "";
    }

    // Photo validation
    if (photoInput.files.length > 0) {
      const validPhoto = await validateImage(photoInput.files[0], 100, 100, photoError, photoPreview);
      if (!validPhoto) isValid = false;
    }

    // Signature validation
    if (signatureInput.files.length > 0) {
      const validSignature = await validateImage(signatureInput.files[0], 100, 50, signatureError, signaturePreview);
      if (!validSignature) isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Stop form submission if validation fails
    }
  });
});
