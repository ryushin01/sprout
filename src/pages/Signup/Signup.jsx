import { useState } from 'react';
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
    <main className="main">
      <form className="signup-form">
        <fieldset>
          <legend className="hidden">추가 정보 입력</legend>
          <Input name="nickname" placeholder="닉네임을 입력하세요" isButton />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
          <Input
            type="password"
            name="password-check"
            placeholder="같은 비밀번호를 입력하세요"
          />
          <div>
            <div>
              <label htmlFor="file">이미지 선택</label>
            </div>
            <img className="preview" alt="업로드 사진 미리보기" src={file} />
            <input id="file" type="file" accept="image/*" onChange={addFile} />
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
    </main>
  );
};

export default Signup;
