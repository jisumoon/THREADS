import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

// StyledSvg 스타일링
const StyledSvg = styled.svg`
  width: ${(props) => props.width || props.defaultWidth};
  height: ${(props) => props.height || props.defaultHeight};
`;

///Password-eye-open
export const EyeOpenIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "29px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={fill || "currentColor"}
        fill="none"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        stroke={fill || "currentColor"}
        fill="none"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </StyledSvg>
  );
};

//Password-eye-close
export const EyeCloseIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "29px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"
        fill={fill}
      />
    </StyledSvg>
  );
};

//Clap
export const ClapIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "20px";

  return (
    <StyledSvg
      width={width || "20px"}
      height={height}
      defaultWidth="20px"
      defaultHeight="20px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M336 16l0 64c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16s16 7.2 16 16zm-98.7 7.1l32 48c4.9 7.4 2.9 17.3-4.4 22.2s-17.3 2.9-22.2-4.4l-32-48c-4.9-7.4-2.9-17.3 4.4-22.2s17.3-2.9 22.2 4.4zM135 119c9.4-9.4 24.6-9.4 33.9 0L292.7 242.7c10.1 10.1 27.3 2.9 27.3-11.3l0-39.4c0-17.7 14.3-32 32-32s32 14.3 32 32l0 153.6c0 57.1-30 110-78.9 139.4c-64 38.4-145.8 28.3-198.5-24.4L7 361c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l53 53c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L23 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l93 93c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L55 185c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l117 117c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1l-93-93c-9.4-9.4-9.4-24.6 0-33.9zM433.1 484.9c-24.2 14.5-50.9 22.1-77.7 23.1c48.1-39.6 76.6-99 76.6-162.4l0-98.1c8.2-.1 16-6.4 16-16l0-39.4c0-17.7 14.3-32 32-32s32 14.3 32 32l0 153.6c0 57.1-30 110-78.9 139.4zM424.9 18.7c7.4 4.9 9.3 14.8 4.4 22.2l-32 48c-4.9 7.4-14.8 9.3-22.2 4.4s-9.3-14.8-4.4-22.2l32-48c4.9-7.4 14.8-9.3 22.2-4.4z"
        fill={fill}
      />
    </StyledSvg>
  );
};

//Camera
export const CameraIcon = ({ width, fill }) => {
  const height = width ? `${(width / 22) * 18}px` : "18px";

  return (
    <StyledSvg
      width={width || "22px"}
      height={height}
      defaultWidth="22px"
      defaultHeight="18px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        stroke={fill || "#BABABA"}
        strokeWidth="1.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        stroke={fill || "#BABABA"}
        strokeWidth="1.5"
      />
    </StyledSvg>
  );
};

