import { useState } from 'react';
import axios from 'axios';
import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedCreate.scss';

const FeedCreate = () => {
  // 멀티 이미지 업로드를 위한 useState
  const [feedImages, setFeedImages] = useState([]);

  // 멀티 이미지 미리보기를 위한 useState
  const [feedPreviewImages, setFeedPreviewImages] = useState([]);

  // 글로벌에서 처리할 것
  const defaultProfileImage = '/images/feed/default_profile_image.png';

  // changedFeedImages 함수의 주석 상세 설명
  /**
   * 1번: 프로필 이미지 미리보기 기능과 프로필 이미지 서버 전송에 공통으로 사용하는 변수입니다.
   * 2~5번: 프로필 이미지 미리보기 기능과 관련된 소스 코드입니다.
   * 6~8번: 프로필 이미지 서버 전송과 관련된 소스 코드입니다.
   */
  let previewImageUrlLists = [];

  const changedFeedImages = e => {
    const imageLists = e.target.files;
    let imageUrlLists = [...feedImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    // 이미지 업로드 갯수를 최대 5개로 제한합니다.
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    // 이미지 경로를 저장합니다.
    setFeedImages(imageUrlLists);

    // 미리보기
    previewImageUrlLists = [...feedPreviewImages];
    let reader;

    for (let j = 0; j < imageLists.length; j++) {
      previewImageUrlLists.push(imageLists[j]);
      reader = new FileReader();
      reader.readAsDataURL(previewImageUrlLists[j]);

      // reader.onloadend = () => {
      // setFeedPreviewImages({ ...previewImageUrlLists, src: reader.result });
      // console.log(previewImageUrlLists);
      // setFeedPreviewImages({
      //   ...previewImageUrlLists,
      //   src: reader.result,
      // });
      // };
      // console.log(reader[j].result);

      console.log(previewImageUrlLists);
    }

    // reader.onloadend = () => {
    //   setFeedPreviewImages({ ...previewImageUrlLists, src: reader.result });
    // };

    console.log(previewImageUrlLists);

    // 8. axios로 서버 전송을 준비합니다. native fetch에서 Content-Type은 multipart/form-data로 지정해야 하지만, axios에서는 기본값이 multipart/form-data입니다. 여기서는 명시하기 위해 작성합니다.
    // axios({
    //   method: 'post',
    //   url: '/api/files/images',
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
  };

  return (
    <>
      <article className="feed-detail feed-create">
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
            {feedImages?.map(({ src, text }, index) => {
              return (
                <SwiperSlide key={index}>
                  <picture>
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

        <div>
          <div className="info">
            <div className="left-split">
              {/* <img
                src={profileImage === '' ? defaultProfileImage : profileImage}
                alt={`${nickname} 님의 프로필 사진`}
              /> */}
              <img src={defaultProfileImage} alt="" />
              <div>
                {/* <strong>{nickname}</strong> */}
                <strong>nickname</strong>
              </div>
            </div>
          </div>

          <div className="content">
            <form className="feed-form">
              <fieldset>
                <legend className="hidden">피드 게시 양식</legend>
                <div className="file-upload">
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={changedFeedImages}
                    multiple
                  />
                  <label htmlFor="file">사진 선택</label>
                </div>
                <textarea
                  name="feedCreate"
                  placeholder="피드는 최대 2,000자까지 작성할 수 있습니다."
                  maxLength={2000}
                ></textarea>
              </fieldset>
              <button type="submit">게시</button>
            </form>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedCreate;
