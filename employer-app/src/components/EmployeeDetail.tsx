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
        <div className="title">{jobTitle}</div>
        <div className="age">{age}</div>
        <div className="date">{dateJoined}</div>
      </div>
      <div className="detail-right">
        <div className="full-name">{`${firstName} ${lastName}`}</div>
        <div className="bio">{bio}</div>
        <div className="address">{address}</div>
        <div className="contact">{contactNo}</div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
