import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './error.scss';

const NotFound = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1 className='title'>404</h1>
        <h2 className='text'>
          Oops, the page you are looking for can't be found!
        </h2>
        {!user ? (
          <Link to='/login' className='notfound'>
            <button className='btn'>Return to login page</button>
          </Link>
        ) : (
          <Link to='/' className='notfound'>
            <button className='btn'>Return to homepage</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
