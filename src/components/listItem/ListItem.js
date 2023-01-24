import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import {
  Add,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  PlayArrow,
} from '@material-ui/icons';

import { getMovie } from 'services/movieService';
import './listItem.scss';

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  const fetchMovie = useCallback(async () => {
    try {
      const {
        data: { movie },
      } = await getMovie(item);
      setMovie(movie);
    } catch (err) {
      console.log(err);
    }
  }, [item]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return (
    <Link to='/watch' state={movie}>
      <div
        className='list-item'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt='' />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay loop></video>
            <div className='item__info'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownAltOutlined className='icon' />
              </div>
              <div className='item__info--top'>
                <span>{movie.duration}</span>
                <span className='limit'>+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className='desc'>{movie.desc}</div>
              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
