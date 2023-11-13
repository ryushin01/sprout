import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../../config';
import axios from 'axios';

/**
 * Auth.js logics
 * @property {function} connectToKakaoLogin   - 카카오 로그인 버튼 클릭 시 실행되는 함수입니다.
 */

const Auth = () => {
  // 3. 파라미터 중에서 code(카카오 쪽으로 전송해야 하는 고유 code)를 위한 useState
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParam = searchParams.get('code');

  const getKakaoLogin = () => {
    axios({
      method: 'get',
      url: `${API.KAKAO_LOGIN}?code=${searchParam}`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: {},
    })
      .then(response => {
        console.log(response);

        // 카카오 로그인 이후 추가 정보 입력을 위해 엑세스 토큰 발급하고 signup으로 네비게이팅
        localStorage.setItem('accessToken', response.accessToken);
        navigate('/signup');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getKakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <></>;
};

export default Auth;
