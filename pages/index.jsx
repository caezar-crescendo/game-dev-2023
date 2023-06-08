import { useState } from 'react';
import { getEntriesByContentType } from '../lib/helpers';
import AddUser from '../components/AddUser';
import { Container } from '@mui/material';
import Board from '../components/Board';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4000');
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET);

export default function Home(props) {
  const { blocks, gameSettings, users } = props;
  const [user, setUser] = useState(null);
  const gameSettingBlocksArrangement = gameSettings.items[0].fields.blocksArangement;
  const gameSettingUsersArrangement = gameSettings.items[0].fields.usersArrangement;

  console.log('props', props);
  return (
    <div className="pt-5">
      <Container maxWidth="xl">
        {!user ? (
          <AddUser
            socket={socket}
            users={users.items}
            callback={(entry) => {
              setUser(entry);
            }}
          />
        ) : (
          <Board
            socket={socket}
            user={user}
            blocksArangement={gameSettingBlocksArrangement || []}
            usersArrangement={gameSettingUsersArrangement || []}
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
  const gameSettings = await getEntriesByContentType("gameSettings");

  return {
    props: {
      users,
      blocks,
      gameSettings,
    },
    revalidate: 10,
  };
}
