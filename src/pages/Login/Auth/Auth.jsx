import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../../config';
// import axios from 'axios';

/**
 * Auth.js logics
 * @property {function} connectToKakaoLogin   - 카카오 로그인 버튼 클릭 시 실행되는 함수입니다.
 */

const Auth = () => {
  // 3. 파라미터 중에서
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParam = searchParams.get('code');

  // const getKakaoLogin = () => {
  //   axios({
  //     method: 'get',
  //     url: `${API.KAKAO_LOGIN}?code=${searchParam}`,
  //     headers: {
  //       'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //     data: {},
  //   })
  //     .then(response => {
  //       console.log(response);
  //       localStorage.setItem('accessToken', response.accessToken);
  //       navigate('/signup');
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     });
  // };

  console.log(searchParam);

  const getSnsCode = () => {
    fetch(`${API.KAKAO_LOGIN}?code=${searchParam}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  };

  useEffect(() => {
    getSnsCode();

    // getKakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <></>;
};

export default Auth;
