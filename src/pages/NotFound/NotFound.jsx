import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFound from '../../lottie/not_found.json';
import Button from '../../components/Button/Button';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="loading-wrap">
      <section>
        <Lottie animationData={notFound} />
        <Button
          type="button"
          shape="solid"
          content="로그인하기"
          onClick={() => navigate('/')}
        />
      </section>
    </div>
  );
};

export default NotFound;
