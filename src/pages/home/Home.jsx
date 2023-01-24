import { useEffect, useState } from 'react';

import List from 'components/list/List';
import Featured from 'components/featured/Featured';
import { getRandomLists } from 'services/listService';

import './home.scss';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { lists },
        } = await getRandomLists(type, genre);
        setLists(lists);
      } catch (err) {
        console.log(err);
      }
    })()
  }, [genre, type]);

  return (
    <div className='home'>
      <Featured type={type} setGenre={setGenre} />
      {lists.map((item) => {
        return <List key={item._id} {...item} />;
      })}
    </div>
  );
};

export default Home;
