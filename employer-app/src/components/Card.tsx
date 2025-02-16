import { useState } from "react";
import { Employee } from "../utility/types";
import ModalPopup from "./ModalPopup";
import EmployeeDetail from "./EmployeeDetail";
import { setEmployeeDetail } from "../redux/slice/employee/employeeDetailSlice";
import { useDispatch } from "react-redux";

interface CardProps {
  employee: Employee;
}

const Card = ({ employee }: CardProps) => {
  const dispatch = useDispatch();
  const { id, avatar, firstName, lastName, contactNo, address } = employee;
  const [imgSrc, setImgSrc] = useState(avatar);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isActived, setIsActived] = useState(false);
  const defaultAvatar = "/default-avatar.png";

  const handleCardClick = (employee: Employee) => {
    setModalOpen(true);
    setIsActived(true);
    dispatch(setEmployeeDetail(employee));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsActived(false);
  };

  const modal = (
    <ModalPopup onClose={handleCloseModal}>
      <EmployeeDetail />
    </ModalPopup>
  );

  return (
    <>
      <div
        className={`card ${isActived ? "card-active" : ""}`}
        onClick={() => handleCardClick(employee)}
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
        <p className="emp emp-contact">Contact: {contactNo}</p>
        <p className="emp emp-address">Address: {address}</p>
      </div>

      {isModalOpen && modal}
    </>
  );
};

export default Card;
