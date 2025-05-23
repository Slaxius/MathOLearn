import "../css/comp/toggle.css";

const Toggle = ({ isOn, onToggle, label }) => {
  return (
    <div className="toggle-container">
      <span className="toggle-label mediumHeader4">{label}</span>
      <div
        className={`toggle-switch ${isOn ? "on" : "off"}`}
        onClick={onToggle}
      >
        <div className="toggle-circle"></div>
      </div>
    </div>
  );
};

export default Toggle;
