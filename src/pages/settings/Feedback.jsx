import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import BackButton from "../../components/backButton.jsx";
import { useState } from "react";
import "../../css/settings/Feedback.css";
import { successAlert } from "../../utils/Toastify.jsx";

function Feedback() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let currentErrors = {
      email: "",
      subject: "",
      description: "",
    };
    let isValid = true;

    if (!formData.email.trim()) {
      currentErrors.email = "Email address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      currentErrors.email = "Invalid email address format.";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      currentErrors.subject = "Subject is required.";
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      currentErrors.subject = "Subject must be at least 5 characters.";
      isValid = false;
    } else if (formData.subject.trim().length > 100) {
      currentErrors.subject = "Subject cannot exceed 100 characters.";
      isValid = false;
    }

    if (!formData.description.trim()) {
      currentErrors.description = "Description is required.";
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      currentErrors.description = "Description must be at least 20 characters.";
      isValid = false;
    } else if (formData.description.trim().length > 500) {
      currentErrors.description = "Description cannot exceed 500 characters.";
      isValid = false;
    }

    setErrors(currentErrors);

    if (!isValid) {
      return;
    }

    console.log("Form submitted:", formData);
    successAlert("Feedback submitted successfully!");
    setFormData({ email: "", subject: "", description: "" });
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <BackButton />
        <div className="feedback-container">
          <h1 className="feedback-title header3">What can we help you with?</h1>
          <div className="feedback-form-container">
            <div className="form-section">
              <div className="form-section-left">
                <h2 className="form-section-title header4">
                  Describe your issue
                </h2>
                <p className="form-section-description body2">
                  Please describe the issue your are experiencing in as much
                  detail as possible. This will help us understand what's going
                  on.
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="form-container"
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="email" className="form-label body2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`form-input body2 ${
                      errors.email ? "error" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="error body2">{errors.email}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label body2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={`form-input body2 ${
                      errors.subject ? "input-error" : ""
                    }`}
                  />
                  {errors.subject && (
                    <p className="error body2">{errors.subject}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label body2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className={`form-textarea body2 ${
                      errors.description ? "error" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="error body2">{errors.description}</p>
                  )}
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-button body2">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
