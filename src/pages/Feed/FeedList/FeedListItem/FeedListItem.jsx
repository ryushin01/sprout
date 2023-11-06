import { useEffect, useState } from 'react';
import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import Portal from '../../../../components/Modal/Portal';
import Modal from '../../../../components/Modal/Modal';
import BIG_BANNER_SWIPER_DATA from '../../../../data/BigBannerSwiperData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedListItem.scss';

const FeedListItem = () => {
  const defaultProfileImage = '/images/feed/default_profile_image.png';
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
  }, []);

  const profileImage = null;

  return (
    <article className="feed-list-item">
      <div>
        <div className="info">
          <div className="left-split">
            <img
              src={profileImage === null ? defaultProfileImage : profileImage}
              alt=""
            />
            <strong>닉네임</strong>
          </div>
          <div className="right-split">
            <span>몇 초 전</span>
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
              {BIG_BANNER_SWIPER_DATA.map(({ id, image, title }) => {
                return (
                  <SwiperSlide key={id}>
                    <picture>
                      {/* <source
                        srcSet="/images/wide_image.jpg"
                        media="all and (min-width: 800px)"
                      /> */}
                      <img src={image} alt={title} />
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
          <p>
            피드 내용이 텍스트로 들어갑니다. 최대 3줄까지 노출되며 모달
            팝업에서는 전체 내용이 드러납니다. 피드 내용이 텍스트로 들어갑니다.
            최대 3줄까지 노출되며 모달 팝업에서는 전체 내용이 드러납니다. 피드
            내용이 텍스트로 들어갑니다. 최대 3줄까지 노출되며 모달 팝업에서는
            전체 내용이 드러납니다. 피드 내용이 텍스트로 들어갑니다. 최대
            3줄까지 노출되며 모달 팝업에서는 전체 내용이 드러납니다. 피드 내용이
            텍스트로 들어갑니다. 최대 3줄까지 노출되며 모달 팝업에서는 전체
            내용이 드러납니다.
          </p>
        </div>

        <div className="comment">
          <button type="button" onClick={modalHandler}>
            댓글 n개 모두 보기
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
  );
};

export default FeedListItem;
