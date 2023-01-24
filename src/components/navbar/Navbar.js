import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons/index';

import { logoutUser } from 'redux/apiCalls';

import './navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <img src='assets/logo.png' alt='logo' />
          <ul className='list'>
            <li className='list__item'>
              <Link to='/' className='nav__link'>
                Home
              </Link>
            </li>
            <li className='list__item list__item--main'>
              <Link to='/series' className='nav__link'>
                Series
              </Link>
            </li>
            <li className='list__item list__item--main'>
              <Link to='/movies' className='nav__link'>
                Movies
              </Link>
            </li>
            <li className='list__item'>New and Popular</li>
            <li className='list__item'>My List</li>
          </ul>
        </div>
        <div className='right'>
          <Search className='icon' />
          <span>Kid</span>
          <Notifications className='icon' />
          {user && (
            <img
              src={user?.avatar || 'assets/netflix-default-avatar.jpg'}
              alt=''
            />
          )}
          <div className='profile'>
            <ArrowDropDown className='icon' />
            <div className='options'>
              <span>Settings</span>
              {user ? (
                <span onClick={handleLogout}>Logout</span>
              ) : (
                <span>
                  {pathname !== '/login' && (
                    <Link to='/login' className='link'>
                      Login
                    </Link>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
