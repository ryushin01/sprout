import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import BIG_BANNER_SWIPER_DATA from '../../../../data/BigBannerSwiperData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedListItem.scss';

const FeedListItem = () => {
  return (
    <article className="feed-list-item">
      <div>
        <div className="info">
          <div className="left-split">
            <img src="images/feed/default_profile_image.png" alt="" />
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
          <p>피드 내용 텍스트</p>
        </div>

        <div>interests</div>
        <div>comments</div>
      </div>
    </article>
  );
};

export default FeedListItem;
