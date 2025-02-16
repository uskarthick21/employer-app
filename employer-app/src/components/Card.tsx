import { useState } from "react";
import { CardProps } from "../utility/types";
import ModalPopup from "./ModalPopup";

const Card = ({
  id,
  image,
  firstName,
  lastName,
  contact,
  address,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isActived, setIsActived] = useState(false);
  const defaultAvatar = "/default-avatar.png";

  const handleCardClick = () => {
    setModalOpen(true);
    setIsActived(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsActived(false);
  };

  return (
    <>
      <div
        className={`card ${isActived ? "cardActive" : ""}`}
        onClick={handleCardClick}
      >
        <p className="emp emp-id">{id}</p>
        <div className="emp-img">
          <img
            src={imgSrc}
            alt={`${firstName} ${lastName}`}
            onError={(e) => {
              setImgSrc(defaultAvatar);
              e.currentTarget.onerror = null;
            }}
            className="emp-avatar"
          />
        </div>

        <h2 className="emp emp-title">{`${firstName} ${lastName}`}</h2>
        <p className="emp emp-contact">Contact: {contact}</p>
        <p className="emp emp-address">Address: {address}</p>
      </div>

      {isModalOpen && <ModalPopup onClose={handleCloseModal} />}
    </>
  );
};

export default Card;
