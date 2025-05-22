import React from "react";
import "../css/button.css";
import { Link } from "react-router-dom";

function button({ link, text }) {
  return (
    <Link to={link} className="button body1">
      {text}
    </Link>
  );
}

export default button;
