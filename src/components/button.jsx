import React from "react";
import "../css/button.css"

function button({link, text}) {
  return <a href={link} id="body1" className="button">{text}</a>;
}

export default button;
