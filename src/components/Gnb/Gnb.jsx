import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Portal from '../Modal/Portal';
import Modal from '../Modal/Modal';
import { ReactComponent as IconHome } from '../../assets/images/icon_home.svg';
import { ReactComponent as IconFeed } from '../../assets/images/icon_feed.svg';
import { ReactComponent as IconTop } from '../../assets/images/icon_top.svg';
import './Gnb.scss';

const Gnb = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', close);
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
    });
  };

  return (
    <nav className="gnb">
      <ul>
        <li>
          <button type="button" onClick={() => navigate('/feed')}>
            <IconHome />
          </button>
        </li>
        <li>
          <button type="button">유저 페이지</button>
        </li>
        <li>
          <button type="button" onClick={modalHandler}>
            <IconFeed />
          </button>

          <Portal>
            {modalOpen && (
              <Modal
                // data={<Charge points={points} onClose={modalHandler} />}
                onClose={modalHandler}
              />
            )}
          </Portal>
        </li>
        <li>
          <button type="button" onClick={goToTop}>
            <IconTop />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
