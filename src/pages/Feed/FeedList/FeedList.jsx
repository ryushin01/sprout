import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Loading/Loading';
import FeedListItem from './FeedListItem/FeedListItem';
import '../Feed.scss';

/**
 * FeedList.js logics
 * @property {function} getFeedList           - 피드 목록 데이터를 받아오는 함수입니다.
 */

const FeedList = ({ userInfo, defaultProfileImage }) => {
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState([]);

  const getFeedList = () => {
    axios({
      method: 'get',
      url: '/data/FeedListData.json',
      // url: 'http://localhost:8000/feed',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          setFeedData(response?.data.reverse());
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { profileImage } = userInfo;

  return (
    <>
      {loading && <Loading />}
      <ul className="feed-list">
        {feedData?.map(
          (
            {
              id,
              text,
              is_mine,
              user_id,
              created_at,
              images,
              comment_count,
              nickname,
              profile_image,
            },
            index,
          ) => {
            return (
              <li key={index}>
                <FeedListItem
                  id={id}
                  text={text}
                  is_mine={is_mine}
                  user_id={user_id}
                  created_at={created_at}
                  images={images}
                  comment_count={comment_count}
                  nickname={nickname}
                  profile_image={profile_image}
                  defaultProfileImage={defaultProfileImage}
                  profileImage={profileImage}
                />
              </li>
            );
          },
        )}
      </ul>
    </>
  );
};

export default FeedList;
