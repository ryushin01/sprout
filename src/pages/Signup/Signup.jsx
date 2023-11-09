import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import complete from '../../lottie/complete.json';
import INTERESTS_DATA from '../../data/InterestsData';
import Chip from '../../components/Chip/Chip';
import LogoArea from '../../components/LogoArea/LogoArea';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './Signup.scss';

/**
 * Signup.js logics
 * @property {function} typingSentry              - 인풋 입력 시 값을 모니터링하기 위한 함수입니다.
 * @property {function} changedProfileImage       - 프로필 이미지 업로드를 위한 함수입니다. 프로필 이미지 변경 즉시 서버 전송합니다.
 * @property {function} postDuplicatedNickname    - 닉네임 중복 확인을 위한 함수입니다.
 * @property {function} postSignup                - 회원 가입을 위한 유저 정보를 서버로 보내는 함수입니다.
 */

const Signup = () => {
  const navigate = useNavigate();

  // 회원 가입 완료 여부를 저장하는 useState
  const [signupComplete, setSignupComplete] = useState(true);

  // 회원 가입을 위한 유저 정보를 저장하는 useState
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  // 프로필 이미지 업로드를 위한 useState
  const [profileImage, setProfileImage] = useState({
    src: '',
  });

  // 관심사를 저장하기 위한 useState
  const [interests, setInterests] = useState({
    game: false,
    movie: false,
    restaurant: false,
    music: false,
    mbti: false,
    celebrity: false,
    date: false,
    job: false,
    alcohol: false,
    car: false,
    fashion: false,
    interior: false,
    festival: false,
    device: false,
    baby: false,
    beauty: false,
    tip: false,
    cooking: false,
    camping: false,
    trip: false,
  });

  // 닉네임 중복 검사 후 상태 저장을 위한 useState
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);

  // 닉네임 중복 검사 후 다시 닉네임 인풋으로 포커스하기 위한 useRef
  const nicknameRef = useRef(null);

  const typingSentry = e => {
    const { name, value, checked } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setInterests({ ...interests, [value]: checked });
  };

  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/;
  const isPasswordValid = passwordRegExp.test(userInfo.password);
  const isPasswordCheckValid = userInfo.password === userInfo.passwordCheck;
  const interestsValues = Object.values(interests);
  const interestsCheckedArr = interestsValues.filter(Boolean);
  const isInterestsValid = interestsCheckedArr.length < 4;

  if (!isInterestsValid) {
    alert('관심사 최대 갯수를 초과했습니다. 최대 3개까지 선택 가능합니다.');
  }

  const isValidCheck =
    isPasswordValid && isPasswordCheckValid && isInterestsValid;

  // changedProfileImage 함수의 주석 상세 설명
  /**
   * 1번: 프로필 이미지 미리보기 기능과 프로필 이미지 서버 전송에 공통으로 사용하는 변수입니다.
   * 2~5번: 프로필 이미지 미리보기 기능과 관련된 소스 코드입니다.
   * 6~8번: 프로필 이미지 서버 전송과 관련된 소스 코드입니다.
   */
  const changedProfileImage = e => {
    // 1. file 타입 input의 files에 접근해 첫 번째 index 데이터를 변수화합니다.
    const file = e.target.files[0];

    // 2. 파일 객체가 없는 경우는 함수를 종료합니다. (early return)
    if (!file) {
      return;
    }

    // 3. new 연산자로 FileReader 객체를 생성합니다.
    const reader = new FileReader();

    // 4. 파일 객체를 읽은 후 데이터 URL로 변환합니다.
    reader.readAsDataURL(file);

    // 5. 로드될 때 setter 함수 안에 src key에 value를 넣습니다.
    reader.onloadend = () => {
      setProfileImage({ ...profileImage, src: reader.result });
    };

    // 6. 프로필 이미지를 서버로 전송하기 위해 JavaScript 내장 객체인 formData를 생성합니다.
    const formData = new FormData();

    // 7. formData에 append를 사용해 key, value를 넣습니다.
    formData.append('files', file);

    // 8. axios로 서버 전송을 준비합니다. native fetch에서 Content-Type은 multipart/form-data로 지정해야 하지만, axios에서는 기본값이 multipart/form-data입니다. 여기서는 명시하기 위해 작성합니다.
    axios({
      method: 'post',
      url: '/api/files/images',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const postDuplicatedNickname = () => {
    fetch('/data/duplicate.json', {
      // fetch(`${API.USERS}/duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        nickname: userInfo.nickname,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          setIsDuplicatedNickname(false);
          alert('사용 가능한 닉네임입니다.');
        } else {
          setIsDuplicatedNickname(true);
          alert('이미 사용중인 이메일입니다.');
        }

        nicknameRef.current.focus();
      });
  };

  const postSignup = e => {
    e.preventDefault();

    fetch('/data/signup.json', {
      // fetch(`${API.USERS}/duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        nickname: userInfo.nickname,
        password: userInfo.password,
        interests: interests,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          console.log(result);
          setSignupComplete(true);
        }
      });
  };

  return (
    <main className="signup">
      <section className="logo-section">
        <LogoArea />
      </section>
      <section className="signup-section">
        {!signupComplete && (
          <form className="signup-form" onChange={typingSentry}>
            <fieldset>
              <legend className="hidden">추가 정보 입력</legend>
              <div className="input-group">
                <h3>필수 입력 사항입니다.</h3>
                <div className="input-box">
                  <Input
                    name="nickname"
                    placeholder="닉네임을 입력하세요"
                    isButton
                    isValidation={isDuplicatedNickname}
                    buttonFunction={postDuplicatedNickname}
                    forwardRef={nicknameRef}
                    required
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호는 숫자와 대문자 포함 8자 이상 입력하세요"
                    isValidation={isPasswordValid}
                    required
                  />
                  <Input
                    type="password"
                    name="passwordCheck"
                    placeholder="같은 비밀번호를 입력하세요"
                    isValidation={isPasswordCheckValid}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <h3>프로필 사진을 업로드해주세요.</h3>
                <div className="input-box">
                  <div className="file-upload">
                    <div className="preview-wrap">
                      <img className="preview" src={profileImage.src} />
                    </div>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changedProfileImage}
                    />
                    <label htmlFor="file">사진 선택</label>
                  </div>
                </div>
              </div>
              <div className="input-group">
                <h3>관심사 등록을 해주세요. (최소 0개 / 최대 3개)</h3>
                <div className="input-box">
                  <div className="chip-area">
                    {INTERESTS_DATA?.map(({ value, content }, index) => {
                      return (
                        <Chip
                          key={index}
                          name="interests"
                          value={value}
                          content={content}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                shape="solid"
                content="회원 가입"
                onClick={postSignup}
                disabled={!isValidCheck}
              />
            </fieldset>
          </form>
        )}

        {signupComplete && (
          <div className="signup-complete">
            <div className="lottie-wrap">
              <Lottie animationData={complete} />
            </div>
            <span>회원 가입이 완료되었습니다.</span>
            <Button
              type="button"
              shape="outline"
              content="로그인하러 가기"
              onClick={() => navigate('/')}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Signup;
