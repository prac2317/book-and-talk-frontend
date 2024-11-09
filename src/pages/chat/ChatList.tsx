// components/ChatList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatList.css'; // 필요 시 스타일링 추가

interface ChatRoom {
    id: number;
    name: string;
    lastMessage: string;
    timestamp: string;
}

const ChatList: React.FC = () => {
    const navigate = useNavigate();

    // 예시 데이터 (실제 데이터는 API 호출 등으로 가져옵니다)
    const chatRooms: ChatRoom[] = [
        { id: 1, name: '일반 채팅방', lastMessage: '안녕하세요!', timestamp: '2024-11-07' },
        { id: 2, name: '프로젝트 토론', lastMessage: '다음 회의는 언제인가요?', timestamp: '2024-11-06' },
        { id: 3, name: '게임 채팅', lastMessage: '게임 시작!', timestamp: '2024-11-05' },
        // 더 많은 채팅방 추가 가능
    ];

    const handleChatClick = (chatRoomId: number) => {
        navigate(`/chat/${chatRoomId}`);
    };

    return (
        <div className="chat-list">
            <h1>채팅 목록</h1>
            <ul>
                {chatRooms.map((room) => (
                    <li key={room.id} onClick={() => handleChatClick(room.id)} className="chat-list-item">
                        <div className="chat-name">{room.name}</div>
                        <div className="chat-last-message">{room.lastMessage}</div>
                        <div className="chat-timestamp">{room.timestamp}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;