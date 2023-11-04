import Button from '../Button/Button';
import './Input.scss';

const Input = ({ type = 'text', name, placeholder, status, isButton }) => {
  return (
    <div className="input-wrap">
      <label className="input-label">
        <input
          className="input"
          type={type}
          name={name}
          placeholder={placeholder}
          status={status}
        />
        {status === 'error' && <p>error</p>}
      </label>
      {isButton && <Button type="button" shape="outline" content="중복 확인" />}
    </div>
  );
};

export default Input;
