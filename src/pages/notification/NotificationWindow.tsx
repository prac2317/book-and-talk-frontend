// src/components/NotificationWindow.tsx

import React, { useEffect, useState } from 'react';
import ky from 'ky';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './NotificationWindow.css';

dayjs.extend(relativeTime);

// 타입 정의
enum NotificationType {
    REQUEST = 'REQUEST',
    APPROVED = 'APPROVED',
    BOOK = 'BOOK',
}

interface NotificationDto {
    notificationId: number;
    type: NotificationType;
    isRead: boolean;
    createdAt: string; // ISO 문자열 형식
    groupId?: number;
    userId?: number;
    bookId?: number;
}

interface GetNotificationListResponse {
    data: NotificationDto[];
}

const NotificationWindow: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ky 인스턴스 설정
    const api = ky.create({
        prefixUrl: 'http://localhost:8080/api/', // 백엔드 서버 주소로 변경
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // JWT 토큰 사용 시
            'Content-Type': 'application/json',
        },
        timeout: 10000, // 10초 타임아웃
    });

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response: GetNotificationListResponse = await api.get('notification').json();
            const sortedData = response.data.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setNotifications(sortedData);
        } catch (err) {
            console.error('알림을 불러오는데 실패했습니다:', err);
            setError('알림을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const getMessage = (type: NotificationType): string => {
        switch (type) {
            case NotificationType.REQUEST:
                return '회원님의 모임에 신규 참가 신청이 있습니다!';
            case NotificationType.APPROVED:
                return '회원님의 참가 신청이 승인되었습니다!';
            case NotificationType.BOOK:
                return '회원님이 즐겨찾기 한 책의 모임이 개설되었습니다!';
            default:
                return '새로운 알림이 도착했습니다.';
        }
    };

    const formatTime = (createdAt: string): string => {
        const now = dayjs();
        const createdTime = dayjs(createdAt);
        const diffHours = now.diff(createdTime, 'hour');
        if (diffHours < 24) {
            return `${diffHours}시간 전`;
        }
        const diffDays = now.diff(createdTime, 'day');
        return `${diffDays}일 전`;
    };

    const handleNotificationClick = async (notificationId: number) => {
        try {
            await api.put(`notifications/${notificationId}/read`);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.notificationId === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (err) {
            console.error('알림을 읽음으로 처리하는데 실패했습니다:', err);
            // 사용자에게 에러 메시지를 표시할 수 있습니다.
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="notification-window">
            {notifications.length === 0 ? (
                <div>알림이 없습니다.</div>
            ) : (
                notifications.map((notification) => (
                    <div
                        key={notification.notificationId}
                        className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
                        onClick={() => handleNotificationClick(notification.notificationId)}
                    >
                        <div className="notification-message">{getMessage(notification.type)}</div>
                        <div className="notification-time">{formatTime(notification.createdAt)}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NotificationWindow;
