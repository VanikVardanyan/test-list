import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createTask, getTasks } from 'slices/table/actions'

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/'

export function CreateTaskModal({ open, handleClose, page }) {
  const dispatch = useDispatch()
  const errors = useSelector((state) => state.task.createError)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [text, setText] = useState('')

  const clearForm = () => {
    setEmail('')
    setUsername('')
    setText('')
  }

  const onSubmit = () => {
    const data = dispatch(createTask({ email, username, text }))

    data.then((res) => {
      if (res.data.status === 'ok') {
        clearForm()
        handleClose()

        dispatch(getTasks(page))
      }
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new task, please enter your email, name and task text
            here.
          </DialogContentText>
          <TextField
            autoFocus
            error={!!errors.email}
            helperText={errors.email}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            error={!!errors.username}
            helperText={errors.username}
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            error={!!errors.text}
            helperText={errors.text}
            id="text"
            label="Task text"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
