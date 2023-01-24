import { Link, useLocation } from 'react-router-dom';
import { ArrowBackOutlined } from '@material-ui/icons';

import './watch.scss';

const Watch = () => {
  const { state: movie } = useLocation();

  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackOutlined />
          Back
        </div>
      </Link>
      <video
        src={movie.video}
        className='video'
        autoPlay
        progress='true'
        controls
      ></video>
    </div>
  );
};

export default Watch;
