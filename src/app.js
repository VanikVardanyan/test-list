import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom'

import { Container, Button } from '@material-ui/core'

import {
  HomeOutlined as HomeOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  LockOpen as LockOpenIcon,
} from '@material-ui/icons'

import { EnhancedTable } from 'slices/table'
import { Login } from 'slices/auth'

import { logout } from 'slices/auth/actions'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  routerList: {
    listStyleType: 'none',
    paddingLeft: 0,
    display: 'flex',
  },
  homeButton: {
    marginRight: '10px',
  },
  routerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

export function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const authenticated = useSelector((state) => state.auth.data)

  return (
    <Router>
      <Container>
        <nav>
          <ul className={classes.routerList}>
            <li>
              <Link to="/" className={classes.routerLink}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<HomeOutlinedIcon />}
                  className={classes.homeButton}
                >
                  Home
                </Button>
              </Link>
            </li>
            {!authenticated.token && (
              <li>
                <Link to="/login" className={classes.routerLink}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<LockOutlinedIcon />}
                  >
                    Login
                  </Button>
                </Link>
              </li>
            )}

            {authenticated.token && (
              <li>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="primary"
                  startIcon={<LockOpenIcon />}
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <EnhancedTable />
          </Route>

          <Route path="/login">
            {localStorage.getItem('token') ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}
