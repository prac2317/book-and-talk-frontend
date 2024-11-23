// Step6.tsx
import React from 'react';
import '../GroupForm.css';
import styles from './Step6.module.css';
import type { FormData } from '../../../types';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';
import Malogo from './Logo-big.jpg';

interface Book {
  title: string;
  author: string;
  thumbnailUrl: string;
  date: string;
  publication: string;
  isbn13: string;
}

interface Step6Props {
  prevStep: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  book: Book | null;
}

const Step6: React.FC<Step6Props> = ({ prevStep, formData, setFormData, book }) => {
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      if (book) {
        const bookResponse = await ky
          .post(`${import.meta.env.VITE_BASE_URL}/api/create-book`, {
            json: {
              isbn13: book.isbn13,
              thumbnail: book.thumbnailUrl,
              bookTitle: book.title,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          })
          .json<{ bookId: number }>();

        const bookId = bookResponse.bookId;
        setFormData((prevFormData) => ({ ...prevFormData, bookId }));

        // const groupResponse = await ky.post(`${import.meta.env.VITE_BASE_URL}/api/groups/new`, {
        //     json: { ...formData, bookId },
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        //         'Content-Type': 'application/json',
        //     },
        // });
        //
        // if (groupResponse.ok) {
        //     console.log('모임이 성공적으로 생성되었습니다.');
        //     navigate(`/books/${book.isbn13}`);
        // }
        const groupFormData = new FormData();
        groupFormData.append('name', formData.name);
        groupFormData.append('maxParticipants', formData.maxParticipants.toString());
        groupFormData.append('startDate', formData.startDate);
        groupFormData.append('duration', formData.duration.toString());
        groupFormData.append('groupDescription', formData.groupDescription);
        groupFormData.append('bookId', bookId.toString());
        groupFormData.append('location', formData.location);

        // 이미지가 있을 경우 추가
        if (formData.groupImage) {
          groupFormData.append('groupImage', formData.groupImage);
        }

        const groupResponse = await ky.post(`${import.meta.env.VITE_BASE_URL}/api/groups/new`, {
          body: groupFormData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }).json<{ groupId: number }>();

        const groupId = groupResponse.groupId;

        if (groupId) {
          console.log('모임이 성공적으로 생성되었습니다.');
        } else {
          console.error('모임 생성 실패');
        }

        const chatRoomResponse = await ky.post(
            `${import.meta.env.VITE_BASE_URL}/api/chat/create-room?groupId=${groupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })

        if (chatRoomResponse.ok) {
          console.log('채팅방이 개설되었습니다');
          navigate(`/books/${book.isbn13}`);
        } else {
          console.error('채팅방 개설 실패')
        }

      }
    } catch (error) {
      console.error('모임 생성 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.headerBox}>
      <h2 className={styles.completeMessage}>모임 생성이 완료되었습니다</h2>
      <img src={Malogo} alt="로고" className={Malogo} />
      <button className={styles.completeButton} onClick={submitForm}>
        완료
      </button>
    </div>
  );
};

export default Step6;
