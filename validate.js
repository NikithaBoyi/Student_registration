<script>
const form = document.getElementById("studentForm");
const rangeValue = document.getElementById("rangeValue");

// Update range value display
form.percentage.addEventListener("input", () => {
  rangeValue.textContent = form.percentage.value + "%";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  // Create FormData to handle files automatically
  const formData = new FormData(form);

  // Handle multiple checkbox values for languages
  const languages = Array.from(form.querySelectorAll("input[name='languages']:checked")).map(el => el.value);
  formData.delete("languages"); // remove default single entry
  languages.forEach(lang => formData.append("languages", lang));

  // Handle multi-select skills
  const skills = Array.from(form.skills.selectedOptions).map(option => option.value);
  formData.delete("skills");
  skills.forEach(skill => formData.append("skills", skill));

  try {
    const res = await fetch("/api/students", {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    if (!res.ok) {
      alert("Error: " + result.error);
    } else {
      alert("✅ Student registered successfully!");
      form.reset();
      rangeValue.textContent = form.percentage.value + "%";
      // Hide image previews
      document.getElementById("photoPreview").style.display = "none";
      document.getElementById("signaturePreview").style.display = "none";
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("❌ Failed to connect to server");
  }
});

// Image preview for photo
form.photo.addEventListener("change", (e) => {
  const preview = document.getElementById("photoPreview");
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
});

// Image preview for signature
form.signature.addEventListener("change", (e) => {
  const preview = document.getElementById("signaturePreview");
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
});
</script>
