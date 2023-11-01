import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Auth.js logics
 * @property {function} connectToKakaoLogin   - 카카오 로그인 버튼 클릭 시 실행되는 함수입니다.
 */

const Auth = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  // const searchParam = searchParams.get('code');

  const getKakaoLogin = () => {
    axios({
      method: 'get',
      url: 'http://10.58.52.118:8000/users/kakao/callback?code=${searchParam}',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    })
      .then(response => console.log(response.data))
      .catch(err => {
        console.log(err.message);
      });
  };

  return <></>;
};

export default Auth;
