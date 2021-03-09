import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleEditTask } from 'slices/table/actions'

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/'

export function EditTaskModal({ open, handleClose, row }) {
  const dispatch = useDispatch()
  const errors = useSelector((state) => state.task.editError)
  const [email, setEmail] = useState(row.email)
  const [username, setUsername] = useState(row.username)
  const [text, setText] = useState(row.text)

  const clearForm = () => {
    setEmail('')
    setUsername('')
    setText('')
  }

  const onSubmit = () => {
    if (!text) return null

    const data = dispatch(
      handleEditTask({ id: row.id, email, username, text, status: row.status }),
    )

    data.then((res) => {
      if (res.data.status === 'ok') {
        clearForm()
        handleClose()
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
            error={errors.email}
            helperText={errors.email}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <TextField
            margin="dense"
            error={errors.username}
            helperText={errors.username}
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled
          />
          <TextField
            required
            margin="dense"
            error={errors.text || !text.length}
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
