import React, { createContext, useReducer, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    userId: "junhyeok1234",
    nickname: "Junhyeok",
    id: uuidv4(), // UUID로 사용자 ID 생성
    profileImg: "profile01.png",
    desc: "세상에 여기 커스텀 엄청나다. 이게 수강생의 결과물이라니...",
    followers: ["minsu5678", "yuna_love123"],
    following: ["donghae_09", "soyeon_life"],
    myProfile: true,
    isFollowing: false,
    isFollowed: false,
    isBookmarked: true,
    isNotificationOn: false,
    links: {
      facebook: "https://facebook.com/junhyeok1234",
      instagram: "https://instagram.com/junhyeok1234",
      twitter: "https://twitter.com/junhyeok1234",
    },
    threads: [
      {
        id: uuidv4(), // UUID로 쓰레드 ID 생성
        userId: "junhyeok1234",
        userImg: "profile01.png",
        date: new Date().toISOString(), // 현재 날짜로 설정
        nickname: "Junhyeok",
        threadTime: "2시간 전",
        threadContent: {
          text: "오늘은 정말 좋은 날이에요! 공원에서 찍은 사진도 첨부합니다.",
          img: "park_photo01.jpg",
        },
        likeCount: 15,
        isLiked: true,
        replyCount: 10,
        shareCount: 5,
      },
    ],
  },
  // Minsu 프로필 추가
  {
    userId: "minsu5678",
    nickname: "Minsu",
    id: uuidv4(), // UUID로 사용자 ID 생성
    profileImg: "profile02.png",
    desc: "오늘도 비가 온다. 따뜻한 차 한 잔과 함께 생각을 정리해본다.",
    followers: ["junhyeok1234", "yuna_love123"],
    following: ["donghae_09", "soyeon_life"],
    myProfile: false,
    isFollowing: true,
    isFollowed: true,
    isBookmarked: false,
    isNotificationOn: true,
    links: {
      facebook: "https://facebook.com/minsu5678",
      instagram: "https://instagram.com/minsu5678",
      twitter: "https://twitter.com/minsu5678",
    },
    threads: [
      {
        id: uuidv4(), // UUID로 쓰레드 ID 생성
        userId: "minsu5678",
        userImg: "profile02.png",
        date: new Date().toISOString(),
        nickname: "Minsu",
        threadTime: "1시간 전",
        threadContent: {
          text: "비 오는 날씨에 따뜻한 차 한 잔. 정말 좋네요.",
          img: "tea_rain.jpg",
        },
        likeCount: 20,
        isLiked: false,
        replyCount: 8,
        shareCount: 12,
      },
    ],
  },
  // Yuna 프로필 추가
  {
    userId: "yuna_love123",
    nickname: "Yuna",
    id: uuidv4(), // UUID로 사용자 ID 생성
    profileImg: "profile03.png",
    desc: "새로운 커피숍에서 느낀 여유, 그리고 그 맛있는 커피.",
    followers: ["junhyeok1234", "minsu5678"],
    following: ["donghae_09", "soyeon_life"],
    myProfile: false,
    isFollowing: false,
    isFollowed: true,
    isBookmarked: false,
    isNotificationOn: false,
    links: {
      facebook: "https://facebook.com/yuna_love123",
      instagram: "https://instagram.com/yuna_love123",
      twitter: "https://twitter.com/yuna_love123",
    },
    threads: [
      {
        id: uuidv4(), // UUID로 쓰레드 ID 생성
        userId: "yuna_love123",
        userImg: "profile03.png",
        date: new Date().toISOString(),
        nickname: "Yuna",
        threadTime: "30분 전",
        threadContent: {
          text: "새로운 커피숍을 발견했어요! 분위기가 너무 좋아요.",
          img: "coffee_shop.jpg",
        },
        likeCount: 25,
        isLiked: true,
        replyCount: 5,
        shareCount: 3,
      },
    ],
  },
];

export const ThreadDataContext = createContext();
export const ThreadDispatchContext = createContext();

// reducer로 함수 전역관리
const ThreadReducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE_THREAD": {
      return [...state, action.data];
    }
    case "UPDATE_THREAD": {
      return state.map((user) =>
        user.threads.some((thread) => thread.id === action.data.id)
          ? {
              ...user,
              threads: user.threads.map((thread) =>
                thread.id === action.data.id ? { ...action.data } : thread
              ),
            }
          : user
      );
    }
    case "DELETE_THREAD": {
      return state.map((user) => ({
        ...user,
        threads: user.threads.filter((thread) => thread.id !== action.targetId),
      }));
    }
    case "UPDATE_PROFILE": {
      return state.map((user) =>
        user.userId === action.data.userId
          ? { ...user, ...action.data.profile }
          : user
      );
    }
    default: {
      return state;
    }
  }
};

const ThreadProvider = ({ children }) => {
  const [data, dispatch] = useReducer(ThreadReducer, []); // 빈 배열인 이유는 초기화 상태이기 때문에,

  // 초기화 함수 (INIT)
  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData, // 초기 mock 데이터를 설정
    });
  }, []);

  // 게시물 생성 함수 (CREATE)
  const createThread = (userId, userImg, nickname, content, img) => {
    const newThread = {
      id: uuidv4(), // UUID 생성
      userId,
      userImg,
      nickname,
      threadTime: "방금 전", // 새로운 게시물 시간
      threadContent: {
        text: content,
        img: img,
      },
      likeCount: 0,
      isLiked: false,
      replyCount: 0,
      shareCount: 0,
    };

    dispatch({
      type: "CREATE_THREAD",
      data: newThread,
    });
  };

  // 게시물 수정 함수 (UPDATE)
  const updateThread = (threadId, updatedContent) => {
    dispatch({
      type: "UPDATE_THREAD",
      data: {
        id: threadId,
        ...updatedContent,
      },
    });
  };

  // 게시물 삭제 함수 (DELETE)
  const deleteThread = (threadId) => {
    dispatch({
      type: "DELETE_THREAD",
      targetId: threadId,
    });
  };

  // 유저 프로필 수정 함수 (UPDATE_PROFILE)
  const updateProfile = (userId, updatedProfile) => {
    dispatch({
      type: "UPDATE_PROFILE",
      data: {
        userId,
        profile: updatedProfile,
      },
    });
  };

  return (
    <ThreadDataContext.Provider value={data}>
      <ThreadDispatchContext.Provider
        value={{ createThread, updateThread, deleteThread, updateProfile }}
      >
        {children}
      </ThreadDispatchContext.Provider>
    </ThreadDataContext.Provider>
  );
};

export default ThreadProvider;
