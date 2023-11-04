import { useState, useRef } from 'react';
import INTERESTS_DATA from '../../data/InterestsData';
import Chip from '../../components/Chip/Chip';
import LogoArea from '../../components/LogoArea/LogoArea';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './Signup.scss';

/**
 * Signup.js logics
 * @property {function} typingSentry    - 인풋 입력 시 값을 모니터링하기 위한 함수입니다.
 * @property {function} postSignup      - 회원 가입을 위한 유저 정보를 서버로 보내는 함수입니다.
 */

const Signup = () => {
  // 회원 가입을 위한 유저 정보를 저장하는 useState
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  // 관심사를 저장하기 위한 useState
  const [interests, setInterests] = useState({});

  // 닉네임 중복 검사 후 상태 저장을 위한 useState
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);

  // 닉네임 중복 검사 후 다시 닉네임 인풋으로 포커스하기 위한 useRef
  const nicknameRef = useRef(null);

  const typingSentry = e => {
    const { name, value, checked } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setInterests({ ...interests, [value]: checked });
  };

  console.log(interests, Object.keys(interests).length);

  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/;
  const isPasswordValid = passwordRegExp.test(userInfo.password);
  const isPasswordCheckValid = userInfo.password === userInfo.passwordCheck;
  const isValidCheck = isPasswordValid && isPasswordCheckValid;

  const aaa = Object.values(interests);
  console.log(typeof aaa);
  // console.log(aaa.filter(true));

  // const isInterestValid = interests.length < 4;

  // console.log(isInterestValid);

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
  };

  return (
    <main className="signup">
      <section className="logo-section">
        <LogoArea />
      </section>
      <section className="signup-section">
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
            {/* <div className="input-group">
              <h3>프로필 사진을 업로드해주세요.</h3>
              <div className="input-box">
                <div className="file-upload">
                  <div className="preview-wrap">
                    <img className="preview" src={file} />
                  </div>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={addFile}
                  />
                  <label htmlFor="file">사진 선택</label>
                </div>
              </div>
            </div> */}
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
      </section>
    </main>
  );
};

export default Signup;
