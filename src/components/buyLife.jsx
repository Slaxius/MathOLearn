import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successAlert } from "../utils/Toastify.jsx";
import { useLife } from "../utils/LifeContext.jsx";
import "../css/components/buyLife.css";

const BuyLifePage = () => {
  const navigate = useNavigate();
  const { refillLives } = useLife();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const purchasePrice = "Rp 10.000";
  const livesToRefill = 4;

  const handleInitiatePurchase = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      refillLives();
      successAlert(
        `Congratulations! Your lives have been refilled to ${livesToRefill}.`
      );
      navigate("/learn");
    }, 1500);
  };

  const handleCancelPurchase = () => {
    setIsModalOpen(false);
    console.log("Purchase cancelled.");
  };

  const renderConfirmationModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="modal-overlay buy-life">
        <div className="modal-content buy-life-content">
          <h2 className="header3 confirm-title">Confirm Purchase</h2>
          <p className="body1 confirm-text">
            Are you sure you want to purchase{" "}
            <span className="purchase-specific">
              {livesToRefill} Life Tokens{" "}
            </span>
            for <span className="pricetag">{purchasePrice}</span> ?
          </p>
          <p className="body1">Your lives will be replenished to 4.</p>
          <div className="button-container">
            <button
              className="confirm-button body1"
              onClick={handleConfirmPurchase}
            >
              Yes, Buy!
            </button>
            <button
              className="cancel-button body1"
              onClick={handleCancelPurchase}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page top-up">
      <div className="top-up-container">
        <div className="top-up-container-header">
          <h1 className="header3">Top Up Life Tokens</h1>
          <p className="body1">Maximum life capacity: 4 lives.</p>
          <p className="body1">
            Purchase for <span className="pricetag">{purchasePrice}</span> will
            instantly replenish your lives to 4.
          </p>
        </div>
        <div>
          <button
            className="body1 purchase-btn"
            onClick={handleInitiatePurchase}
          >
            Buy {purchasePrice}
          </button>
        </div>
        <div className="back-container">
          <Link className="body1 btnbtn" to="/learn">
            Back to Learn Page
          </Link>
        </div>
      </div>
      {renderConfirmationModal()}
    </div>
  );
};

export default BuyLifePage;
