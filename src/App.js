import "./App.css";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

import { useState, useEffect } from "react";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { toHaveTextContent } from "@testing-library/jest-dom/dist/matchers";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

function App() {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [pourover, setPourover] = useState("");
  const [today, setToday] = useState("");
  const [latteArr, setLatteArr] = useState([]);
  const [todaySaved, setTodaySaved] = useState([0]);
  const [weekSaved, setWeekSaved] = useState();
  const [weeklyRemainder, setWeeklyRemainder] = useState(0);
  const [savedTodayInput, setSavedTodayInput] = useState();

  const listLattes = latteArr.map(() => (
    <span>
      <LocalDrinkIcon />
    </span>
  ));

  const setGoalFunction = () => {
    setGoal(amount);
    setWeeklyRemainder(amount);
  };

  function handleChange(e) {
    const v = e.target.value
    setToday(v)
    setSavedTodayInput(v)
  }

  function handleGoalChange(){
    setGoal("")
    setPourover("")
  }

  const amountSavedFunction = () => {
    // show latte icons equation
    // if (today >= 6) {
    //   setLatteArr([...latteArr, <LocalDrinkIcon />]);
    // }

    // convert string to number, throw on todaySavedArr
    const converted = parseInt(today);
    const newTodaySaved = todaySaved.concat(converted);
    const newWeekSum = newTodaySaved.reduce((a, b) => a + b);
    const newWeeklyRemainder = parseInt(goal) - newWeekSum;

    let newPourover;
    if (newWeeklyRemainder < 0) {
      newPourover = Math.abs(newWeeklyRemainder);
    }

    setTodaySaved(newTodaySaved);
    setWeekSaved(newWeekSum);
    setWeeklyRemainder(newWeeklyRemainder);
    setPourover(newPourover);

    setSavedTodayInput('')
    
  };

  useEffect(() => {
    let latteCost = 6;
    let totes = (weekSaved / latteCost)

    if (latteArr.length > 0) {
      setLatteArr([...latteArr(totes), <LocalDrinkIcon />]);
    }

  }, [weekSaved, latteArr])

  return (
    <div className="App">
      <div className="header">
        <h1>☕️ LottaLattes ☕️</h1>
        <h3>(Because coffee ain't cheap)</h3>
      </div>

      <div className="secondHeader">
        <div className="goalBody">
          {!goal && (
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
                    marginTop: 1,
                  }}
                  size="small"
                  variant="outlined"
                  onClick={setGoalFunction}
                >
                  Set Goal
                </Button>
              </FormControl>
            </>
          )}
          {goal && (
            <>
              <h3> GOAL:</h3>
              <span>
                <strong>${goal}</strong>
              </span>{" "}
              <br />
            </>
          )}
          {goal && (
            <Button
              sx={{
                marginTop: 1,
              }}
              size="small"
              variant="outlined"
              onClick={handleGoalChange}
            >
              Change Goal
            </Button>
          )}
        </div>

        <div className="pouroverBody">
          <h3>POUROVER:</h3>
          <h4>(Any $ over your goal)</h4>
          {!pourover ? (
            <span>🫡 Keep saving!🫡</span>
          ) : (
            <p>{`$${pourover}`}</p>
          )}
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
            onChange={handleChange}
          />
          <Button
            sx={{
              marginTop: 1,
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
        <h4>Saved this week:</h4>
        <span>
          {weekSaved > 0 ? (
            <span>${weekSaved}</span>
          ) : (
            <span>Enter your number above!</span>
          )}
        </span>

        <h4>Weekly remainder:</h4>
        <span>
          {weeklyRemainder >= 1 &&
            <span>{`$${weeklyRemainder}`}</span>
          } 
          {weeklyRemainder < 1 && !pourover && 
            <span>Set a goal above!</span>
          }
          {weeklyRemainder < 1 && pourover &&
            <p>🥳YOU DID IT!🥳</p>
          }
        </span>
      </div>

        <div className="lattesSaved">
          <h2>Lattes saved:</h2>
            {latteArr.length > 0 ?(
              <span>{listLattes}</span>
            ) : (
              <p>Hmm, no lattes yet!</p>
            )
            }
        </div>
    </div>
  );
}

export default App;
