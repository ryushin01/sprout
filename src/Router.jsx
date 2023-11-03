import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Auth from './pages/Login/Auth/Auth';
import Signup from './pages/Signup/Signup';
import InitializeScroll from './components/InitializeScroll/InitializeScroll';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/userpage/:id" element={<userpage />} /> */}
      </Routes>
      <InitializeScroll />
    </BrowserRouter>
  );
};

export default Router;