//Piture
export const PictureIcon = ({ width, fill }) => {
  const height = width ? `${(width / 512) * 512}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
        fill={fill || "#BABABA"}
      />
    </StyledSvg>
  );
};

//Mic
export const MicIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" // 내부를 비우도록 fill="none" 유지
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
        stroke={fill || "#BABABA"} // 테마의 fill 값 사용
        strokeWidth="1.5"
      />
    </StyledSvg>
  );
};

//Hashtag
export const HashtagIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";
  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9H20"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15H20"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3L8 21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3L14 21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

// User
export const UserIcon1 = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
      />
    </StyledSvg>
  );
};

// HeartIcon 컴포넌트
export const HeartIcon = ({ width, initialFill }) => {
  const [isFilled, setIsFilled] = useState(false); // 클릭 여부를 관리할 상태
  const height = width ? `${(width / 24) * 24}px` : "24px";

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    setIsFilled(!isFilled); // 클릭할 때마다 상태를 반전
  };

  return (
    <StyledSvg
      onClick={handleClick} // 클릭 시 색상이 변경되도록 설정
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        cursor: "pointer",
        transition: "fill 0.2s ease, stroke 0.2s ease",
      }} // 부드러운 전환 추가
    >
      <path
        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999Z"
        stroke={isFilled ? "red" : initialFill || "#BABABA"} // 상태에 따라 색상 변경
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isFilled ? "red" : "none"} // 채워진 상태일 때 빨간색으로 채움
        style={{ transition: "fill 0.2s ease-in, stroke 0.2s ease-out" }} // 부드러운 전환 추가
      />
    </StyledSvg>
  );
};

//coment
export const Coment = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7588 9.81888C19.7622 11.1387 19.4539 12.4408 18.8588 13.6189C18.1532 15.0306 17.0685 16.218 15.7262 17.0482C14.3839 17.8783 12.837 18.3183 11.2588 18.3189C9.93892 18.3223 8.6369 18.0139 7.45879 17.4189L1.75879 19.3189L3.65879 13.6189C3.06372 12.4408 2.75535 11.1387 2.75879 9.81888C2.7594 8.24063 3.1994 6.69373 4.02951 5.35143C4.85962 4.00913 6.04704 2.92444 7.45879 2.21888C8.6369 1.62381 9.93892 1.31543 11.2588 1.31888H11.7588C13.8431 1.43387 15.8118 2.31364 17.2879 3.78974C18.764 5.26583 19.6438 7.23453 19.7588 9.31888V9.81888Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </StyledSvg>
  );
};

//DM
export const DmIcon = ({ width, fill }) => {
  const height = width ? `${(width / 22) * 22}px` : "20px";

  return (
    <StyledSvg
      width={width || "20px"}
      height={height}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 1L10 12M21 1L14 21L10 12M21 1L1 8L10 12"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </StyledSvg>
  );
};

//Speech Bubble
export const SpeechBubbleIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "19.458px"}
      height={width ? `${(width / 19.458) * 18}px` : "18px"}
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4577 9.50003C20.4614 10.8199 20.1281 12.1219 19.4848 13.3C18.7221 14.7118 17.5496 15.8992 16.0986 16.7293C14.6476 17.5594 12.9754 17.9994 11.2693 18C9.84259 18.0035 8.43513 17.6951 7.16161 17.1L1 19L3.05387 13.3C2.41061 12.1219 2.07726 10.8199 2.08098 9.50003C2.08164 7.92179 2.55728 6.37488 3.45461 5.03258C4.35194 3.69028 5.63553 2.6056 7.16161 1.90003C8.43513 1.30496 9.84259 0.996587 11.2693 1.00003H11.8098C14.063 1.11502 16.1911 1.99479 17.7868 3.47089C19.3824 4.94699 20.3334 6.91568 20.4577 9.00003V9.50003Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2px"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </StyledSvg>
  );
};

//Plus
export const PlusIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "24px"}
      height={width ? `${(width / 24) * 24}px` : "24px"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M5 12H19"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </StyledSvg>
  );
};

//MagnifyingGlassIcon
export const MagnifyingGlassIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20.9999 21L16.6499 16.65"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </StyledSvg>
  );
};

//bottomNavHeart
export const Like = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 22"
    >
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.6 1C3.955 1 1 3.86955 1 7.40914C1 13.8183 8.8 19.6448 13 21C17.2 19.6448 25 13.8183 25 7.40914C25 3.86955 22.045 1 18.4 1C16.168 1 14.194 2.07615 13 3.7233C12.3913 2.8816 11.5828 2.19467 10.6428 1.72064C9.70286 1.2466 8.65915 0.99942 7.6 1Z"
          stroke={fill || "#BABABA"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </StyledSvg>
  );
};

//bottomNavHome
export const Home = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";
  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 22"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.488 0.536096C10.9156 0.189279 11.4494 0 12 0C12.5506 0 13.0844 0.189279 13.512 0.536096L22.6656 7.95105C23.0818 8.28807 23.4176 8.71369 23.6484 9.19691C23.8793 9.68012 23.9994 10.2088 24 10.7443V21.6003C24 22.2368 23.7471 22.8471 23.2971 23.2972C22.847 23.7472 22.2365 24 21.6 24H16.8C16.1635 24 15.553 23.7472 15.1029 23.2972C14.6529 22.8471 14.4 22.2368 14.4 21.6003V14.4013H9.6V21.6003C9.6 22.2368 9.34714 22.8471 8.89706 23.2972C8.44697 23.7472 7.83652 24 7.2 24H2.4C1.76348 24 1.15303 23.7472 0.702944 23.2972C0.252856 22.8471 7.04615e-08 22.2368 7.04615e-08 21.6003V10.7467C-0.000106048 10.2103 0.119654 9.68078 0.350527 9.19668C0.581399 8.71258 0.917548 8.28618 1.3344 7.94865L10.488 0.536096ZM21.156 9.81319L12 2.40303L2.844 9.81319C2.70509 9.92586 2.59313 10.0682 2.51631 10.2297C2.43949 10.3912 2.39975 10.5678 2.4 10.7467V21.6003H7.2V14.4013C7.2 13.7649 7.45286 13.1546 7.90294 12.7045C8.35303 12.2545 8.96348 12.0017 9.6 12.0017H14.4C15.0365 12.0017 15.647 12.2545 16.0971 12.7045C16.5471 13.1546 16.8 13.7649 16.8 14.4013V21.6003H21.6V10.7467C21.6003 10.5678 21.5605 10.3912 21.4837 10.2297C21.4069 10.0682 21.2949 9.92586 21.156 9.81319Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#bababa"
        />
      </svg>
    </StyledSvg>
  );
};
export const GoBack = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 22"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13L1 7L7 1"
          stroke="#747474"
          stroke-linecap="round"
          stroke-linejoin="round"
          strokeWidth={2}
        />
      </svg>
    </StyledSvg>
  );
};

//BellOffIcon
export const BellOffIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        fill="none"
        d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
        stroke={fill || "currentColor"}
      />
    </StyledSvg>
  );
};

//Star
export const StarIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        fill="none"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        stroke={fill || "currentColor"}
      />
    </StyledSvg>
  );
};

// RetweetIcon 컴포넌트
export const RetweetIcon = ({ width, initialFill }) => {
  const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 관리할 상태

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    setIsClicked(!isClicked); // 클릭할 때마다 상태를 반전
  };

  return (
    <StyledSvg
      onClick={handleClick} // 클릭 시 색상이 변경되도록 설정
      width={width || "26.64px"}
      height={width ? `${(width / 26.64) * 15.98}px` : "15.98px"}
      viewBox="0 0 28 17"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer", transition: "fill 0.3s ease" }} // 부드러운 전환과 커서 스타일 추가
    >
      <path
        d="M7.10773 0.189636C6.40124 0.189636 5.7237 0.470285 5.22414 0.969843C4.72458 1.4694 4.44393 2.14695 4.44393 2.85343V10.8448H0.448242L5.77583 16.1724L11.1034 10.8448H7.10773V2.85343H16.431L19.0948 0.189636H7.10773ZM20.4267 5.51722H16.431L21.7586 0.189636L27.0862 5.51722H23.0905V13.5086C23.0905 14.2151 22.8098 14.8926 22.3103 15.3922C21.8107 15.8917 21.1332 16.1724 20.4267 16.1724H8.43962L11.1034 13.5086H20.4267V5.51722Z"
        fill={isClicked ? "#0396f6" : initialFill || "#BABABA"} // 상태에 따라 색상 변경
        style={{ transition: "fill 0.3s ease" }} // 부드러운 전환 효과 추가
      />
    </StyledSvg>
  );
};

//SoundIcon
export const SoundIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "29px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={fill || "currentColor"}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
      />
    </StyledSvg>
  );
};

//CustomArrowIcon
export const CustomArrowIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "24px"}
      height={width ? `${(width / 24) * 24}px` : "24px"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth="1.5"
      stroke={fill || "currentColor"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5" /* 새로운 path 데이터 적용 */
      />
    </StyledSvg>
  );
};

//CustomArrowUpIcon
export const CustomArrowUpIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "24px"}
      height={width ? `${(width / 24) * 24}px` : "24px"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth="1.5"
      stroke={fill || "currentColor"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5" /* 새로운 path 데이터 적용 */
      />
    </StyledSvg>
  );
};

export const Thread100Icon = ({ width, fill }) => {
  const height = (114.755 / 100) * parseFloat(width); // Calculate height based on width
  return (
    <StyledSvg
      width={width || "100px"}
      height={`${height}px`}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.5081 114.755C38.9287 114.755 33.6042 113.325 24.7585 108.553C17.0945 104.419 10.487 98.8851 6.95008 90.943C-5.72309 62.4938 -1.87304 19.9447 25.2102 5.80419C38.9625 -1.37498 60.7775 -2.16389 74.7494 4.95321C88.1514 11.7802 94.6361 22.4311 100 36.0964L89.0514 39.2306C83.9949 20.825 71.8118 10.6279 52.0366 10.6279C44.2216 10.6279 37.1298 11.4146 31.17 14.375C16.9142 21.4525 11.0727 38.0557 10.4982 54.8733C10.0803 67.0941 12.0516 79.4299 17.4943 88.3054C23.72 98.4562 36.6567 104.876 48.7836 104.876C60.1422 104.876 69.2819 102.897 76.3309 96.2724C85.9301 87.249 87.9306 72.8602 75.6945 64.0874C71.9255 96.3175 28.3067 94.479 28.3067 68.8615C28.3067 63.5423 30.3714 58.9003 34.4996 54.9365C42.6987 47.0644 55.0351 49.3905 65.3237 49.2347C64.239 44.3692 60.1107 37.3199 52.1864 37.3199C46.0802 37.3199 40.8188 38.8582 37.9904 43.5961L29.4669 38.0557C33.077 31.2637 40.3558 26.8034 51.523 26.8034C62.6901 26.8034 73.6219 34.1247 75.4343 48.009L75.9941 52.2967C82.3065 54.8485 86.8504 59.609 90.0054 64.4057C98.8759 77.8927 93.985 95.1934 81.3175 105.949C74.4059 111.818 64.1342 114.754 50.5092 114.754L50.5081 114.755ZM38.4837 68.6448C38.4837 73.9222 44.0718 77.869 49.4819 77.869C55.5172 77.869 59.6669 76.1637 61.9298 72.753C64.1928 69.3423 65.3248 65.2341 65.3248 60.4307C59.1251 58.8517 48.3386 57.7197 42.6221 61.5108C39.93 63.2962 38.4849 65.5704 38.4849 68.6448H38.4837Z"
        fill={fill || "currentColor"}
      />
    </StyledSvg>
  );
};

export const InstaIcon = ({ width, fill }) => {
  const height = (22 / 22) * parseFloat(width);
  return (
    <StyledSvg
      width={width || "22px"}
      height={`${height}px` || "22px"}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_580_5438)">
        <path
          d="M16.0205 0.960205H5.98078C3.2084 0.960205 0.960938 3.20766 0.960938 5.98005V16.0197C0.960938 18.7921 3.2084 21.0396 5.98078 21.0396H16.0205C18.7928 21.0396 21.0403 18.7921 21.0403 16.0197V5.98005C21.0403 3.20766 18.7928 0.960205 16.0205 0.960205Z"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.0157 10.3675C15.1396 11.203 14.9968 12.0564 14.6078 12.8061C14.2188 13.5559 13.6032 14.1639 12.8487 14.5437C12.0942 14.9234 11.2392 15.0556 10.4052 14.9214C9.57126 14.7872 8.80085 14.3935 8.20357 13.7962C7.60629 13.1989 7.21255 12.4285 7.07835 11.5946C6.94416 10.7606 7.07634 9.90556 7.4561 9.15105C7.83587 8.39655 8.44387 7.78101 9.19363 7.39197C9.94339 7.00293 10.7967 6.86021 11.6323 6.98412C12.4846 7.1105 13.2736 7.50765 13.8829 8.1169C14.4921 8.72615 14.8893 9.5152 15.0157 10.3675Z"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5215 5.47815H16.5311"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_580_5438">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </StyledSvg>
  );
};

export const FacebookIcon = ({ width, fill }) => {
  const height = (22 / 22) * parseFloat(width);
  return (
    <StyledSvg
      width={width || "22px"}
      height={`${height}px` || "22px"}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_580_5501)">
        <path
          d="M0.785156 19.6428V2.35707C0.785156 1.9403 0.950717 1.54061 1.24542 1.24591C1.54012 0.951205 1.93982 0.785645 2.35658 0.785645H19.6423C20.0591 0.785645 20.4588 0.951205 20.7535 1.24591C21.0482 1.54061 21.2137 1.9403 21.2137 2.35707V19.6428C21.2137 20.0596 21.0482 20.4593 20.7535 20.754C20.4588 21.0487 20.0591 21.2142 19.6423 21.2142H14.928V13.7656H16.0437C16.298 13.7656 16.5418 13.6647 16.7215 13.4849C16.9013 13.3051 17.0023 13.0613 17.0023 12.8071V11.5971C17.0023 11.3428 16.9013 11.099 16.7215 10.9193C16.5418 10.7395 16.298 10.6385 16.0437 10.6385H14.9909V9.16136C14.9909 7.84136 15.588 7.84136 16.1852 7.84136H16.9552C17.0816 7.84657 17.2077 7.82394 17.3245 7.77506C17.4412 7.72618 17.5458 7.65225 17.6309 7.5585C17.7222 7.47156 17.7945 7.36662 17.8432 7.25031C17.8919 7.134 17.9159 7.00886 17.9137 6.88279V5.71993C17.9179 5.59197 17.8969 5.46443 17.8517 5.34462C17.8066 5.22481 17.7383 5.11506 17.6507 5.02166C17.5632 4.92825 17.4581 4.85303 17.3414 4.80027C17.2247 4.74752 17.0988 4.71828 16.9709 4.71422H15.1637C14.6364 4.69439 14.1111 4.78927 13.6241 4.99229C13.137 5.19531 12.6998 5.50164 12.3427 5.89012C11.9856 6.2786 11.7171 6.73996 11.5557 7.24235C11.3944 7.74473 11.344 8.27616 11.408 8.79993V10.6385H10.4023C10.2751 10.6364 10.1488 10.6597 10.0306 10.7069C9.91252 10.7541 9.80499 10.8244 9.7143 10.9136C9.62362 11.0029 9.55161 11.1092 9.50245 11.2266C9.4533 11.3439 9.428 11.4699 9.42801 11.5971V12.8071C9.428 12.9343 9.4533 13.0602 9.50245 13.1776C9.55161 13.2949 9.62362 13.4013 9.7143 13.4905C9.80499 13.5797 9.91252 13.65 10.0306 13.6972C10.1488 13.7445 10.2751 13.7677 10.4023 13.7656H11.408V21.2142H2.35658C1.93982 21.2142 1.54012 21.0487 1.24542 20.754C0.950717 20.4593 0.785156 20.0596 0.785156 19.6428Z"
          stroke={fill || "currentColor"}
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_580_5501">
          <rect width="22" height="22" fill="none" />
        </clipPath>
      </defs>
    </StyledSvg>
  );
};

export const XIcon = ({ width, fill }) => {
  const height = (17.063 / 18.875) * parseFloat(width);
  return (
    <StyledSvg
      width={width || "18px "}
      height={`${height}px`}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8641 0H17.7598L11.4352 7.22695L18.8754 17.0625H13.0512L8.48613 11.0988L3.26895 17.0625H0.369141L7.13262 9.33105L0 0H5.97187L10.0939 5.45098L14.8641 0ZM13.8469 15.3316H15.4506L5.09824 1.64062H3.37559L13.8469 15.3316Z"
        fill={fill || "currentColor"}
      />
    </StyledSvg>
  );
};

export const NaverIcon = ({ width, fill }) => {
  const height = (19.25 / 21.27) * parseFloat(width);
  return (
    <StyledSvg
      width={width || "21.27px"}
      height={`${height}px`}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0V19.25H7.40635V9.61907L13.8513 19.25H21.2695V0H13.8513V9.61907L7.40635 0H0Z"
        fill={fill || "currentColor"}
      />
    </StyledSvg>
  );
};

export const EmailIcon = ({ width, fill }) => {
  const height = (width * 22) / 22;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "22px"}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
    >
      <g clipPath="url(#clip0_608_4896)">
        <path
          d="M10.7252 13.3467C12.1731 13.3467 13.3468 12.173 13.3468 10.7251C13.3468 9.27715 12.1731 8.10339 10.7252 8.10339C9.27728 8.10339 8.10352 9.27715 8.10352 10.7251C8.10352 12.173 9.27728 13.3467 10.7252 13.3467Z"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M13.3461 7.22337V12.7234C13.3461 13.1294 13.5073 13.5187 13.7944 13.8058C14.0815 14.0929 14.4709 14.2542 14.8769 14.2542C15.1575 14.257 15.4333 14.1812 15.673 14.0354C15.9128 13.8896 16.107 13.6796 16.2336 13.4292C16.7425 12.3857 16.9429 11.2185 16.8111 10.065C16.6654 8.79367 16.1256 7.59973 15.2674 6.65049C14.4092 5.70125 13.2755 5.04427 12.0252 4.77158C10.7749 4.4989 9.47061 4.62418 8.29508 5.12987C7.11955 5.63556 6.13166 6.49633 5.46982 7.59157C4.80797 8.68682 4.50534 9.96167 4.60431 11.2375C4.70328 12.5134 5.1989 13.7263 6.02173 14.7064C6.84456 15.6865 7.95337 16.3846 9.19282 16.7029C10.4323 17.0213 11.7403 16.9439 12.9336 16.4817"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M16.8479 1.1001H4.60128C2.66736 1.1001 1.09961 2.66785 1.09961 4.60176V16.8484C1.09961 18.7823 2.66736 20.3501 4.60128 20.3501H16.8479C18.7819 20.3501 20.3496 18.7823 20.3496 16.8484V4.60176C20.3496 2.66785 18.7819 1.1001 16.8479 1.1001Z"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_608_4896">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EtcWebIcon = ({ width, fill }) => {
  const height = (width * 22) / 21.12;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "21.12px"}
      height={height}
      viewBox="0 0 23 24"
      fill="none"
    >
      <path
        d="M19.7889 1.87988H3.33286C2.53094 1.87988 1.88086 2.55951 1.88086 3.39788V20.6019C1.88086 21.4403 2.53094 22.1199 3.33286 22.1199H19.7889C20.5908 22.1199 21.2409 21.4403 21.2409 20.6019V3.39788C21.2409 2.55951 20.5908 1.87988 19.7889 1.87988Z"
        stroke={fil || "currentColor"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M1.88086 8.92004H21.2409"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.03906 22.12V8.92004"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FixIcon = ({ width, fill }) => {
  const height = (width * 25) / 27.025;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "27.025px"}
      height={height}
      viewBox="0 0 30 27"
      fill="none"
    >
      <path
        d="M28.0246 12.72L15.248 23.8672C13.6828 25.2328 11.5598 26 9.34628 26C7.13271 26 5.0098 25.2328 3.44457 23.8672C1.87934 22.5016 1 20.6494 1 18.7181C1 16.7869 1.87934 14.9347 3.44457 13.5691L16.2212 2.42187C17.2647 1.51146 18.6799 1 20.1557 1C21.6314 1 23.0466 1.51146 24.0901 2.42187C25.1336 3.33228 25.7198 4.56706 25.7198 5.85458C25.7198 7.14209 25.1336 8.37688 24.0901 9.28729L11.2996 20.4345C10.7779 20.8897 10.0702 21.1454 9.33238 21.1454C8.59452 21.1454 7.88688 20.8897 7.36514 20.4345C6.8434 19.9793 6.55028 19.3619 6.55028 18.7181C6.55028 18.0744 6.8434 17.457 7.36514 17.0018L19.1686 6.71579"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PlusLinkIcon = ({ width, fill }) => {
  const height = (width * 18) / 19;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "19px"}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.45 8.1H13.3V9.9H10.45V12.6H8.55001V9.9H5.69999V8.1H8.55001V5.4H10.45V8.1ZM9.5 16.2C5.30955 16.2 1.90001 12.9699 1.90001 9C1.90001 5.0301 5.30955 1.8 9.5 1.8C13.6904 1.8 17.1 5.0301 17.1 9C17.1 12.9699 13.6904 16.2 9.5 16.2ZM9.5 0C4.25315 0 0 4.0293 0 9C0 13.9707 4.25315 18 9.5 18C14.7469 18 19 13.9707 19 9C19 4.0293 14.7469 0 9.5 0Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const CloseIcon = ({ width, fill, border, borderRadius }) => {
  const height = (width * 12) / 12;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24px"}
      height={width || "24px"}
      fill={fill || "#000000"} // fill Prop을 사용하여 색상을 설정
      viewBox="0 0 14 14"
    >
      <path
        d="M13 1L1 13"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L13 13"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EtcIcon = ({ width, fill }) => {
  const height = (width * 4) / 22;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "22px"}
      height={height}
      viewBox="0 0 22 4"
      fill="none"
    >
      <circle cx="2" cy="2" r="2" fill={fill} />
      <circle cx="11" cy="2" r="2" fill={fill} />
      <circle cx="20" cy="2" r="2" fill={fill} />
    </svg>
  );
};

export const CheckIcon = ({ width, fill }) => {
  const height = (width * 24) / 25;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "25px"}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 23.9999C14.1415 23.9999 15.767 23.6895 17.2835 23.0864C18.8001 22.4834 20.1781 21.5995 21.3388 20.4852C22.4996 19.3709 23.4203 18.048 24.0485 16.5921C24.6767 15.1362 25 13.5757 25 11.9999C25 10.424 24.6767 8.86358 24.0485 7.40767C23.4203 5.95177 22.4996 4.6289 21.3388 3.51459C20.1781 2.40029 18.8001 1.51638 17.2835 0.91332C15.767 0.310264 14.1415 -0.000125527 12.5 -0.000125504C9.18479 -0.000125456 6.00536 1.26416 3.66116 3.51459C1.31696 5.76503 -4.76837e-06 8.81728 -4.76837e-06 11.9999C-4.76837e-06 15.1825 1.31696 18.2347 3.66116 20.4852C6.00536 22.7356 9.18479 23.9999 12.5 23.9999ZM12.1778 16.8532L19.1222 8.85321L16.9889 7.14654L11.0167 14.0252L7.92638 11.0572L5.9625 12.9425L10.1292 16.9425L11.2042 17.9745L12.1778 16.8532Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const FillArrowIcon = ({ width, fill }) => {
  const height = width ? (24 / 24) * parseInt(width) + "px" : "24px";
  return (
    <svg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M12.6958 10.3H7.2C6.26113 10.3 5.5 11.0611 5.5 12C5.5 12.9389 6.26113 13.7 7.2 13.7H12.6959L10.7979 15.5979C10.1341 16.2618 10.1341 17.3382 10.7979 18.0021C11.4618 18.6659 12.5382 18.6659 13.2021 18.0021L18.0021 13.2021C18.3208 12.8833 18.5 12.4509 18.5 12C18.5 11.5491 18.3208 11.1167 18.0021 10.7979L13.2021 5.99792C13.2021 5.99792 13.2021 5.99792 13.2021 5.99792C12.5382 5.33403 11.4618 5.33403 10.7979 5.99792L11.1429 6.34284L10.7979 5.99793C10.1341 6.66182 10.1341 7.73818 10.7979 8.40207L10.7979 8.40209L12.6958 10.3ZM0.5 12C0.5 5.64872 5.64872 0.5 12 0.5C18.3512 0.5 23.5 5.64872 23.5 12C23.5 18.3512 18.3512 23.5 12 23.5C5.64872 23.5 0.5 18.3512 0.5 12Z"
        fill={fill || "currentColor"}
        stroke={fill || "currentColor"}
      />
    </svg>
  );
};

export const ArrowIcon = ({ width, fill }) => {
  const height = (width / 21) * 12;
  return (
    <svg
      width={width || "21px"}
      height={height}
      viewBox="0 0 12 21"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M10.5 1L1 10.5L10.5 20"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BellIcon = ({ width, fill }) => {
  const height = (width / 12) * 12;
  return (
    <svg
      width={width || "12px"}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.00001 0.5C4.15901 0.5 2.50001 1.7825 2.50001 3.5V5.7695C2.50001 6.09036 2.40501 6.40404 2.22701 6.671L1.12701 8.3205C1.0509 8.43487 1.00725 8.56775 1.00073 8.70497C0.994213 8.8422 1.02506 8.97862 1.08998 9.09969C1.15491 9.22076 1.25147 9.32194 1.36938 9.39244C1.48729 9.46294 1.62213 9.50011 1.75951 9.5H4.25001C4.25001 9.72981 4.29527 9.95738 4.38322 10.1697C4.47116 10.382 4.60007 10.5749 4.76257 10.7374C4.92507 10.8999 5.11799 11.0288 5.33031 11.1168C5.54263 11.2047 5.77019 11.25 6.00001 11.25C6.22982 11.25 6.45738 11.2047 6.6697 11.1168C6.88202 11.0288 7.07494 10.8999 7.23744 10.7374C7.39995 10.5749 7.52885 10.382 7.6168 10.1697C7.70474 9.95738 7.75001 9.72981 7.75001 9.5H10.241C10.3784 9.49999 10.5132 9.4627 10.631 9.39211C10.7489 9.32151 10.8453 9.22025 10.9102 9.09913C10.975 8.97801 11.0057 8.84157 10.9991 8.70436C10.9925 8.56715 10.9487 8.4343 10.8725 8.32L9.77251 6.671C9.59468 6.40399 9.49986 6.09031 9.50001 5.7695V3.5C9.50001 1.7825 7.84051 0.5 6.00001 0.5ZM3.25001 3.5C3.25001 2.318 4.44151 1.25 6.00001 1.25C7.55851 1.25 8.75001 2.318 8.75001 3.5V5.7695C8.75001 6.2385 8.88901 6.6965 9.14901 7.087L10.2485 8.7365C10.2495 8.73797 10.25 8.73972 10.25 8.7415L10.2495 8.7445L10.2475 8.7475L10.2445 8.7495L10.241 8.75H1.75901L1.75551 8.7495L1.75251 8.7475L1.75051 8.7445L1.75001 8.741L1.75151 8.736L2.85151 7.087C3.11148 6.6968 3.25014 6.23837 3.25001 5.7695V3.5ZM7.00001 9.5H5.00001C5.00001 9.76522 5.10536 10.0196 5.2929 10.2071C5.48044 10.3946 5.73479 10.5 6.00001 10.5C6.26522 10.5 6.51958 10.3946 6.70711 10.2071C6.89465 10.0196 7.00001 9.76522 7.00001 9.5Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const UserIcon2 = ({ width, fill }) => {
  const height = (width / 15) * 15;
  return (
    <svg
      width={width || "15px"}
      height={height || "15px"}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M7.5 0C3.36454 0 0 3.36454 0 7.5C0 11.6355 3.36454 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.36454 11.6355 0 7.5 0ZM7.57212 3.46154C8.08559 3.46154 8.58753 3.6138 9.01446 3.89907C9.4414 4.18434 9.77415 4.5898 9.97065 5.06419C10.1671 5.53857 10.2186 6.06057 10.1184 6.56418C10.0182 7.06778 9.77095 7.53037 9.40787 7.89345C9.04479 8.25653 8.5822 8.50379 8.0786 8.60396C7.575 8.70413 7.053 8.65272 6.57861 8.45623C6.10423 8.25973 5.69876 7.92697 5.41349 7.50004C5.12822 7.0731 4.97596 6.57116 4.97596 6.05769C4.97596 5.36915 5.24948 4.70881 5.73636 4.22193C6.22323 3.73506 6.88357 3.46154 7.57212 3.46154ZM7.5 13.8462C6.62468 13.8465 5.75881 13.6653 4.95707 13.3141C4.15533 12.9628 3.43517 12.449 2.84207 11.8053C3.16082 10.1546 6.0238 9.80769 7.5 9.80769C8.9762 9.80769 11.8392 10.1546 12.1579 11.8049C11.5649 12.4488 10.8448 12.9626 10.043 13.314C9.24127 13.6653 8.37535 13.8465 7.5 13.8462Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const HelpIcon = ({ width, fill }) => {
  const height = (width / 14) * 14;
  return (
    <svg
      width={width || "14px"}
      height={height}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M3.66856 7.64878C3.7505 8.08315 3.92053 8.49703 4.16704 8.86446L2.32336 10.7085L1.59271 11.4324C1.15506 10.9054 0.798345 10.3162 0.534306 9.68402C-0.0870824 8.18765 -0.169154 6.52178 0.302139 4.97155C0.566624 4.08616 1.008 3.26366 1.59954 2.55384L4.16704 5.1218C4.10834 5.20431 4.05585 5.29106 4.00998 5.38133C3.63828 6.07519 3.51767 6.8762 3.66856 7.64878ZM11.412 12.4022C10.3444 13.2839 9.03877 13.8281 7.66111 13.9655C6.28345 14.103 4.89604 13.8274 3.67539 13.174C3.26788 12.9562 2.88351 12.6976 2.52821 12.4022L5.10253 9.82745C5.65855 10.1918 6.30881 10.3858 6.97353 10.3858C7.63824 10.3858 8.2885 10.1918 8.84452 9.82745L10.7292 11.6646L11.412 12.4022ZM14 6.99313C13.9958 8.61069 13.4366 10.1778 12.4158 11.4324L9.84147 8.85763C10.1439 8.39906 10.3313 7.87426 10.3877 7.32779C10.4644 6.54937 10.2716 5.76823 9.84147 5.11497L12.4158 2.54019C13.443 3.79649 14.0029 5.37021 14 6.99313ZM11.412 1.59086L8.87183 4.15199C8.60049 3.97624 8.30643 3.83837 7.99842 3.74146C7.68287 3.64173 7.35945 3.58529 7.03436 3.57327C6.2764 3.54835 5.5406 3.79253 4.9902 4.25511C4.88911 4.33967 4.79669 4.43015 4.71228 4.52613L2.10763 1.92512C3.36392 0.896046 4.93764 0.336162 6.56056 0.338922C8.18348 0.341683 9.7572 0.902623 11.0128 1.93171L11.412 1.59086ZM8.27363 6.99313C8.27363 6.2932 7.67345 5.69293 6.97353 5.69293C6.2736 5.69293 5.67342 6.2932 5.67342 6.99313C5.67342 7.69305 6.2736 8.29333 6.97353 8.29333C7.67345 8.29333 8.27363 7.69305 8.27363 6.99313ZM5.10253 5.85947L6.56056 7.31782C6.59152 7.28709 6.62831 7.26339 6.66978 7.24859C6.75188 7.21759 6.83771 7.19933 6.92495 7.19448C6.97871 7.19151 7.03265 7.19933 7.08433 7.21759C7.13531 7.23542 7.18239 7.26244 7.22391 7.29634C7.33979 7.38225 7.41229 7.51229 7.41229 7.65328C7.41229 7.79427 7.33979 7.92431 7.22391 8.01022L5.10253 5.85947Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const LockIcon = ({ width, fill }) => {
  const height = (width / 14) * 16;
  return (
    <svg
      width={width || 14}
      height={height}
      viewBox="0 0 14 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="${(props) => props.theme.borderColor}" // 다은 수정
    >
      <path
        d="M11.375 5.6V4C11.375 2.93913 10.9141 1.92172 10.0936 1.17157C9.27312 0.421427 8.16032 0 7 0C5.83968 0 4.72688 0.421427 3.90641 1.17157C3.08594 1.92172 2.625 2.93913 2.625 4V5.6C1.92881 5.6 1.26113 5.85286 0.768845 6.30294C0.276562 6.75303 0 7.36348 0 8V13.6C0 14.2365 0.276562 14.847 0.768845 15.2971C1.26113 15.7471 1.92881 16 2.625 16H11.375C12.0712 16 12.7389 15.7471 13.2312 15.2971C13.7234 14.847 14 14.2365 14 13.6V8C14 7.36348 13.7234 6.75303 13.2312 6.30294C12.7389 5.85286 12.0712 5.6 11.375 5.6ZM4.375 4C4.375 3.36348 4.65156 2.75303 5.14384 2.30294C5.63613 1.85286 6.30381 1.6 7 1.6C7.69619 1.6 8.36387 1.85286 8.85616 2.30294C9.34844 2.75303 9.625 3.36348 9.625 4V5.6H4.375V4ZM12.25 13.6C12.25 13.8122 12.1578 14.0157 11.9937 14.1657C11.8296 14.3157 11.6071 14.4 11.375 14.4H2.625C2.39294 14.4 2.17038 14.3157 2.00628 14.1657C1.84219 14.0157 1.75 13.8122 1.75 13.6V8C1.75 7.78783 1.84219 7.58434 2.00628 7.43431C2.17038 7.28429 2.39294 7.2 2.625 7.2H11.375C11.6071 7.2 11.8296 7.28429 11.9937 7.43431C12.1578 7.58434 12.25 7.78783 12.25 8V13.6Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const NotHeartIcon = ({ width, fill }) => {
  const height = (width / 22) * 21;
  return (
    <svg
      width={width || 22}
      height={height}
      viewBox="0 0 22 21"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M1 1L4.89385 5.04378M4.89385 5.04378C6.92015 3.49862 9.80479 3.64734 11.6764 5.63085L11.8529 5.81795L12.0295 5.63085C14.2906 3.23454 18.0302 3.5162 19.9488 6.22731C21.6517 8.63358 21.2439 12.0381 19.0277 13.9171L16.1835 16.3285M4.89385 5.04378L16.1835 16.3285M19.8566 20L16.1835 16.3285M14.549 17.7142L11.8529 20L4.67821 13.9171C2.81095 12.334 2.22736 9.66785 3.10846 7.42831"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UserPlusIcon = ({ width, fill }) => {
  const height = (width / 22) * 16;
  return (
    <svg
      width={width || 22}
      height={height}
      viewBox="0 0 22 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M14 8C16.21 8 18 6.21 18 4C18 1.79 16.21 0 14 0C11.79 0 10 1.79 10 4C10 6.21 11.79 8 14 8ZM5 6V3H3V6H0V8H3V11H5V8H8V6H5ZM14 10C11.33 10 6 11.34 6 14V16H22V14C22 11.34 16.67 10 14 10Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};

export const ShareIcon = ({ width, fill }) => {
  const height = width ? (width * 23) / 19 : "22px";
  return (
    <svg
      width={width || "19px"}
      height={height}
      viewBox="0 0 19 23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.55609 11.7546V19.7546C1.55609 20.2851 1.7668 20.7938 2.14188 21.1689C2.51695 21.5439 3.02566 21.7546 3.55609 21.7546H15.5561C16.0865 21.7546 16.5952 21.5439 16.9703 21.1689C17.3454 20.7938 17.5561 20.2851 17.5561 19.7546V11.7546"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5561 5.75464L9.55609 1.75464L5.55609 5.75464"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.55609 1.75464V14.7546"
        stroke={fill || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MessageIcon = ({ width, fill }) => {
  const height = width ? (width * 18) / 22 : "18px";
  return (
    <svg
      width={width || "22px"}
      height={height}
      viewBox="0 0 22 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M3 1H19C20.1 1 21 1.9 21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3C1 1.9 1.9 1 3 1Z"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 3L11 10L1 3"
          stroke={fill || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="22" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SendIcon = ({ width, fill }) => {
  const height = width ? width : "22px";
  return (
    <svg
      width={width || "22px"}
      height={height}
      viewBox="0 0 634 634"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M600.667 33.3334L34 210.457L284 350M600.667 33.3334L417.333 600L284 350M600.667 33.3334L284 350"
        stroke={fill}
        stroke-width="66.6667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const InformationIcon = ({ width, fill }) => {
  const height = width;
  return (
    <svg
      width={width || "16px"}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 11.7546V7.75464H6.5V8.75464H7.5V11.7546H6V12.7546H10V11.7546H8.5ZM8 4.75464C7.85166 4.75464 7.70666 4.79863 7.58332 4.88104C7.45999 4.96345 7.36386 5.08058 7.30709 5.21763C7.25032 5.35467 7.23547 5.50547 7.26441 5.65096C7.29335 5.79644 7.36478 5.93008 7.46967 6.03497C7.57456 6.13986 7.7082 6.21129 7.85368 6.24023C7.99917 6.26917 8.14997 6.25431 8.28701 6.19755C8.42406 6.14078 8.54119 6.04465 8.6236 5.92132C8.70601 5.79798 8.75 5.65297 8.75 5.50464C8.75 5.30573 8.67098 5.11496 8.53033 4.97431C8.38968 4.83366 8.19891 4.75464 8 4.75464Z"
        fill={fill || "black"}
      />
      <path
        d="M8 15.7546C6.61553 15.7546 5.26216 15.3441 4.11101 14.5749C2.95987 13.8058 2.06266 12.7125 1.53285 11.4334C1.00303 10.1543 0.86441 8.74688 1.13451 7.38901C1.4046 6.03114 2.07129 4.78386 3.05026 3.80489C4.02922 2.82593 5.2765 2.15924 6.63437 1.88914C7.99224 1.61905 9.3997 1.75767 10.6788 2.28749C11.9579 2.8173 13.0511 3.71451 13.8203 4.86565C14.5895 6.01679 15 7.37017 15 8.75464C15 10.6112 14.2625 12.3916 12.9497 13.7044C11.637 15.0171 9.85652 15.7546 8 15.7546ZM8 2.75464C6.81332 2.75464 5.65328 3.10654 4.66658 3.76582C3.67989 4.42511 2.91085 5.36218 2.45673 6.45854C2.0026 7.5549 1.88378 8.7613 2.11529 9.92518C2.3468 11.0891 2.91825 12.1582 3.75736 12.9973C4.59648 13.8364 5.66558 14.4078 6.82946 14.6394C7.99335 14.8709 9.19975 14.752 10.2961 14.2979C11.3925 13.8438 12.3295 13.0748 12.9888 12.0881C13.6481 11.1014 14 9.94133 14 8.75464C14 7.16334 13.3679 5.63722 12.2426 4.512C11.1174 3.38678 9.5913 2.75464 8 2.75464Z"
        fill={fill || "black"}
      />
    </svg>
  );
};

export const FillPlusIcon = ({ width, fill }) => {
  const height = width ? width : "18px";
  return (
    <svg
      width={width || "18px"}
      height={height}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9C0 4.02944 4.02944 0 9 0C13.9705 0 18 4.02944 18 9C18 13.9705 13.9705 18 9 18C4.02944 18 0 13.9705 0 9ZM9.40909 3.68182C9.86097 3.68182 10.2273 4.04813 10.2273 4.5V7.77273H13.5C13.9519 7.77273 14.3182 8.13903 14.3182 8.59091V9.40909C14.3182 9.86097 13.9519 10.2273 13.5 10.2273H10.2273V13.5C10.2273 13.9519 9.86097 14.3182 9.40909 14.3182H8.59091C8.13903 14.3182 7.77273 13.9519 7.77273 13.5V10.2273H4.5C4.04813 10.2273 3.68182 9.86097 3.68182 9.40909V8.59091C3.68182 8.13903 4.04813 7.77273 4.5 7.77273H7.77273V4.5C7.77273 4.04813 8.13903 3.68182 8.59091 3.68182H9.40909Z"
        fill={fill || "black"}
      />
    </svg>
  );
};

// DK CUSTOM Icon
export const ThemeLightIcon = ({ width, fill }) => {
  const height = width ? width : "20px";
  return (
    <svg
      width="20"
      height={height}
      viewBox="0 0 20 20"
      fill={fill || "#bababa"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M18 10H19M1 10H2M10 18V19M10 1V2M15.657 15.657L16.364 16.364M3.636 3.636L4.343 4.343M4.343 15.657L3.636 16.364M16.364 3.636L15.657 4.343"
        stroke="#BABABA"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const ThemeDarkIcon = ({ width, fill }) => {
  const height = width ? width : "18px";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 15.904C5.77733 15.904 3.88833 15.1263 2.333 13.571C0.777666 12.0157 0 10.1267 0 7.904C0 5.878 0.66 4.12133 1.98 2.634C3.3 1.14667 4.93467 0.268667 6.884 0C6.938 0 6.991 0.00200004 7.043 0.00600004C7.095 0.01 7.146 0.0156664 7.196 0.0229998C6.85867 0.493666 6.59167 1.017 6.395 1.593C6.19833 2.169 6.1 2.77267 6.1 3.404C6.1 5.182 6.722 6.693 7.966 7.937C9.21 9.181 10.7213 9.80333 12.5 9.804C13.134 9.804 13.7383 9.70567 14.313 9.509C14.8877 9.31233 15.4037 9.04533 15.861 8.708C15.869 8.758 15.8747 8.809 15.878 8.861C15.8813 8.913 15.8833 8.966 15.884 9.02C15.628 10.9687 14.7563 12.603 13.269 13.923C11.7817 15.243 10.026 15.9033 8 15.904Z"
        fill="#BABABA"
      />
    </svg>
  );
};

//* Color Icon  */

export const ColorInstaIcon = ({ width }) => {
  const height = (width / 40) * 40; // Maintain the 1:1 aspect ratio

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "40px"}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
    >
      <g clipPath="url(#clip0_580_5331)">
        <path
          d="M30.625 0H9.375C4.19733 0 0 4.19733 0 9.375V30.625C0 35.8027 4.19733 40 9.375 40H30.625C35.8027 40 40 35.8027 40 30.625V9.375C40 4.19733 35.8027 0 30.625 0Z"
          fill="url(#paint0_radial_580_5331)"
        />
        <path
          d="M30.625 0H9.375C4.19733 0 0 4.19733 0 9.375V30.625C0 35.8027 4.19733 40 9.375 40H30.625C35.8027 40 40 35.8027 40 30.625V9.375C40 4.19733 35.8027 0 30.625 0Z"
          fill="url(#paint1_radial_580_5331)"
        />
        <path
          d="M20.0014 4.375C15.758 4.375 15.2253 4.39359 13.5588 4.46938C11.8953 4.54563 10.7598 4.80891 9.76641 5.19531C8.73859 5.59438 7.86688 6.12828 6.99844 6.99703C6.12922 7.86562 5.59531 8.73734 5.195 9.76469C4.8075 10.7584 4.54391 11.8944 4.46906 13.557C4.39453 15.2238 4.375 15.7566 4.375 20.0002C4.375 24.2438 4.39375 24.7747 4.46938 26.4412C4.54594 28.1047 4.80922 29.2402 5.19531 30.2336C5.59469 31.2614 6.12859 32.1331 6.99734 33.0016C7.86563 33.8708 8.73734 34.4059 9.76438 34.805C10.7586 35.1914 11.8942 35.4547 13.5573 35.5309C15.2241 35.6067 15.7563 35.6253 19.9995 35.6253C24.2434 35.6253 24.7744 35.6067 26.4409 35.5309C28.1044 35.4547 29.2411 35.1914 30.2353 34.805C31.2627 34.4059 32.1331 33.8708 33.0012 33.0016C33.8705 32.1331 34.4042 31.2614 34.8047 30.2341C35.1887 29.2402 35.4525 28.1044 35.5306 26.4416C35.6055 24.775 35.625 24.2438 35.625 20.0002C35.625 15.7566 35.6055 15.2241 35.5306 13.5573C35.4525 11.8939 35.1887 10.7586 34.8047 9.76516C34.4042 8.73734 33.8705 7.86562 33.0012 6.99703C32.1322 6.12797 31.263 5.59406 30.2344 5.19547C29.2383 4.80891 28.1022 4.54547 26.4387 4.46938C24.772 4.39359 24.2414 4.375 19.9966 4.375H20.0014ZM18.5997 7.19078C19.0158 7.19016 19.48 7.19078 20.0014 7.19078C24.1734 7.19078 24.6678 7.20578 26.3153 7.28063C27.8387 7.35031 28.6656 7.60484 29.2164 7.81875C29.9456 8.10188 30.4655 8.44047 31.012 8.9875C31.5589 9.53438 31.8973 10.0552 32.1813 10.7844C32.3952 11.3344 32.65 12.1613 32.7194 13.6847C32.7942 15.3319 32.8105 15.8266 32.8105 19.9966C32.8105 24.1666 32.7942 24.6614 32.7194 26.3084C32.6497 27.8319 32.3952 28.6587 32.1813 29.2089C31.8981 29.9381 31.5589 30.4573 31.012 31.0039C30.4652 31.5508 29.9459 31.8892 29.2164 32.1725C28.6663 32.3873 27.8387 32.6413 26.3153 32.7109C24.6681 32.7858 24.1734 32.802 20.0014 32.802C15.8292 32.802 15.3347 32.7858 13.6877 32.7109C12.1642 32.6406 11.3373 32.3861 10.7861 32.1722C10.057 31.8889 9.53609 31.5505 8.98922 31.0036C8.44234 30.4567 8.10391 29.9372 7.82 29.2077C7.60609 28.6575 7.35125 27.8306 7.28188 26.3072C7.20703 24.66 7.19203 24.1653 7.19203 19.9927C7.19203 15.82 7.20703 15.328 7.28188 13.6808C7.35156 12.1573 7.60609 11.3305 7.82 10.7797C8.10328 10.0505 8.44234 9.52969 8.98938 8.98281C9.53641 8.43594 10.057 8.09734 10.7862 7.81359C11.337 7.59875 12.1642 7.34484 13.6877 7.27484C15.1291 7.20969 15.6877 7.19016 18.5997 7.18687V7.19078ZM28.342 9.78516C27.3069 9.78516 26.467 10.6242 26.467 11.6595C26.467 12.6947 27.3069 13.5345 28.342 13.5345C29.3772 13.5345 30.217 12.6947 30.217 11.6595C30.217 10.6244 29.3772 9.78453 28.342 9.78453V9.78516ZM20.0014 11.9759C15.5702 11.9759 11.9773 15.5688 11.9773 20C11.9773 24.4313 15.5702 28.0242 20.0014 28.0242C24.4327 28.0242 28.0256 24.4313 28.0256 20C28.0256 15.5688 24.4327 11.9759 20.0014 11.9759ZM20.0014 14.7961C23.0734 14.7961 25.2056 16.9275 25.2056 20C25.2056 23.0725 23.0734 25.2045 20.0014 25.2045C16.9294 25.2045 14.7973 23.0725 14.7973 20C14.7973 16.9275 16.9294 14.7961 20.0014 14.7961Z"
          fill="white"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_580_5331"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.38172 33.7654) scale(52.3769)"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.33" stopColor="#FF543E" />
          <stop offset="0.63" stopColor="#C837AB" />
          <stop offset="0.98" stopColor="#5283EE" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_580_5331"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.38172 33.7654) scale(52.3769)"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.33" stopColor="#FF543E" />
          <stop offset="0.63" stopColor="#C837AB" />
          <stop offset="0.98" stopColor="#5283EE" />
        </radialGradient>
        <clipPath id="clip0_580_5331">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ColorMetaIcon = ({ width }) => {
  const height = (width / 86) * 17.411;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 86} // 기본값 86px
      height={height} // 비율에 맞춰 height 계산
      viewBox="0 0 86 17.411"
      fill="none"
    >
      <g clipPath="url(#clip0_608_4913)">
        <path
          d="M2.81768 11.4822C2.81768 12.4831 3.03631 13.2515 3.32207 13.7164C3.69673 14.3254 4.25555 14.5833 4.82525 14.5833C5.56006 14.5833 6.23228 14.4001 7.52772 12.5998C8.56553 11.1567 9.7884 9.13123 10.6112 7.8614L12.0046 5.71009C12.9726 4.21602 14.0929 2.55514 15.3775 1.42935C16.4262 0.510481 17.5574 0 18.6959 0C20.6073 0 22.428 1.11303 23.8215 3.20053C25.3464 5.48676 26.0867 8.36642 26.0867 11.3381C26.0867 13.1048 25.7401 14.4029 25.1505 15.4284C24.5808 16.4202 23.4704 17.411 21.6025 17.411V14.5833C23.2019 14.5833 23.601 13.1066 23.601 11.4165C23.601 9.00816 23.0422 6.33543 21.8112 4.42569C20.9376 3.07109 19.8054 2.24338 18.5599 2.24338C17.2127 2.24338 16.1286 3.26434 14.9103 5.08475C14.2626 6.05193 13.5976 7.2306 12.851 8.56058L12.0291 10.0237C10.3781 12.9653 9.95985 13.6353 9.13433 14.741C7.68738 16.6772 6.45181 17.411 4.82525 17.411C2.8957 17.411 1.67555 16.5715 0.919873 15.3062C0.302996 14.2752 0 12.9225 0 11.381L2.81768 11.4822Z"
          fill="url(#paint0_linear_608_4913)"
        />
        <path
          d="M2.2207 3.40017C3.51252 1.39926 5.37676 0 7.51497 0C8.75326 0 9.98429 0.368275 11.2698 1.42297C12.6759 2.57611 14.1745 4.47491 16.0442 7.60434L16.7146 8.7274C18.333 11.4366 19.2538 12.8304 19.7926 13.4876C20.4857 14.3318 20.9711 14.5833 21.6015 14.5833C23.2009 14.5833 23.6 13.1066 23.6 11.4165L26.0857 11.3381C26.0857 13.1048 25.7392 14.4029 25.1495 15.4284C24.5798 16.4202 23.4694 17.411 21.6015 17.411C20.4404 17.411 19.4116 17.1576 18.274 16.0792C17.3995 15.2515 16.3771 13.7812 15.5906 12.4594L13.251 8.53232C12.0771 6.5615 11.0003 5.09205 10.3771 4.4266C9.7067 3.71101 8.84488 2.84684 7.46961 2.84684C6.3565 2.84684 5.41123 3.63171 4.62018 4.83225L2.2207 3.40017Z"
          fill="url(#paint1_linear_608_4913)"
        />
        <path
          d="M7.47057 2.84684C6.35747 2.84684 5.41219 3.63171 4.62114 4.83225C3.50259 6.52869 2.81768 9.05557 2.81768 11.4822C2.81768 12.4831 3.03631 13.2515 3.32207 13.7164L0.919873 15.3062C0.302996 14.2752 0 12.9225 0 11.381C0 8.5779 0.765654 5.65631 2.22167 3.40017C3.51348 1.39926 5.37772 0 7.51593 0L7.47057 2.84684Z"
          fill="url(#paint2_linear_608_4913)"
        />
        <path
          d="M31.5645 0.550537H34.8239L40.3658 10.6252L45.9087 0.550537H49.0974V17.1047H46.4385V4.41743L41.5778 13.2032H39.0831L34.2234 4.41743V17.1047H31.5645V0.550537ZM57.4289 6.7228C55.522 6.7228 54.3735 8.16491 54.0986 9.95068H60.5704C60.437 8.11112 59.3811 6.7228 57.4289 6.7228ZM51.4624 10.968C51.4624 7.21049 53.8791 4.47577 57.4751 4.47577C61.0122 4.47577 63.1241 7.17585 63.1241 11.1685V11.9024H54.0986C54.4189 13.8449 55.7016 15.1539 57.77 15.1539C59.4201 15.1539 60.4516 14.648 61.4295 13.7228L62.842 15.4611C61.5111 16.6908 59.8184 17.4001 57.6756 17.4001C53.7829 17.4001 51.4624 14.5477 51.4624 10.968ZM66.3482 6.95981H63.9006V4.77203H66.3482V1.154H68.9137V4.77203H72.6322V6.95981H68.9137V12.5049C68.9137 14.3982 69.516 15.071 70.9965 15.071C71.6724 15.071 72.0597 15.0126 72.6322 14.9169V17.081C71.9191 17.2834 71.2388 17.3764 70.5021 17.3764C67.7325 17.3764 66.3482 15.8558 66.3482 12.8121V6.95981ZM83.4348 9.08742C82.9195 7.78022 81.7701 6.8176 80.081 6.8176C77.8856 6.8176 76.4804 8.38277 76.4804 10.9324C76.4804 13.4183 77.774 15.0591 79.9757 15.0591C81.7066 15.0591 82.9422 14.0473 83.4348 12.7884V9.08742ZM86.0003 17.1047H83.482V15.3782C82.778 16.3946 81.4971 17.4001 79.4224 17.4001C76.0858 17.4001 73.856 14.5933 73.856 10.9324C73.856 7.23692 76.1393 4.47577 79.5639 4.47577C81.2567 4.47577 82.5848 5.1558 83.482 6.35635V4.77203H86.0003V17.1047Z"
          fill="url(#paint3_linear_608_4913)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_608_4913"
          x1="6.92927"
          y1="36.0077"
          x2="6.92927"
          y2="1.4964"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.173264" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_608_4913"
          x1="8.55984"
          y1="36.0077"
          x2="8.55984"
          y2="1.4964"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.173264" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_608_4913"
          x1="1.99642"
          y1="31.6547"
          x2="1.99642"
          y2="1.3155"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.173264" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_608_4913"
          x1="1"
          y1="20"
          x2="90"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.423264" stopColor="#FF543E" />
          <stop offset="0.878263" stopColor="#C837AB" />
        </linearGradient>
        <clipPath id="clip0_608_4913">
          <rect width="86" height="17.411" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

// 다은 추가 svg
// 아이콘 정렬
export const IconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.wrapperSize || "40px"};
  height: ${(props) => props.wrapperSize || "40px"};
  padding: ${(props) => props.wrapperPadding || "5px"};
  background: ${(props) => props.background || "#f5f5f5"};
  border-radius: ${(props) => props.borderRadius || "50%"};
  z-index: ${(props) => props.zIndex || ""};
`;
// 팔로워 아이콘

export const FollowerIcon = ({ width = 436 }) => {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // 모바일, 태블릿 화면에 맞춰 크기 조정 (최소 크기 제한)
  const adjustedWidth = isMobile
    ? Math.max(width * 0.8, 300)
    : isTablet
    ? Math.max(width * 0.9, 350)
    : width;
  const height = (adjustedWidth / 430) * 280;
  const strokeWidth = adjustedWidth / 100;

  return (
    <svg
      width="100%" // 부모 컨테이너에 맞게 꽉 채우기
      height="100%"
      viewBox="0 0 436 280"
      preserveAspectRatio="xMidYMid meet" // 비율 유지하면서 중앙 정렬
    >
      <g transform="translate(60, 20)">
        {/* 아래 축 */}
        <g
          transform="translate(0, 225)"
          fill="none"
          textAnchor="middle"
          fontSize="10"
        >
          {["0.5", "346.5"].map((x, idx) => (
            <g
              key={idx}
              className="tick"
              opacity="1"
              transform={`translate(${x},0)`}
            >
              <line stroke="gray" y2="6" />
              <text
                y="20"
                dy="0.71em"
                fontFamily="Arial, sans-serif"
                fontSize="13px"
              />
            </g>
          ))}
        </g>

        {/* 왼쪽 축 */}
        <g fill="none" textAnchor="end">
          {Array.from({ length: 6 }).map((_, i) => (
            <g
              key={i}
              className="tick"
              opacity="1"
              transform={`translate(0, ${225 - i * 45}.5)`}
            >
              <line stroke="gray" x2="346" />
              <text
                x="-15"
                dy="0.32em"
                fontFamily="Arial, sans-serif"
                fontSize="13px"
              >
                {i * 20}
              </text>
            </g>
          ))}
        </g>

        {/* 축의 경계선 */}
        <path
          fill="none"
          stroke="gray"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          d="M0,222.75L346,222.75"
        />
      </g>
    </svg>
  );
};

// 공유 아이템 수정
export const ShareIconNew = ({
  width,
  stroke = "#999",
  strokeWidth = "1",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  link, // 링크를 props로 받음
}) => {
  const height = width ? (width * 23) / 19 : "22px";

  return (
    <a
      href={link} // 링크에 대한 href 속성 추가
      target="_blank" // 새 창으로 열기
      rel="noopener noreferrer" // 보안 및 성능 향상을 위한 속성
    >
      <svg
        width={width || "19px"}
        height={height}
        viewBox="0 0 26 22"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 9.00001L21 3.00001M21 3.00001H15M21 3.00001L12 12M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14"
          stroke={stroke}
          fill="none"
        />
      </svg>
    </a>
  );
};

// 오른쪽 화살표
export const RightArrowIcon = ({ width, fill }) => {
  const height = (width / 21) * 12;
  return (
    <svg
      width={width || "21px"}
      height={height}
      viewBox="0 0 23 30"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M1 1L10.5 10.5L1 20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RightNewArrowIcon = ({ width = "21px", fill = "#000000" }) => {
  const height = (parseInt(width) / 21) * 12; // width에 따라 height 계산
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 30"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M1 1L10.5 10.5L1 20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 권한
export const CloseLockIcon = ({ width }) => {
  const height = width ? (width * 23) / 19 : "22px";
  return (
    <svg
      width={width || "21px"}
      height={height}
      viewBox="0 0 21 12"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3L21 21M17 10V8C17 5.23858 14.7614 3 12 3C11.0283 3 10.1213 3.27719 9.35386 3.75681M7.08383 7.08338C7.02878 7.38053 7 7.6869 7 8V10.0288M19.5614 19.5618C19.273 20.0348 18.8583 20.4201 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288M19.9998 14.4023C19.9978 12.9831 19.9731 12.227 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.773 10.0269 17.0169 10.0022 15.5977 10.0002M10 10H8.8C8.05259 10 7.47142 10 7 10.0288" />
    </svg>
  );
};
// 프로필 비활성화
export const DeleteProfileIcon = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z" />
    </svg>
  );
};
// 페비더스 공유
export const EalthIcon = (props) => {
  return (
    <svg
      viewBox="2 0 17 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M8 4V6C8 7.10457 8.89543 8 10 8H11C12.1046 8 13 8.89543 13 10V10C13 11.1046 13.8954 12 15 12V12C16.1046 12 17 11.1046 17 10V10C17 8.89543 17.8954 8 19 8H20M20 16H17C15.8954 16 15 16.8954 15 18V20M11 20V18C11 16.8954 10.1046 16 9 16V16C7.89543 16 7 15.1046 7 14V14C7 12.8954 6.10457 12 5 12H3"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
// 정보 다운로드
export const InfoDownIcon = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28 6.208q0 3.264-1.28 6.208t-3.392 5.12-5.12 3.424-6.208 1.248-6.208-1.248-5.12-3.424-3.392-5.12-1.28-6.208zM4 16q0 3.264 1.6 6.048t4.384 4.352 6.016 1.6 6.016-1.6 4.384-4.352 1.6-6.048-1.6-6.016-4.384-4.352-6.016-1.632-6.016 1.632-4.384 4.352-1.6 6.016zM10.048 18.4q-0.128-0.576 0.096-1.152t0.736-0.896 1.12-0.352h2.016v-5.984q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408v5.984h1.984q0.608 0 1.12 0.352t0.736 0.896q0.224 0.576 0.096 1.152t-0.544 1.024l-4 4q-0.576 0.576-1.408 0.576t-1.408-0.576l-4-4q-0.448-0.416-0.544-1.024z"
        fill="#2e3436"
      />
    </svg>
  );
};
// 개인정보
export const PersonalInfoIcon = (props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h8a.996.996 0 0 0 .707-.293l7-7a.997.997 0 0 0 .196-.293c.014-.03.022-.061.033-.093a.991.991 0 0 0 .051-.259c.002-.021.013-.041.013-.062V5c0-1.103-.897-2-2-2zM5 5h14v7h-6a1 1 0 0 0-1 1v6H5V5zm9 12.586V14h3.586L14 17.586z" />
    </svg>
  );
};
// 관리감독
export const SupervisionIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      {...props}
    >
      <path d="M26,16H17.4683l-5-6H5a3.0033,3.0033,0,0,0-3,3v6a2.0023,2.0023,0,0,0,2,2v7a2.0023,2.0023,0,0,0,2,2h4a2.0023,2.0023,0,0,0,2-2V21H10v7H6V19H4V13a1.0009,1.0009,0,0,1,1-1h6.5317l5,6H26a1.0009,1.0009,0,0,1,1,1v3H25v6H22V22H20v6a2.0023,2.0023,0,0,0,2,2h3a2.0023,2.0023,0,0,0,2-2V24a2.0023,2.0023,0,0,0,2-2V19A3.0033,3.0033,0,0,0,26,16Z" />
      <path d="M23.5,15A3.5,3.5,0,1,1,27,11.5,3.5042,3.5042,0,0,1,23.5,15Zm0-5A1.5,1.5,0,1,0,25,11.5,1.5017,1.5017,0,0,0,23.5,10Z" />
      <path d="M8,9a4,4,0,1,1,4-4A4.0042,4.0042,0,0,1,8,9ZM8,3a2,2,0,1,0,2,2A2.0023,2.0023,0,0,0,8,3Z" />
    </svg>
  );
};
// 보안
export const SecurityIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 1024 1024"
      fill="#000000"
      {...props}
    >
      <path d="M908.008473 139.713707L529.299213 3.059374a51.005609 51.005609 0 0 0-17.397182-3.059374c-5.950311 0-11.855934 1.03125-17.534682 3.090312L117.015902 139.744645c-20.394681 7.397498-34.704989 26.774679-34.70499 48.472173v323.781463c0 72.287165 23.299368 144.584643 67.763417 214.87806 34.082802 53.875921 81.520288 106.71028 140.256832 157.045577 98.209345 84.156849 195.655565 132.70121 199.749627 134.725896a51.957797 51.957797 0 0 0 22.96593 5.352186c7.717185 0 15.485933-1.732499 22.608431-5.197498 4.094061-1.993749 101.495594-49.78186 199.797752-133.605272 58.794982-50.132485 105.520905-102.966844 139.627769-157.031827 44.446861-70.444666 66.601542-143.171831 66.601543-216.167122V188.216818c0.003437-21.731868-13.230933-41.133112-33.67374-48.503111zM164.810887 511.757656V226.768368c0-10.848747 6.648123-20.539056 16.847183-24.237805l320.759902-116.692777c2.859999-1.034687 6.142811-1.797812 9.580309-1.797812v427.961745h349.631456c0.020625 0 0.044687 0.464062 0.044688 0.759687-0.06875 93.255909-47.038736 185.679943-139.58652 275.670228-72.273415 70.279666-154.384953 120.436213-196.621503 144.096519-3.915311 2.196562-10.027184 3.231249-13.464683 3.231249V511.867656l-347.190832-0.11z" />
    </svg>
  );
};

