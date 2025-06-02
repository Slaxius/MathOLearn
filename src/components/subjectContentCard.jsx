import "../css/comp/subjectContentCard.css";

function subjectContentCard({ item, type, isLocked = false }) {
  return (
    <div className="content-card">
      <div className="card-thumbnail">
        <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} />
        {isLocked && <div className="lock-overlay"></div>}
        {type === "video" && !isLocked && <div className="play-overlay"></div>}
      </div>
      <div className="card-content">
        <h4 className="card-title body3">{item.title}</h4>
        {item.duration && <p className="card-duration body3">{item.duration}</p>}
      </div>
    </div>
  );
}

export default subjectContentCard;
