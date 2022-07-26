import React from 'react'
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button"

function setGoalComp(props) {
  return (
    <>
      <h2 className="underline text-blue-600 font-bold m-2">WEEKLY GOAL:</h2>
      <FormControl>
        <TextField
          id="outlined-multiline-flexible"
          label="Goal"
          multiline
          size="medium"
          maxRows={8}
          onChange={props.onChange}
        />
        <Button
          sx={{
            marginTop: 1,
          }}
          size="small"
          variant="outlined"
          onClick={props.onClick}
        >
          Set Goal
        </Button>
      </FormControl>
    </>
  )
}

export default setGoalComp