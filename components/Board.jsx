import { Box, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createEntry, getEntriesByContentType, publishEntry, updatePoints } from '../lib/helpers';

const Board = ({user, questions}) => {
  const [loading, setLoading] = useState(true);
  const [answerLoader, setAnswerLoader] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [users, setUsers] = useState([]);
  console.log('user', user);

  useEffect(() => {
    let userActiveChecker = setInterval(async  () => {
      const usersEntries = await getEntriesByContentType("user");
      console.log('usersEntries', usersEntries);

      if (typeof usersEntries === 'object' && usersEntries?.items.length) {
        setUsers(usersEntries.items);
        console.log('usersEntries.items', usersEntries.items);
        const isActive = usersEntries.items.find(item => item.sys.id === user.sys.id)

        if (isActive) {
          setLoading(false);
          // clearInterval(userActiveChecker);
        }
      }
    }, 1000);
  }, []);

  return (
    <div className="Board min-h-[90vh] flex items-center justify-center">
      {loading ? (
        <div className="flex items-center justify-center gap-5">
          <h1>Please wait...</h1>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper className="p-5 min-h-[90vh]">
              <div className="grid grid-cols-2">
                <div>{user.fields.name['en-US']}</div>
                <div>Score: {user.fields.points['en-US']}</div>
              </div>
              <Container
                className="text-center mt-64"
                maxWidth="lg"
              >
                <div className="text-3xl font-bold mb-6">{question?.fields?.name}</div>
                <div className="flex flex-col items-center justify-center gap-5">
                  <Box
                    component="form"
                    className="w-full"
                    noValidate
                    autoComplete="off"
                    onSubmit={async  (e) => {
                      e.preventDefault();

                      console.log(answer);
                      console.log(question?.fields);

                      const ifExist = question?.fields?.answer.find(item => item.name.toLowerCase() === answer.toLowerCase())

                      if (ifExist) {
                        setAnswer("");
                        updatePoints(user.sys.id)
                      } else {

                      }
                    }}
                  >
                    {answerLoader ? (
                      <CircularProgress />
                    ) : (
                      <TextField
                        required
                        className="max-w-[500px] w-full"
                        value={answer}
                        onChange={(event ) => {
                          setAnswer(event.target.value);
                        }}
                        variant="outlined"
                      />
                    )}
                  </Box>
              </div>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="p-5 min-h-[90vh]">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="text-2xl bold">Players</div>
                {users.length ? users.map(({fields}, index) => {
                  return (
                    <div key={index} className="text-xl">
                      {fields.name}
                    </div>
                  );
                }) : ''}
              </Grid>
              <Grid item xs={6}>
                <div className="text-2xl bold">Score</div>
                {users.length ? users.map(({fields}, index) => {
                  return (
                    <div key={index} className="text-xl">
                      {fields.points}
                    </div>
                  );
                }) : ''}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )}
  </div>
  )
}

export default Board;