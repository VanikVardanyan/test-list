export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export const checkTokenExpiration = (timestamp) => {
  const msPerDay = 86400000

  const ms = Date.now() - timestamp
  const cond = msPerDay >= ms

  if (cond) {
    return true
  } else {
    localStorage.removeItem('token')

    return false
  }
}

export const isTokenAvailable = () => {
  const token = localStorage.getItem('token')

  if (token) {
    const { timestamp } = JSON.parse(token)

    return checkTokenExpiration(timestamp)
  } else {
    return false
  }
}

export const getToken = () => {
  const token = localStorage.getItem('token')

  if (token) {
    const parsedToken = JSON.parse(token)

    return parsedToken
  } else {
    return false
  }
}

export const getUrl = (uri, page) => {
  if (page) {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2/${uri}/?developer=LeonidKorzhov&page=${page}`
  }

  return `https://uxcandy.com/~shapoval/test-task-backend/v2/${uri}/?developer=LeonidKorzhov`
}
