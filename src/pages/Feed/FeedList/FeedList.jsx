import { useEffect, useState } from 'react';
import { customAxios } from '../../../modules/customAxios';
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

  // DTO: Data Transfer Object
  const Dto = {
    title: '',
    subtitle: '',
  };

  async function getFeedList() {
    try {
      const response = await customAxios.get('FeedListData.json', { Dto });

      if (response.status === 200) {
        setFeedData(response?.data.reverse());
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
