import styles from './ChatRoom.module.css'

import { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
// import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import ky from 'ky';

interface ChatMessage {
    userId: number;
    message: string;
    nickname: string;
}

interface myUserId {
    userId: number;
}

type StompClient = Client | null;

function ChatRoom() {
    // 채팅 복붙
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [stompClient, setStompClient] = useState<StompClient>(null);

    // 채팅방, 사용자 번호 랜덤으로 만들기
    //     const memberIdRef = useRef(Math.floor(Math.random() * 9) + 1);
    //     const memberId = memberIdRef.current;

    const [myUserId, setMyUserId] = useState<number | null>(null);
    const { chatRoomId } = useParams<{ chatRoomId: string }>();

    // 입력창에 대한 참조 설정
    const inputRef = useRef<HTMLInputElement>(null);

    // 스크롤을 위해 추가한 참조
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMyData = async () => {
            try {
                const data: myUserId = await ky
                    .get(`${import.meta.env.VITE_BASE_URL}/api/chat/find-user`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        },
                    })
                    .json();
                console.log(data);
                setMyUserId(data?.userId);
            } catch (error) {
                console.error('Failed to fetch group details:', error);
            }
        };

        checkMyData();
        console.log(myUserId);
    }, []);

    useEffect(() => {
        // const socket = new SockJS('http://localhost:8080/ws-stomp');
        const token = localStorage.getItem('access_token');
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // SockJS 대신 WebSocket URL 사용
            reconnectDelay: 5000,
            // webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                // 구독 설정
                client.subscribe(`/sub/chat/${chatRoomId}`, (messageOutput: IMessage) => {
                    const msg = JSON.parse(messageOutput.body);
                    console.log(msg);
                    console.log(msg.message);
                    console.log(msg.userId);
                    console.log(msg.nickname);
                    setMessages((prevMessages) => [...prevMessages, msg]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        setStompClient(client);

        // 페이지 진입 시 입력창에 포커스 설정
        if (inputRef.current) {
            inputRef.current.focus();
        }

        return () => {
            client.deactivate();
        };
    }, [chatRoomId]);

    // 메시지가 추가될 때마다 최신 메시지로 스크롤
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        if (stompClient && inputMessage.trim() !== '') {
            stompClient.publish({
                destination: `/pub/chat/message/${chatRoomId}/${myUserId}`,
                body: JSON.stringify({ message: inputMessage }),
            });
            setInputMessage('');

            // 메시지 전송 후 입력창에 포커스 설정
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    // 엔터 키로 메시지 제출하기
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
                <h2>Chat</h2>
            </div>
            <div className={styles.chatBody}>
                <div>
                    {messages.map((msg, index) => (
                        <div className={`${msg.userId === myUserId ? styles.myMessage : styles.yourMessage}`} key={index}>
                            <div className={styles.message}>
                                <div>사용자{msg.userId}</div>
                                <div>{msg.nickname}</div>
                                <div>{msg.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={bottomRef}></div>
            </div>
            <div className={styles.inputbox}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="메시지를 입력하세요"
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}

export default ChatRoom;
