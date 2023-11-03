import BIG_BANNER_SWIPER_DATA from '../../data/BigBannerSwiperData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Login.scss';

/**
 * Login.js logics
 * @property {function} connectToKakaoLogin   - 카카오 로그인 버튼 클릭 시 실행되는 함수입니다.
 */

const Login = () => {
  // 1. 카카오 로그인을 위한 변수를 설정합니다.
  const RestApiKey = import.meta.env.VITE_APP_RestApiKey;
  const RedirectUri = import.meta.env.VITE_APP_RedirectUri;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${RedirectUri}&response_type=code`;

  // 2. 카카오 로그인 버튼 클릭 시 RedirectUri로 이동합니다.
  const connectToKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <main className="login">
      <section className="banner-section">
        <div className="swiper-area">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3500 }}
            effect="fade"
            loop
          >
            {BIG_BANNER_SWIPER_DATA.map(({ id, image, title }) => {
              return (
                <SwiperSlide key={id}>
                  <img src={image} alt={title} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      <section className="login-section">
        <div className="logo-area">
          <hgroup>
            <h1>HOKI</h1>
            <h2>나를 담는 공간</h2>
          </hgroup>
        </div>
        <div className="sns-area">
          <button type="button">
            <img
              src="/images/login/kakao_login_large_wide.png"
              alt="카카오 로그인"
              onClick={connectToKakaoLogin}
            />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
