import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { authentication } from './actions'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from '@material-ui/core/'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const errors = useSelector((state) => state.auth.error)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successfulAuth, setAuthStatus] = useState(false)

  const onSubmit = async () => {
    const { data } = await dispatch(authentication({ username, password }))

    if (data.status === 'ok') {
      setAuthStatus(true)
    }
  }

  if (successfulAuth) {
    return <Redirect to="/" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={!!errors.username}
            helperText={errors.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}
