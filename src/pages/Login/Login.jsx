import LogoArea from '../../components/LogoArea/LogoArea';
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
    <main className="main">
      <section className="login">
        <LogoArea />
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
