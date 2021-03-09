import { isTokenAvailable } from 'helpers'

export const Admin = (props) => {
  return isTokenAvailable() ? props.children : null
}
