import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import Post2 from "../post/Post2";

const TimeLine2 = ({ searchTerm, contentType, onDataEmpty, postNum }) => {
  const [posts, setPosts] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    let unsubscribe = null;
    const fetchPosts = async () => {
      let postsQuery = query(
        collection(db, "contents"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      // 실시간 데이터 구독 설정
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const livePosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filteredPosts = livePosts;

        // 검색어 필터링
        if (searchTerm && searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          filteredPosts = livePosts.filter((item) => {
            const usernameMatch =
              item.username &&
              item.username.toLowerCase().includes(searchLower);
            const emailMatch =
              item.email && item.email.toLowerCase().includes(searchLower);
            const userInfoMatch =
              item.userInfo &&
              item.userInfo.toLowerCase().includes(searchLower);
            const postMatch =
              item.post && item.post.toLowerCase().includes(searchLower);
            return usernameMatch || emailMatch || userInfoMatch || postMatch;
          });
        }
        //  필터링
        if (contentType === "picture") {
          filteredPosts = filteredPosts.filter(
            (post) => post.photos && post.photos.length > 0
          );
        } else if (contentType === "video") {
          filteredPosts = filteredPosts.filter(
            (post) => post.videos && post.videos.length > 0
          );
        } else if (contentType === "both") {
          filteredPosts = filteredPosts.filter(
            (post) =>
              post.photos &&
              post.photos.length > 0 &&
              post.videos &&
              post.videos.length > 0
          );
        }
        setPosts(filteredPosts);
        // 데이터가 없을 때 처리
        if (onDataEmpty) onDataEmpty(filteredPosts.length === 0);
      });
    };
    fetchPosts();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [searchTerm, contentType]);

  const handleScroll = () => {
    const element = wrapperRef.current;
    if (element.scrollTop === 0) {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={isBouncing ? "bounce" : ""}
        onScroll={handleScroll}
      >
        {posts.map((post) => (
          <Post2 key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};
export default TimeLine2;
