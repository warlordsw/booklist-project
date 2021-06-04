const ROOT_URL = 'http://localhost:5000'

export const loginUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    let response = await fetch(`${ROOT_URL}/users/login`, requestOptions)
    //console.log(response, 'fetch url kısmı')
    let data = await response.json()
    //console.log(data, 'response kısmı')

    if (data.result) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data })
      localStorage.setItem('currentUser', JSON.stringify(data))
      return data
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] })
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

export const registerUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  }

  try {
    dispatch({ type: 'REQUEST_REGISTER' })
    let response = await fetch(`${ROOT_URL}/users/register`, requestOptions)
    let data = await response.json()
    console.log(data, 'request register data')

    if (data.result) {
      localStorage.setItem('currentUser', JSON.stringify(data))
      dispatch({ type: 'REGISTER_SUCCESS', payload: data })
      return data
    }
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] })
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

export const logout = async (dispatch) => {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')
}

export const createBook = async (dispatch, createPayload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createPayload),
  }

  try {
    dispatch({ type: 'REQUEST_CREATE_BOOK' })
    let response = await fetch(`${ROOT_URL}/users/books`, requestOptions)
    let data = await response.json()
    if (data) {
      let localStorageData = localStorage.getItem('currentUser')
      let parseLocalStorageData = JSON.parse(localStorageData)
      parseLocalStorageData.result.createdBooks = data
      localStorage.setItem('currentUser', JSON.stringify(parseLocalStorageData))
      dispatch({ type: 'CREATE_BOOK_SUCCESS' })
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
