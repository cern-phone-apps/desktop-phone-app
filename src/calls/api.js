import {withAuth} from 'login/reducers/auth'

const getUserProfile = async (username)  => {

  let requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "text/plain");

  const fetchParams = {
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    credentials: 'include'
  };

  const queryArgs = `?username=${username}`

  const response = await fetch(`${process.env.REACT_APP_API_USER_PROFILE_ENDPOINT}${queryArgs}`, fetchParams)
  const profile = await response.json()

  return profile
}

export {getUserProfile}