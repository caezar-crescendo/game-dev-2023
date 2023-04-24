import { useEffect, useRef, useState } from 'react';
import { publishEntry, updatePoints } from '../lib/helpers';
import { Alert, Box, Container, Snackbar, TextField } from '@mui/material';

const CategoryQuestionContainer = ({user, questions}) => {
  const timerRef = useRef();
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    let seconds = 15;
    const timer = setInterval(function() {
      // console.log(seconds);
      seconds--;
      if (timerRef.current) {
        timerRef.current.innerHTML = seconds;
      }

      if (seconds === 0) {
        seconds = 15;
        setQuestionIndex(prevCount => {
          if (prevCount + 1 === questions.length) {
            clearInterval(timer);
            timerRef.current.innerHTML = `Congratulations! <br />You got {n} points! :D`;
            console.log('Timer Stopped!');
          }
          setAnswers([]);
          return prevCount + 1;
        });
      }
    }, 1000);
  }, []);

  return (
    <Container
      className="text-center mt-52"
      maxWidth="lg"
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Correct!
        </Alert>
      </Snackbar>
      <div ref={timerRef} className="questionTimer text-8xl mb-14">
        15
      </div>
      <div className="text-3xl font-bold mb-6">{question?.fields?.name}</div>
      <div className="flex flex-col items-center justify-center gap-5">
        <Box
          component="form"
          className="w-full"
          noValidate
          autoComplete="off"
          onSubmit={async  (e) => {
            e.preventDefault();

            const ifExist = question?.fields?.answer.find(item => item.name.toLowerCase() === answer.toLowerCase())

            if (ifExist && !answers.includes(answer)) {
              setAnswers(prevItems => [...prevItems, answer]);
              updatePoints(user.sys.id);
              setSnackbarOpen(true);
            } else {
              setSnackbarOpen(false);
            }
            setAnswer("");
          }}
        >
          <div className="flex items-center justify-center gap-5">
            <TextField
              required
              className="max-w-[500px] w-full"
              value={answer}
              onChange={(event ) => {
                setAnswer(event.target.value);
                setSnackbarOpen(false);
              }}
              variant="outlined"
            />
          </div>
        </Box>
      </div>
    </Container>
  );
}

export default CategoryQuestionContainer