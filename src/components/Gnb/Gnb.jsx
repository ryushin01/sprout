// import { useNavigate } from 'react-router';
import { ReactComponent as IconHome } from '../../assets/images/icon_home.svg';
import { ReactComponent as IconFeed } from '../../assets/images/icon_feed.svg';
import { ReactComponent as IconTop } from '../../assets/images/icon_top.svg';
import './Gnb.scss';

const Gnb = () => {
  // const navigate = useNavigate();

  return (
    <nav className="gnb">
      <ul>
        <li>
          <button type="button">
            <IconHome />
          </button>
        </li>
        <li>
          <button type="button">유저 페이지</button>
        </li>
        <li>
          <button type="button">
            <IconFeed />
          </button>
        </li>
        <li>
          <button type="button">
            <IconTop />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
