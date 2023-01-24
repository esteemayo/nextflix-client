import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer style={{ fontSize: '1.4rem' }} />
      <Outlet />
    </>
  );
};

export default SharedLayout;
