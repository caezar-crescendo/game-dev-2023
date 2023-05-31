import { useState } from 'react';
import { getEntriesByContentType } from '../lib/helpers';
import AddUser from '../components/AddUser';
import { Container } from '@mui/material';
import Board from '../components/Board';

export default function Home(props) {
  // console.log('props', props);
  const { blocks } = props;
  const [user, setUser] = useState(null);

  return (
    <div className="pt-5">
      <Container maxWidth="xl">
        {!user ? (
          <AddUser callback={(entry) => {
            setUser(entry);
          }}/>
        ) : (
          <Board
            user={user}
            blocks={blocks?.items || []}
          />
        )}
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const users = await getEntriesByContentType("user", true);
  const blocks = await getEntriesByContentType("block");

  return {
    props: {
      users,
      blocks,
    },
  };
}
