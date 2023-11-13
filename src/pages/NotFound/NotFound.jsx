import Lottie from 'lottie-react';
import notFound from '../../lottie/not_found.json';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="loading-wrap">
      <Lottie animationData={notFound} />
    </div>
  );
};

export default NotFound;
