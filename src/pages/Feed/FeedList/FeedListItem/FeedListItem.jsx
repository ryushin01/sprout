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

import BIG_BANNER_SWIPER_DATA from '../../../../data/BigBannerSwiperData';

const FeedListItem = () => {
  const defaultProfileImage = '/images/feed/default_profile_image.png';
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', close);
    setLoading(true);
    getFeedList();
  }, []);

  const profileImage = null;

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
          setFeedData(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const { id, text, isMine, userId, createdAt, commentCount, nickname } =
    feedData;

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
              <span>{createdAt}</span>
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
