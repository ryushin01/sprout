import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Gnb from './components/Gnb/Gnb';
import Login from './pages/Login/Login';
import Auth from './pages/Login/Auth/Auth';
import Signup from './pages/Signup/Signup';
import Feed from './pages/Feed/Feed';
import InitializeScroll from './components/InitializeScroll/InitializeScroll';

const Router = ({ userInfo, defaultProfileImage }) => {
  return (
    <BrowserRouter basename="/sprout">
      <Header />
      <Gnb userInfo={userInfo} defaultProfileImage={defaultProfileImage} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="feed"
          element={
            <Feed
              userInfo={userInfo}
              defaultProfileImage={defaultProfileImage}
            />
          }
        />
        <Route path="/*" element={<Login />} />
      </Routes>
      <InitializeScroll />
    </BrowserRouter>
  );
};

export default Router;
