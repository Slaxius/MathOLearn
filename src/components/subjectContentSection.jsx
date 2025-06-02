import ContentCard from "./subjectContentCard.jsx";
import "../css/comp/subjectContentSection.css";

function subjectContentSection({ title, items, type, onClick }) {
  return (
    <div className="content-section">
      <div className="section-header">
        <h3 className="section-title header4">{title}</h3>
      </div>
      <div className="content-grid">
        {items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            type={type}
            onClick={() => onClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default subjectContentSection;
