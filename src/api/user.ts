import { User } from '../interaces/user.insterface';
const API = "https://react-movies-1.onrender.com/api"


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

    export const deleteUserRequest = (id: string) =>
        fetch(`${API}/users/${id}`, {
            method: 'DELETE',
        });
   

   