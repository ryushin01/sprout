import { useState } from 'react';
import LogoArea from '../../components/LogoArea/LogoArea';
import Input from '../../components/Input/Input';
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

  return (
    <main className="signup">
      <section className="logo">
        <LogoArea />
      </section>
      <section className="signup-section">
        <form className="signup-form">
          <fieldset>
            <legend className="hidden">추가 정보 입력</legend>
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
            <div className="file-upload">
              <div className="preview-wrap">
                <img
                  className="preview"
                  src={file}
                  onError="this.style.display='none'"
                />
              </div>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={addFile}
              />
              <label htmlFor="file">사진 선택</label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="interests" value="game" />
                <span>게임</span>
              </label>
              <label>
                <input type="checkbox" name="interests" value="movie" />
                <span>영화</span>
              </label>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default Signup;
