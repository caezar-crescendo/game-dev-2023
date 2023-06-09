import { useEffect, useState } from 'react';
import { getEntriesByContentType } from '../lib/helpers';
import AddUser from '../components/AddUser';
import { Container } from '@mui/material';
import Board from '../components/Board';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4000');
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET);

export default function Home() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gameSettings, setGameSettings] = useState([]);
  const gameSettingBlocksArrangement = gameSettings[0]?.fields?.blocksArangement || [];
  const gameSettingUsersArrangement = gameSettings[0]?.fields?.usersArrangement || [];

  useEffect(() => {
    const loadInitialData = async () => {
      const users = await getEntriesByContentType("user", true);
      const blocks = await getEntriesByContentType("block");
      const gameSettings = await getEntriesByContentType("gameSettings");

      setUsers(users.items || []);
      setBlocks(blocks.items || []);
      setGameSettings(gameSettings.items || []);

      // console.log('loadInitialData', {
      //   users: users.items || [],
      //   blocks: blocks.items || [],
      //   gameSettings: gameSettings.items || [],
      // });
    };

    loadInitialData().then(() => {});

    socket.on('gameSettings.list.update', (data) => {
      // console.log('gameSettings.list.update', data);
      setGameSettings(data);
    });
  }, []);

  return (
    <div className="pt-5">
      <Container maxWidth="xl">
        {!user ? (
          <AddUser
            socket={socket}
            gameSettings={gameSettings.length ? gameSettings[0].fields : []}
            users={users}
            callback={(entry) => {
              setUser(entry);
            }}
          />
        ) : (
          <Board
            socket={socket}
            user={user}
            blocksArangement={gameSettingBlocksArrangement}
            usersArrangement={gameSettingUsersArrangement}
            blocks={blocks}
          />
        )}
      </Container>
    </div>
  );
}
