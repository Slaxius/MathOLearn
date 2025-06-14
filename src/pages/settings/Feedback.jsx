import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import BackButton from "../../components/backButton.jsx";
import { useState } from "react";
import "../../css/settings/Feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
                  Please describe the issue your are experiencing in as much detail as possible. This will help us understand what's going on.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="form-container">
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
                    className="form-input body2"
                    required
                  />
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
                    className="form-input body2"
                    required
                  />
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
                    className="form-textarea body2"
                    required
                  />
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
