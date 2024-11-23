import React from "react";
// import { FaMap, FaCalendarAlt } from "react-icons/fa";
import "./GroupItem.css";

interface GroupItemProps {
  id: number;
  name: string;
  participants: number;
  maxParticipants: number;
  startDate: string;
  duration: number;
  groupImage: string | null;
  location: string | null;

  bookTitle: string | null;
  createdAt: string | null;
}


const GroupItem: React.FC<GroupItemProps> = ({
    id,
    name,
    participants,
    maxParticipants,
    startDate,
    duration,
    groupImage,
    location,
    bookTitle,
    createdAt,
}) => (
  <div className="group-item">
    <img src={groupImage} alt={name} className="profile-image" />
    <div className="group-content">
      <h3 className="book-title">{bookTitle}</h3>
      <h4 className="group-title">{name}</h4>
      <div className="participants">
        {participants}명 / {maxParticipants}명
      </div>
      <div className="group-info">
        {/*<div className="group-data">*/}
        {/*  <FaCalendarAlt /> <span>{date}</span>*/}
        {/*</div>*/}
        {/*<div className="group-location">*/}
        {/*  <FaMap /> <span>{location}</span>*/}
        {/*</div>*/}
      </div>
    </div>
  </div>
);

export default GroupItem;
