import React from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import BackButton from "../../components/backButton.jsx";
import "../../css/Help.css";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LoremIpsum } from "lorem-ipsum";

function Help() {
  const [openIndex, setOpenIndex] = useState();

  const lorem = new LoremIpsum();

  const faqItems = [
    {
      title: "How do I reset my password?",
      description: lorem.generateParagraphs(20),
    },
    {
      title: "I can't log in. What should I do?",
      description: lorem.generateParagraphs(5),
    },
    {
      title: "How can I interact with other users?",
      description: lorem.generateParagraphs(5),
    },
    {
      title:
        "I'm not receiving notifications or updates. How can I enable them?",
      description: lorem.generateParagraphs(5),
    },
    {
      title: "How can I contact the support team?",
      description: lorem.generateParagraphs(5),
    },
    {
      title: "How do I update my profile information?",
      description: lorem.generateParagraphs(5),
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <BackButton />
        <div className="help-center">
          <h2 className="settings-title header3">Frequently Ask Question</h2>
          <div className="accordion-items">
            {faqItems.map((item, index) => (
              <div className="accordion" key={index}>
                <div
                  className="accordion-header"
                  onClick={() => handleToggle(index)}
                >
                  <h3 className="bodyBold1">{item.title}</h3>
                  {openIndex === index ? (
                    <ChevronUp size="20" />
                  ) : (
                    <ChevronDown size="20" />
                  )}
                </div>
                {openIndex === index && (
                  <div className="accordion-content">
                    <p className="accordion-description body2">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
