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
    <div className="pt-5">
      <Container maxWidth="xl">
        {!user ? (
        // {!!user ? (
          <AddUser callback={(entry) => {
            setUser(entry);
          }}/>
        ) : (
          <Board
            user={user}
            // users={props.users?.items || []}
            questions={props.questions?.items || []}
          />
        )}
      </Container>
      {/*<pre>*/}
      {/*   {JSON.stringify(props, undefined, 2)}*/}
      {/*</pre>*/}
    </div>
  );
}

export async function getStaticProps() {
  const users = await getEntriesByContentType("user", true);
  const questions = await getEntriesByContentType("question");

  return {
    props: {
      users,
      questions,
    },
  };
}
