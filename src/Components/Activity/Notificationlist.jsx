import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, query } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import NotificationItem from "./NotificationItem";

// 최대 알림 개수
const MAX_NOTIFICATIONS = 10;

// 알림 메시지 템플릿
const messages = [
  "님이 회원님의 게시글에 좋아요를 눌렀습니다.",
  "님이 회원님의 답글에 좋아요를 눌렀습니다.",
  "님이 회원님의 답글에 답변을 달았습니다.",
  "님이 회원님의 게시글에 답변을 달았습니다.",
  "님이 게시글에 회원님을 언급하였습니다.",
  "님이 게시글에 회원님의 게시글을 인용하였습니다.",
];

// 메시지
const getTypeLabel = (message) => {
  if (Math.random() < 0.1) {
    return "friend";
  }

  if (message.includes("좋아요")) {
    return "like";
  } else if (message.includes("답변")) {
    return "comment";
  } else if (message.includes("언급") || message.includes("인용")) {
    return "comment";
  }
};

const NotificationList = ({ onUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser; // 로그인 정보

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DesQuery = query(
          collection(db, "profile")
          // orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(DesQuery);

        let initialData = querySnapshot.docs.map((docSnapshot) => {
          const docData = docSnapshot.data();

          // const createdAt =
          //   docData.createdAt && docData.createdAt.toDate
          //     ? docData.createdAt.toDate()
          //     : new Date();

          const message =
            docData.message ||
            messages[Math.floor(Math.random() * messages.length)];

          // getTypeLabel
          const type = getTypeLabel(message);

          return {
            id: docSnapshot.id,

            username: docData.userEmail || "siro@ezen.com",
            // createdAt,
            isRead: false,
            message,
            type,
          };
        });

        // 로그인 회원 정보와 이메일 정보 동일
        if (currentUser && currentUser.email) {
          initialData = initialData.filter(
            (notification) => notification.username !== currentUser.email
          );
        }

        // 가져온 데이터를 최대 알림 개수까지 제한
        const limitedData = initialData.slice(0, MAX_NOTIFICATIONS);
        setNotifications(limitedData);

        if (typeof onUpdate === "function") {
          onUpdate(initialData);
        }
      } catch (error) {}
    };
    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 알림 읽음
  const markAsRead = async (id) => {
    try {
      const notificationRef = doc(db, "profile", id);
      await updateDoc(notificationRef, { isRead: true });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {}
  };

  //알림 삭제
  const handleDelete = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClick={() => {
            markAsRead(notification.id);
          }}
          onDelete={() => handleDelete(notification.id)}
        />
      ))}
    </>
  );
};

export default NotificationList;
