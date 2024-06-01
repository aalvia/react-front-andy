import { User } from '../interaces/user.insterface';
const API = "http://localhost:3000/api"


export const createUserRequest = (user:User) => 
    fetch(`${API}/users`,{
        method:'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': "application/json"
        }

    }
  )

  export const loginUserReques = (user:any) => 
    fetch(`${API}/users/login`,{
        method:'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': "application/json"
        }

    }
  )

  export const getUserRequest = (user:User) => 
    fetch(`${API}/users/`,{
        method:'GET',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': "application/json"
        }

    }
  )

  export const updateUserRequest = (user: User) =>
    fetch(`${API}/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });