import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    percentage: "",
    course: "",
  });

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "photo") setPhoto(files[0]);
    if (name === "signature") setSignature(files[0]);
    if (name === "resume") setResume(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (photo) data.append("photo", photo);
    if (signature) data.append("signature", signature);
    if (resume) data.append("resume", resume);

    try {
      await axios.post("http://localhost:8080/api/students", data);
      alert("✅ Student registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        percentage: "",
        course: "",
      });
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="App">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} required /><br/>
        <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} required /><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required /><br/>
        <input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} required /><br/>
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} required /><br/>
        <input type="number" name="percentage" placeholder="Percentage" onChange={handleChange} value={formData.percentage} /><br/>
        <input name="course" placeholder="Course" onChange={handleChange} value={formData.course} /><br/>

        <label>Photo:</label>
        <input type="file" name="photo" onChange={handleFileChange} /><br/>
        <label>Signature:</label>
        <input type="file" name="signature" onChange={handleFileChange} /><br/>
        <label>Resume:</label>
        <input type="file" name="resume" onChange={handleFileChange} /><br/><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
