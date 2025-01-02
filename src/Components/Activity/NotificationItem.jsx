import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { UserIcon2 } from "../Common/Icon";
import { formatDistanceToNow } from "date-fns";
import { motion, useMotionValue, useAnimate } from "framer-motion";

const Contain = styled.div``;

const NotificationContain = styled(motion.div)`
  position: relative;
  width: 680px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 20px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 10px;
  }
`;

const DeleteButton = styled(motion.div)`
  position: absolute;
  height: 82px;
  top: 10%;
  right: 0;
  display: grid;
  place-content: center;
  width: 70px;
  aspect-ratio: 1/1;
  background: #000;

  @media (max-width: 768px) {
    top: 13%;
  }

  @media (max-width: 480px) {
    top: -13%;
  }
`;

const DeleteLabel = styled(motion.p)`
  color: #fff;
  font-size: 12px;
  font-weight: 300;
`;

const Wrapper = styled.div`
  color: ${(props) =>
    props.isRead ? props.theme.borderstroke : props.theme.fontcolor};
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const UserWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  path {
    fill: ${(props) => props.theme.searchColor};
  }
`;

const UserContex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const UserDate = styled.p`
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
`;

const NotificationItem = ({
  img,
  username,
  createdAt,
  onClick,
  isRead,
  message,
  type,
  onDelete,
}) => {
  // 날짜 포맷 함수
  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  useEffect(() => {}, [isRead]);

  // 삭제 관련 상태 및 애니메이션 처리
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const itemX = useMotionValue(0);
  const deleteAnimateState = isDeleteShow ? "appear" : "disappear";
  const [animateRef, animate] = useAnimate();
  const DELETE_THRESHOLD = -10;

  useEffect(() => {
    itemX.on("change", (v) => {
      const isOverThreshold = v < DELETE_THRESHOLD / 2;
      setIsDeleteShow(isOverThreshold);
    });
  }, [itemX]);

  // 클릭 이벤트 처리
  const handleClick = () => {
    if (itemX.get() === 0) {
      onClick();
    }
  };

  // 드래그 종료 시 삭제 처리
  const handleDelete = () => {
    const isOverThreshold = itemX.get() < DELETE_THRESHOLD;
    if (isOverThreshold) {
      onDelete(); // 삭제 실행
    } else {
      animate(animateRef.current, { x: 0 });
    }
  };

  return (
    <NotificationContain
      drag="x"
      dragElastic={0.5}
      dragMomentum={false}
      dragConstraints={{ left: DELETE_THRESHOLD, right: 0 }} // 드래그 제한 범위 설정
      style={{ x: itemX }}
      onDragEnd={handleDelete} // 드래그 종료 시 삭제 처리
      ref={animateRef}
    >
      <Wrapper onClick={handleClick} isRead={isRead}>
        <UserWrapper>
          {img ? (
            <img src={img} alt={`${username || "사용자"}의 프로필 이미지`} />
          ) : (
            <UserIcon2 width={50} height={50} />
          )}
        </UserWrapper>
        <UserContex>
          <User>
            {type === "friend" && "친한친구 "}
            {username}
            {message}
          </User>
          <UserDate>{renderTimeAgo()}</UserDate>
          {isRead && <UserDate>읽음</UserDate>}
        </UserContex>
      </Wrapper>
      <DeleteButton
        initial="disappear"
        animate={deleteAnimateState}
        variants={{ appear: { opacity: 1 }, disappear: { opacity: 0 } }}
        onClick={handleDelete} // 삭제 버튼 클릭 시 삭제
      >
        <DeleteLabel
          variants={{
            appear: { scale: 1 },
            disappear: { scale: 0 },
          }}
        >
          삭제
        </DeleteLabel>
      </DeleteButton>
    </NotificationContain>
  );
};

export default NotificationItem;
