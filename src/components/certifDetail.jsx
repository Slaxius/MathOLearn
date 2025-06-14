import "../css/components/certifDetail.css";

function certifDetail({ isOpen, onClose, certification }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close header5" onClick={onClose}>
          x
        </button>

        <div className="certification-detail">
          <div className="certification-card">
            <img src={certification.image} alt="certification" className="certification-image"/>
          </div>
          <div className="certification-info">
            <h2 className="certification-title header3">
              {certification.title}
            </h2>
            <p className="certification-subject subHeader">
              {certification.subject}
            </p>
            <p className="certification-date body4">{certification.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default certifDetail;
