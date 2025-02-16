import { useState } from "react";
import { CardProps } from "../utility/types";

const Card = ({
  id,
  image,
  firstName,
  lastName,
  contact,
  address,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(image);
  //const [isActive, setIsActive] = useState(false);
  const defaultAvatar = "/default-avatar.png";

  return (
    <div className="card">
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
  );
};

export default Card;
