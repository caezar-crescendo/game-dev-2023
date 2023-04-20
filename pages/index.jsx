import { useEffect, useState } from 'react';
import { getEntriesByContentType } from '../lib/helpers';
import AddUser from '../components/AddUser';
import { Container } from '@mui/material';
import Board from '../components/Board';

export default function Home(props) {
  console.log('props', props);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // createEntry({
    //   name: {
    //     "en-US": "John Doe tEst",
    //   },
    //   points: {
    //     "en-US": 10,
    //   }
    // }, 'user').then((response) => {
    //   console.log('response', response);
    // });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        {!user ? (
          <AddUser callback={(entry) => {
            setUser(entry);
          }}/>
        ) : (
          <Board />
        )}
      </Container>
      {/*<pre>*/}
      {/*   {JSON.stringify(props, undefined, 2)}*/}
      {/*</pre>*/}
    </>
  );
}

export async function getStaticProps() {
  const user = await getEntriesByContentType("user", true);
  const question = await getEntriesByContentType("question");

  return {
    props: {
      user,
      question,
    },
  };
}
