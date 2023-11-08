import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import Loading from '../../../Loading/Loading';
import Portal from '../../../../components/Modal/Portal';
import Modal from '../../../../components/Modal/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedListItem.scss';

/**
 * FeedListItem.js logics
 * @property {function} modalHandler          - 모달 팝업 관련 함수입니다.
 * @property {function} getFeedList           - 피드 목록 데이터를 받아오는 함수입니다.
 * @property {function} switchDateStringify   - 피드 업로드 일자를 문자열로 변환하는 함수입니다.
 */

const FeedListItem = () => {
  const defaultProfileImage = '/images/feed/default_profile_image.png';
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const profileImage = null;

  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  const getFeedList = () => {
    axios({
      method: 'get',
      url: '/data/FeedListData.json',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          setFeedData(response?.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const { id, text, isMine, userId, commentCount, nickname } = feedData;

  const switchDateStringify = postDate => {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    const timeDifference = currentDate - postDateObj;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `방금 전`;
    }
  };

  const refinedDate = switchDateStringify(feedData?.createdAt);

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', close);
    setLoading(true);
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      <article className="feed-list-item">
        <div>
          <div className="info">
            <div className="left-split">
              <img
                src={profileImage === null ? defaultProfileImage : profileImage}
                alt="`${nickname}` 님의 프로필 사진"
              />
              <strong>{nickname}</strong>
            </div>
            <div className="right-split">
              <span>{refinedDate}</span>
            </div>
          </div>
          <div className="content">
            <div className="swiper-area">
              <Swiper
                loop
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: '.swiper-prev-btn',
                  nextEl: '.swiper-next-btn',
                }}
                pagination={{ clickable: false }}
              >
                {feedData?.images?.map(({ src, text }, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <picture>
                        {/* <source
                        srcSet="/images/wide_image.jpg"
                        media="all and (min-width: 800px)"
                      /> */}
                        <img src={src} alt={text} />
                      </picture>
                    </SwiperSlide>
                  );
                })}

                <div className="swiper-controller">
                  <button type="button" className="swiper-prev-btn">
                    <IconPrevArrow />
                  </button>
                  <button type="button" className="swiper-next-btn">
                    <IconNextArrow />
                  </button>
                </div>
              </Swiper>
            </div>
            <p>{text}</p>
          </div>

          <div className="comment">
            <button type="button" onClick={modalHandler}>
              댓글 {commentCount}개 모두 보기
            </button>
            <Portal>
              {modalOpen && (
                <Modal
                  // data={<Charge points={points} onClose={modalHandler} />}
                  onClose={modalHandler}
                />
              )}
            </Portal>
          </div>

          <div>
            [3차] 댓글 달기 영역: 로그인한 프로필 이미지 + textarea 처리 필요
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedListItem;
