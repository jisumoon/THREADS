import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  logoColor: "#000",
  nomalIconColor: "#BABABA",
  bodyBg: "#F2F2F2",
  fontcolor: "#000",
  borderWrapper: "#F5F5F5",
  borderColor: "#fff",
  bordershadow: "0 0 15px rgba(201, 201, 201,0.5)",
  selecticoncolor: "#000000",
  borderstroke: "#E9E9E9",
  mouseHoverBg: "#ECECEC",
  mouseHoverFontcolor: "#000",
  headerBg: "#fff",
  btnBgColor: "#fff", // 중복 제거
  loginInputSelectColor: "#5987DC",
  searchBar: "#000",
  userIcon: "#595959",
  followerfont: "#737373",
  searchColor: "#000",
  themeIconBackground: "#F3F3F3",
  themeIconBorder: "#E4E4E4",
  searchButton: "#E9E9E9",
  buttonbackground: "#fff",
  buttonText: "#000",
  comentBouttomLine: "#cccccc66",
  navIconColor: undefined,
  activityBG: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
  activitySH:
    "5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.5) ",
  activityhover:
    "5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(255, 255, 255, 0.7)",
  ImgBG: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
  ImgSH: "linear-gradient(145deg, #333, #444)",
  readBG: "linear-gradient(145deg, #DCDCDC, #C0C0C0)",
  readTextColor: "#949494",
  btnbottom: "1px solid rgba(204, 204, 204, 0.4)",
  // 다은 새로 추가(설정부분)
  activeBorder: "#181818",
  selectedbtn: "#000",
  notSelectbtn: "#ccc",
};
export const darkTheme = {
  logoColor: "#fff",
  nomalIconColor: "#4D4D4D",
  bodyBg: "#000000",
  fontcolor: "#fff",
  borderWrapper: "#252525",
  borderColor: "#181818",
  bordershadow: "0 0 15px #000",
  selecticoncolor: "#262626", // 중복된 selecticoncolor 수정
  borderstroke: "#343535",
  mouseHoverBg: "#1F1F1F",
  mouseHoverFontcolor: "#fff",
  headerBg: "#1E1E1E",
  btnBgColor: "#000", // 중복 제거
  loginInputSelectColor: "#488EE3",
  searchBar: "#BABABA",
  userIcon: "#737373",
  followerfont: "#BABABA",
  searchColor: "#1D1D1D",
  themeIconBackground: "#363636",
  themeIconBorder: "#363636",
  navIconColor: undefined,
  buttonbackground: "#000",
  buttonText: "#fff",
  comentBouttomLine: "#2d2d2d",
  activityBG: "linear-gradient(145deg, #333, #444)",
  activitySH:
    "5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(0, 0, 0, 0.2)",
  activityhover:
    "5px 5px 15px rgba(0, 0, 0, 0.5), -5px -5px 15px rgba(0, 0, 0, 0.2)",
  ImgBG:
    "5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.5)",
  ImgSH: "5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(0, 0, 0, 0.2)",
  readBG: "linear-gradient(145deg, #555, #666)",
  readTextColor: "#bbb",
  btnbottom: "1px solid #fff",
  // 다은 새로 추가(설정부분)
  activeBorder: "#fff",
  modalfont: "#999999",
  selectedbtn: "#fff",
  notSelectbtn: "#737373",
};
const GlobalStyles = createGlobalStyle`
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
${reset};
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
  color: ${(props) => props.theme.bodyColor};
  line-height: 1;
  overflow-y: scroll;
  transition: background-color 0.4s ease, color 0.2s ease;
  /* background-color: #F2F2F2; */
}
ol, ul ,li {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
:root {
  //light
  --tag-color: #0396F6;
  --caution-color: #FF3040;
  --L-bg : #F2F2F2;
  --L-borderwrapper: #F5F5F5;
 --L-boreder: #fff;
  --L-font-color: : #000;
  --L-subfont:  #9A9A9A;
  --L-icon: #BABABA;
  --L-selecticon : #000;
  --L-strock : #E9E9E9
//dark
  --D-bg : #000;
  --D-borderwrapper : #252525;
  --D-border: #181818;
  --D-font-color: #F1F3F5;
  --D-subfont: #9A9A9A;
  --D-icon: #BABABA;
  --D-selecticon : #F3F5F7;
  --D-strock: #343535;
//font
  --font-24px : 24px;
  --font-15px : 15px;
  --font-13px : 13px;
  --font-bold: 700;
  --font-medium: 500;
}
`;
// export { lightTheme, darkTheme };
export default GlobalStyles;
