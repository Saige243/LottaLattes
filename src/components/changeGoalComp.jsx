import React from 'react'
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button"

function changeGoalComp(props) {
  return (
    <Button
      sx={{
        marginTop: 1,
      }}
      size="small"
      variant="outlined"
      onClick={props.onClick}
      className="text-blue-600"
    >
      Change Goal
    </Button>
  )
}

export default changeGoalComp