import "../css/components/subjectContentCard.css";

function subjectContentCard({ item, onClick }) {
  return (
    <div className="content-card" onClick={onClick}>
      <div className="card-thumbnail">
        <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} />
      </div>
      <div className="card-content">
        <h4 className="card-title body3">{item.title}</h4>
        {item.duration && (
          <p className="card-duration body3">{item.duration}</p>
        )}
      </div>
    </div>
  );
}

export default subjectContentCard;
