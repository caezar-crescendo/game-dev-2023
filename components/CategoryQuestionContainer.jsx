import { useEffect, useRef, useState } from 'react';
import { updatePoints } from '../lib/helpers';
import { Alert, Box, CircularProgress, Container, Snackbar, TextField } from '@mui/material';

const CategoryQuestionContainer = ({user, questions}) => {
  const timerRef = useRef();
  const [pleaseWait, setPleaseWait] = useState(true);
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
    let seconds = 23;
    let waitTimer = 3;
    const timer = setInterval(function() {
      waitTimer--;
      seconds--;
      if (timerRef.current) {
        timerRef.current.innerHTML = seconds;
      }

      if (waitTimer <= 0) {
        setPleaseWait(false);
      }
      if (seconds === 0) {
        seconds = 23;
        waitTimer = 3;
        setPleaseWait(true);
        setQuestionIndex(prevCount => {
          if (prevCount + 1 === questions.length) {
            clearInterval(timer);
            timerRef.current.innerHTML = `Game Over!`;
            setPleaseWait(false);
            // publishEntry(user.sys.id);
            console.log('Timer Stopped!');
          }
          setAnswer("");
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
      {pleaseWait && (
        <div className="flex items-center justify-center gap-5 mt-64">
          <h1>Please wait... loading next item...</h1>
          <CircularProgress />
        </div>
      )}
      <div className={pleaseWait ? 'hidden' : ''}>
        <div ref={timerRef} className="questionTimer text-8xl mb-14">
        </div>
        <div className="text-3xl font-bold mb-6">{question?.fields?.name}</div>
        <div className="flex flex-col items-center justify-center gap-5">
          <Box
            component="form"
            className="w-full"
            noValidate
            autoComplete="off"
            onSubmit={async (e) => {
              e.preventDefault();

              const ifExist = question?.fields?.answer.find(item => item.name.toLowerCase() === answer.toLowerCase().trim())

              if (ifExist && !answers.includes(answer)) {
                setAnswer("");
                setAnswers(prevItems => [...prevItems, answer]);
                setSnackbarOpen(true);
                await updatePoints(user.sys.id);
              } else {
                setSnackbarOpen(false);
              }
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
      </div>
    </Container>
  );
}

export default CategoryQuestionContainer