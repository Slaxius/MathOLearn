import ContentCard from "./subjectContentCard.jsx";
import "../css/comp/subjectContentSection.css";

function subjectContentSection({ title, items, type }) {
  return (
    <div className="content-section">
      <div className="section-header">
        <h3 className="section-title header4">{title}</h3>
      </div>
      <div className="content-grid">
        {items.map((item, index) => (
          <ContentCard
            key={item.id}
            item={item}
            type={type}
            isLocked={index > 0 && type !== "video"}
          />
        ))}
      </div>
    </div>
  );
}

export default subjectContentSection;
