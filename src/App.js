import './App.css';
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';

import { useState, useEffect } from 'react'

function App() {
  const [goal, setGoal] = useState('')
  const [amount, setAmount] = useState('')
  // set the 'extra' amount
  const [pourover, setPourover] = useState('')
  const [today, setToday] = useState('')
  const [latteArr, setLatteArr] = useState([])
  const [todaySaved, setTodaySaved] = useState([0])
  const [todaySum, setTodaySum] = useState()
  const [weeklyRemainder, setWeeklyRemainder] = useState(0)

  const [savedTodayInput, setTodaySavedInput] = useState()


  const listLattes = latteArr.map(() =>
    <span><LocalDrinkIcon /></span>
  )

  const setGoalFunction = () => {
    setGoal(amount)
    setWeeklyRemainder(amount)
  }

  const amountSavedFunction = () => {
    // show latte icons
    if (today >= 6) {
      setLatteArr([...latteArr, <LocalDrinkIcon />])
    }

    // convert string to number, throw on todaySavedArr
    const converted = parseInt(today)
    const newTodaySaved = todaySaved.concat(converted)
    const newTodaySum = newTodaySaved.reduce((a, b) => a + b)
    const newWeeklyRemainder = parseInt(goal) - newTodaySum

    let newPourover
    if (newWeeklyRemainder < 0) {
      newPourover = Math.abs(newWeeklyRemainder)
    }

    setTodaySaved(newTodaySaved)
    setTodaySum(newTodaySum)
    setWeeklyRemainder(newWeeklyRemainder)
    setPourover(newPourover)

    // clear 'Amount Saved' input field
    setTodaySavedInput('')

  }

  // useEffect(() => {
  //   console.log('loaded')

  // }, [amountSavedFunction, setGoalFunction, weeklyRemainder, todaySum])

  return (
    <div className="App">
      <div className="header">
        <h1>☕️ LottaLattes ☕️</h1>
        <h3>(Because coffee ain't cheap)</h3>
      </div>

      <div className="secondHeader">
        <div className="goalBody">
          {!goal &&
            <>
              <h2>What's your weekly goal?</h2>
              <FormControl>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Goal"
                  multiline
                  size="medium"
                  maxRows={8}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button
                  sx={{
                    marginTop: 1
                  }}
                  size="small"
                  variant="outlined"
                  onClick={setGoalFunction}
                >Set Goal</Button>
              </FormControl>
            </>
          }
          {
            goal &&
            <>
              <h3> GOAL:</h3>
              <span><strong>${goal}</strong></span> <br />
            </>
          }
          {goal &&
            <Button
              sx={{
                marginTop: 1
              }}
              size="small"
              variant="outlined"
              onClick={(e) => setGoal('')}
            >
              Change Goal
      </Button>
          }
        </div>


        <div className="pouroverBody">
          <h3>POUROVER:</h3>
          <h4>(Any $ over your goal)</h4>
          {!pourover &&
            <span>Keep saving! 🫡</span>
          }
          {pourover}
        </div>
      </div>


      <div className="addAmount">
        <FormControl>
          <h2>SAVED TODAY:</h2>
          <TextField
            id="outlined-multiline-flexible"
            label="Amount saved"
            multiline
            size="medium"
            maxRows={8}
            value={savedTodayInput}
            onChange={(e) => setToday(e.target.value)}
          />
          <Button
            sx={{
              marginTop: 1
            }}
            size="small"
            variant="outlined"
            onClick={amountSavedFunction}
          >
            Get that latte!
          </Button>
        </FormControl>
      </div>

      <div className="savedLattes">
        <h4>Saved today:</h4>
        <span>{todaySum > 0 ? <span>${todaySum}</span> : <span>Enter your number above!</span>}</span>
        <h4>Weekly remainder:</h4>
        <span>{goal > 0 ? <span>{`$${weeklyRemainder}`}</span> : <span>Set a goal above!</span>}</span>
        <h2>Lattes saved:</h2>
        <span>{listLattes}</span>
      </div>
    </div>
  );
}

export default App;
