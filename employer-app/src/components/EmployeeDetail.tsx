import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";

const EmployeeDetail = () => {
  const empDetails = useSelector((state: RootState) => state.employeeDetail);
  const {
    avatar,
    firstName,
    lastName,
    jobTitle,
    contactNo,
    address,
    age,
    bio,
    dateJoined,
  } = empDetails;
  const [imgSrc, setImgSrc] = useState(avatar);
  const defaultAvatar = "/default-avatar.png";

  return (
    <div className="employee-detail">
      <div className="detail-left">
        <div className="avatar">
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
        <h3 className="title">{jobTitle}</h3>
        <p className="age">{age}</p>
        <p className="date">{new Date(dateJoined).toLocaleDateString()}</p>
      </div>
      <div className="detail-right">
        <h2 className="full-name">{`${firstName} ${lastName}`}</h2>
        <p className="bio">{bio}</p>
        <p className="address">{address}</p>
        <p className="contact">{contactNo}</p>
      </div>
    </div>
  );
};

export default EmployeeDetail;
