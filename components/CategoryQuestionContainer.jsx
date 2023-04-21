import { useEffect, useRef, useState } from 'react';
import { updatePoints } from '../lib/helpers';
import { Box, Container, TextField } from '@mui/material';

const CategoryQuestionContainer = ({user, questions}) => {
  const timerRef = useRef();
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(questions[questionIndex]);

  useEffect(() => {
    let seconds = 15;

    const timer = setInterval(function() {
      console.log(seconds);
      seconds--;
      timerRef.current.innerHTML = seconds;

      if (seconds === 0) {
        clearInterval(timer);
        console.log("Timer stopped");
      }
    }, 1000);
  }, []);

  return (
    <Container
      className="text-center mt-52"
      maxWidth="lg"
    >
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
          <TextField
            required
            className="max-w-[500px] w-full"
            value={answer}
            onChange={(event ) => {
              setAnswer(event.target.value);
            }}
            variant="outlined"
          />
        </Box>
      </div>
    </Container>
  );
}

export default CategoryQuestionContainer