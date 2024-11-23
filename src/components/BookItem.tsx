import React from "react";
import BottomNavIcon from "./BottomNavIcon";
// import { FaBookmark } from "react-icons/fa";
import "./BookItem.css";

interface BookItemProps {
  id: number;
  bookTitle: string;
  author: string;
  thumbnail: string;
  publishDate : string;
  publication: string
  isbn13: number;
  groupCount: number;
}


const BookItem: React.FC<BookItemProps> = ({
    // id,
   bookTitle,
   author,
     thumbnail,
    publishDate,
    publication,
    // isbn13,
    // groupCount,

}) => (
  <div className="book-item">
    <img src={thumbnail} alt={bookTitle} className="book-image" />
    <div className="book-details">
      <h2 className="book-title">{bookTitle}</h2>
      <p className="book-author">작가: {author}</p>
      <p className="book-date">출판일: {publishDate}</p>
      <p className="book-publisher">출판사: {publication}</p>
    </div>
    {/*<button className="bookmark-button" onClick={() => onRemove(id)}>*/}
    {/*  <BottomNavIcon icon={<FaBookmark />} label="" isSelected={false} />*/}
    {/*</button>*/}
  </div>
);

export default BookItem;
