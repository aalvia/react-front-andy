import { CreateResenia } from '../interaces/resenia.interface';
const API = "http://localhost:3000/api"


export const createReseniaRequest = (resenia:CreateResenia) => 
    fetch(`${API}/resenias`,{
        method:'POST',
        body: JSON.stringify(resenia),
        headers: {
            'Content-Type': "application/json"
        }

    }
  )
  export const getReseniaRequest = () => 
    fetch(`${API}/resenias`)
 

 
  export const updateReseniaRequest = async (id: string, resenia: Partial<CreateResenia>) => {
    return fetch(`${API}/resenias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resenia),
    });
  };

  export const deleteReseniaRequest = async (id: string) => {
    return fetch(`${API}/resenias/${id}`, {
        method: 'DELETE',
    });
};