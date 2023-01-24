import { useEffect, useState } from 'react';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';

import { getRandomMovie } from 'services/movieService';

import './featured.scss';

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { movie },
        } = await getRandomMovie(type);

        setContent(movie[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [type]);

  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span style={{ zIndex: 1 }}>
            {type === 'movies' ? 'Movies' : 'Series'}
          </span>
          <select
            name='genre'
            id='genre'
            onChange={(e) => setGenre(e.target.value)}
            style={{ zIndex: 1 }}
          >
            <option>Genre</option>
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            <option value='crime'>Crime</option>
            <option value='fantasy'>Fantasy</option>
            <option value='historical'>Historical</option>
            <option value='horror'>Horror</option>
            <option value='romance'>Romance</option>
            <option value='sci-fi'>Sci-fi</option>
            <option value='thriller'>Thriller</option>
            <option value='western'>Western</option>
            <option value='animation'>Animation</option>
            <option value='drama'>Drama</option>
            <option value='documentary'>Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt='' />
      <div className='info'>
        <img src={content.imgTitle} alt='' />
        <span className='desc'>{content.desc}</span>
        <div className='buttons'>
          <button className='play'>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
