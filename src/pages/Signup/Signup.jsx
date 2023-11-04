import { useState } from 'react';
import INTERESTS_DATA from '../../data/InterestsData';
import Chip from '../../components/Chip/Chip';
import LogoArea from '../../components/LogoArea/LogoArea';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './Signup.scss';

const Signup = () => {
  const [file, setFile] = useState('');

  const addFile = e => {
    let reader = new FileReader();
    reader.onload = function (e) {
      setFile(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageUpload = e => {
    e.preventDefault();
    fetch('data/orderMock.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {});
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
        <form className="signup-form">
          <fieldset>
            <legend className="hidden">추가 정보 입력</legend>
            <div className="input-group">
              <h3>필수 입력 사항입니다.</h3>
              <div className="input-box">
                <Input
                  name="nickname"
                  placeholder="닉네임을 입력하세요"
                  status="error"
                  isButton
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  status="done"
                />
                <Input
                  type="password"
                  name="password-check"
                  placeholder="같은 비밀번호를 입력하세요"
                />
              </div>
            </div>
            <div className="input-group">
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
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default Signup;
