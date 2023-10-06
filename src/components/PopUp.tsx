import React from "react";
import "../style/PopUp.scss";

interface PopupProps {
  setShowPopup: (show: boolean) => void;
  confirmSubcategory: any;
  confirmService: any;
}

const PopUp: React.FC<PopupProps> = ({
  setShowPopup,
  confirmService,
  confirmSubcategory,
}) => {
  return (
    <div className="popup">
      <button className="close-btn" onClick={() => setShowPopup(false)}>
        &times;
      </button>
      <h2>What do you want to create?</h2>
      <div className="popup-bt-box">
        <button onClick={confirmSubcategory}>Category</button>
        <button onClick={confirmService}>Service</button>
      </div>
    </div>
  );
};

export default PopUp;
