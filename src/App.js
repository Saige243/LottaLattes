import "./App.css"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button"
import LocalDrinkIcon from "@mui/icons-material/LocalDrink"
import { useState, useEffect } from "react"
import SetGoalComp from "./components/setGoalComp"
import ChangeGoalComp from "./components/changeGoalComp"

function App() {
  const [goal, setGoal] = useState("")
  const [amount, setAmount] = useState("")
  const [pourover, setPourover] = useState("")
  const [today, setToday] = useState("")
  const [latteArr, setLatteArr] = useState([])
  const [todaySaved, setTodaySaved] = useState([0])
  const [weekSaved, setWeekSaved] = useState()
  const [weeklyRemainder, setWeeklyRemainder] = useState(0)
  const [savedTodayInput, setSavedTodayInput] = useState()

  const listLattes = latteArr.map((latte) => (
    <span>
      <LocalDrinkIcon key={latte.id}/>
    </span>
  ))

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const setGoalFunction = () => {
    setGoal(amount)
    setWeeklyRemainder(amount)
  }

  function handleChange(e) {
    const v = e.target.value
    setToday(v)
    setSavedTodayInput(v)
  }

  function handleGoalChange() {
    setGoal("")
    setPourover("")
  }

  const amountSavedFunction = () => {
    // convert string to number, throw on todaySavedArr
    const converted = parseInt(today)
    const newTodaySaved = todaySaved.concat(converted)
    const newWeekSum = newTodaySaved.reduce((a, b) => a + b)
    const newWeeklyRemainder = parseInt(goal) - newWeekSum

    let newPourover
    if (newWeeklyRemainder < 0) {
      newPourover = Math.abs(newWeeklyRemainder)
    }

    setTodaySaved(newTodaySaved)
    setWeekSaved(newWeekSum)
    setWeeklyRemainder(newWeeklyRemainder)
    setPourover(newPourover)

    setSavedTodayInput("")
  }

  useEffect(() => {
    let totes = Math.floor(weekSaved / 6)

    if (latteArr.length !== totes) {
      for (let i = 0; i <= totes; i++) {
        setLatteArr([...latteArr, <LocalDrinkIcon />])
      }
    }
  }, [weekSaved, latteArr])

  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="flex flex-col items-center">
        <h1 className="logo text-blue-600 text-2xl my-6">☕️ LottaLattes ☕️</h1>
        <h3>(Because coffee ain't cheap)</h3>
      </div>

      <div className="flex items-center flex-col sm:flex-row sm:justify-evenly sm:mx-32">
        <div className="mt-4 sm:m-4 md:m-8 lg:m-12 p-8 rounded bg-white drop-shadow-xl text-center">
          {!goal && (
            <SetGoalComp 
              onChange={handleAmountChange}
              onClick={setGoalFunction}
            />
          )}
          {goal && (
            <>
              <h3 className="underline font-bold text-blue-600">GOAL:</h3>
              <span>
                <strong>${goal}</strong>
              </span>{" "}
              <br />
            </>
          )}
          {goal && (
            <ChangeGoalComp 
              onClick={handleGoalChange}
            />
          )}
        </div>

        <div className="mt-4 sm:m-4 md:m-8 lg:m-12 p-8 rounded bg-white drop-shadow-xl text-center">
          <FormControl>
            <h2 className="m-2 underline font-bold text-blue-600">
              SAVED TODAY:
            </h2>
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
      </div>

        <div className="flex justify-center items-center flex-col my-12 p-8 rounded bg-white drop-shadow-xl w-1/2">
          <h2 className="underline font-bold text-blue-600">POUROVER:</h2>
          <h4>(Any $ over your goal)</h4>
          {!pourover ? <span>🫡 Keep saving!🫡</span> : <p>{`$${pourover}`}</p>}
        </div>

      <div className="flex items-center flex-col my-12 p-8 rounded bg-white drop-shadow-xl">
        <h4 className="underline font-bold text-blue-600">Saved this week:</h4>
        <span>
          {weekSaved > 0 ? (
            <span>${weekSaved}</span>
          ) : (
            <span>Enter your number above!</span>
          )}
        </span>
      </div>

      <div className="flex items-center flex-col my-12 p-8 rounded bg-white drop-shadow-xl">
        <h4 className="underline font-bold text-blue-600">Weekly remainder:</h4>
        <span>
          {weeklyRemainder >= 1 && <span>{`$${weeklyRemainder}`}</span>}
          {weeklyRemainder < 1 && !pourover && <span>Set a goal above!</span>}
          {weeklyRemainder < 1 && pourover && <p>🥳YOU DID IT!🥳</p>}
        </span>
      </div>

      <div className="flex items-center flex-col mb-12 p-8 rounded bg-white drop-shadow-xl">
        <h2 className="underline font-bold text-blue-600">Lattes saved:</h2>
        {latteArr.length > 0 ? (
          <span>{listLattes}</span>
        ) : (
          <p>Hmm, no lattes yet!</p>
        )}
      </div>
    </div>
  )
}

export default App
