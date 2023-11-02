import Button from '../Button/Button';
import './Input.scss';

const Input = ({ type = 'text', name, placeholder, isButton }) => {
  return (
    <div className="input-wrap">
      <label className="input-label">
        <input
          className="input"
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {isButton && (
          <Button type="button" shape="outline" content="중복 확인" />
        )}
      </label>
    </div>
  );
};

export default Input;
