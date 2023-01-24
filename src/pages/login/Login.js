import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { loginUser } from 'redux/apiCalls';

import './login.scss';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(dispatch, { ...userData });

    const origin = location.state?.from?.pathname || '/';
    navigate(origin);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className='login'>
      <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          {/* <input type='email' placeholder='Email or phone number' /> */}
          <input type='text' placeholder='Username' ref={usernameRef} />
          <input type='password' placeholder='Password' ref={passwordRef} />
          <button className='login__button' disabled={loading}>
            {loading ? 'Processing ...' : 'Sign in'}
          </button>
          {error && (
            <div className='error-message'>
              Wrong credentials, please try again...
            </div>
          )}
          <span>
            New to Netflix?{' '}
            <Link to='/register' className='link'>
              <strong>Sign up now</strong>.
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <strong>Learn more</strong>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
