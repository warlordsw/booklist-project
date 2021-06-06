let userName = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).result.userName
  : ''
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).token
  : ''
let email = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).result.email
  : ''

let userId = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).result._id
  : ''

export const initialState = {
  userName: '' || userName,
  token: '' || token,
  email: '' || email,
  loading: false,
  userId: '' || userId,
  errorMessage: null,
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return { ...initialState, loading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        userName: action.payload.result.userName,
        email: action.payload.result.email,
        token: action.payload.token,
        loading: false,
        userId: action.payload.result._id,
      }
    case 'LOGOUT':
      return {
        ...initialState,
        userName: '',
        token: '',
        email: '',
        userId: '',
      }
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
    case 'REQUEST_REGISTER':
      return {
        ...initialState,
        loading: true,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...initialState,
        userName: action.payload.result.userName,
        email: action.payload.result.email,
        token: action.payload.token,
        loading: false,
        userId: action.payload.result._id,
      }
    case 'REQUEST_CREATE_BOOK':
      return {
        ...initialState,
        loading: true,
      }
    case 'CREATE_BOOK_SUCCESS':
      return {
        ...initialState,
        loading: false,
      }
    case 'REMOVE_ALL_BOOKS':
      return {
        ...initialState,
      }
    case 'REMOVE_SPECIFIC_BOOK':
      return {
        ...initialState,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