// 계정상태
export const AccountStatusIcon = ({
  width = "24px",
  height = "24px",
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
        fill={fill}
      />
    </svg>
  );
};

// 관리감독 다시
export const FamilyIcon = ({
  fill = "#000000",
  width = "800px",
  height = "800px",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9.25 3.75C9.25 4.44036 8.69036 5 8 5C7.30964 5 6.75 4.44036 6.75 3.75C6.75 3.05964 7.30964 2.5 8 2.5C8.69036 2.5 9.25 3.05964 9.25 3.75ZM12 8H9.41901L11.2047 13H9.081L8 9.97321L6.91901 13H4.79528L6.581 8H4V6H12V8Z"
        fill={fill}
      />
    </svg>
  );
};
// 경고 아이콘 스타일
const AttentionNoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: absolute;
  margin-top: -88px;
  margin-left: 12px;
  background-color: black;
  border-radius: 10px;
  padding: 2px 6px;
  ::after {
    display: block;
    width: 5px;
    height: 5px;
    background-color: black;
    position: absolute;
    top: 17px;
    left: 10px;
    transform: rotate(45deg);
    content: "";
  }
`;

// 경고 메시지 창 스타일
export const AttentionNote = ({ children }) => {
  return (
    <AttentionNoteContainer>
      {/* 경고 아이콘 추가 */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="20" height="20" rx="10" fill="none" />
        <path
          d="M12 8v4"
          stroke="#FFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16h.01"
          stroke="#FFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ color: "#FFF", fontSize: "10px" }}>{children}</span>
    </AttentionNoteContainer>
  );
};
export const OnlineStatusIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <svg
      aria-label="온라인 상태"
      role="img"
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>온라인 상태</title>
      <circle
        cx="12"
        cy="9"
        fill="none"
        r="4"
        stroke={fill || "currentColor"}
        strokeWidth="2"
      />
      <path
        d="M14.3492 18C14.617 17.2565 15.0288 16.5783 15.5501 16H8.68373C6.7865 16 5.11364 16.9606 4.125 18.422C4.54015 18.986 5.01309 19.5048 5.53508 19.9698C6.10288 18.8036 7.29946 18 8.68373 18H14.3492Z"
        fill={fill || "currentColor"}
      />
      <path
        d="M20 24C17.8119 24 16 22.1958 16 20C16 17.8119 17.8119 16 20 16C22.1881 16 24 17.8119 24 20C24 22.1804 22.1727 24 20 24Z"
        fill={fill || "currentColor"}
      />
      <path
        d="M14.5505 22.4944C14.3607 22.0852 13.9218 21.8259 13.4756 21.8919C12.9941 21.9631 12.5013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.5019 21.963 12.9952 21.8916 13.4773C21.8256 13.9234 22.0841 14.3621 22.493 14.5521C23.0427 14.8076 23.7414 14.5629 23.8399 13.9648C23.9452 13.3255 24 12.6692 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C12.6683 24 13.3239 23.9454 13.9625 23.8403C14.5603 23.742 14.8053 23.044 14.5505 22.4944Z"
        fill={fill || "currentColor"}
      />
    </svg>
  );
};
// 왼쪽 화살표 아이콘
export const LeftArrowIcon = ({ width = "24px", height = "24px" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 512.006 512.006"
    fill="currentColor"
  >
    <title>left-arrow</title>
    <desc>Created with Sketch.</desc>
    <g>
      <g>
        <path
          d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0    
            L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251    
            c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"
        />
      </g>
    </g>
  </svg>
);

// export const LeftArrowIcon = ({ width = "24px", height = "24px" }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={width}
//     height={height}
//     viewBox="0 -6.5 38 38"
//   >
//     <title>left-arrow</title>
//     <desc>Created with Sketch.</desc>
//     <g
//       id="icons"
//       stroke="none"
//       strokeWidth="1"
//       fill="currentColor"
//       fillRule="evenodd"
//     >
//       <g
//         id="ui-gambling-website-lined-icnos-casinoshunter"
//         transform="translate(-1641.000000, -158.000000)"
//         fillRule="nonzero"
//       >
//         <g id="1" transform="translate(1350.000000, 120.000000)">
//           <path
//             d="M317.812138,38.5802109 L328.325224,49.0042713 L328.41312,49.0858421 C328.764883,49.4346574 328.96954,49.8946897 329,50.4382227 L328.998248,50.6209428 C328.97273,51.0514917 328.80819,51.4628128 328.48394,51.8313977 L328.36126,51.9580208 L317.812138,62.4197891 C317.031988,63.1934036 315.770571,63.1934036 314.990421,62.4197891 C314.205605,61.6415481 314.205605,60.3762573 314.990358,59.5980789 L322.274264,52.3739093 L292.99947,52.3746291 C291.897068,52.3746291 291,51.4850764 291,50.3835318 C291,49.2819872 291.897068,48.3924345 292.999445,48.3924345 L322.039203,48.3917152 L314.990421,41.4019837 C314.205605,40.6237427 314.205605,39.3584519 314.990421,38.5802109 C315.770571,37.8065964 317.031988,37.8065964 317.812138,38.5802109 Z"
//             id="left-arrow"
//             transform="translate(310.000000, 50.500000) scale(-1, 1) translate(-310.000000, -50.500000)"
//           />
//         </g>
//       </g>
//     </g>
//   </svg>
// );

// 도경 => 모바일 메뉴 아이콘 생성

export const MobileMenu = ({ width }) => {
  const height = width * 1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24} // 기본값 86px
      height={height} // 비율에 맞춰 height 계산
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 6H20V8H4V6ZM8 11H20V13H8V11ZM13 16H20V18H13V16Z"
        fill="black"
      />
    </svg>
  );
};

export const RecoderIcon = ({ width }) => {
  const height = width * 1;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 3C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V6C3 6.26522 3.10536 6.51957 3.29289 6.70711C3.48043 6.89464 3.73478 7 4 7H6C6.26522 7 6.51957 6.89464 6.70711 6.70711C6.89464 6.51957 7 6.26522 7 6V4C7 3.73478 6.89464 3.48043 6.70711 3.29289C6.51957 3.10536 6.26522 3 6 3H4ZM10 5C10 6.32608 9.47322 7.59785 8.53553 8.53553C7.59785 9.47322 6.32608 10 5 10C3.67392 10 2.40215 9.47322 1.46447 8.53553C0.526784 7.59785 0 6.32608 0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5ZM9 5C9 3.93913 8.57857 2.92172 7.82843 2.17157C7.07828 1.42143 6.06087 1 5 1C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5C1 6.06087 1.42143 7.07828 2.17157 7.82843C2.92172 8.57857 3.93913 9 5 9C6.06087 9 7.07828 8.57857 7.82843 7.82843C8.57857 7.07828 9 6.06087 9 5Z"
        fill="#BABABA"
      />
    </svg>
  );
};
