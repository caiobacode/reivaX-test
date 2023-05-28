import React, { useEffect } from 'react';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, setClearTable } from '../redux';
import { getLocalStorage, decodeToken } from '../utils';
import PageSelector from '../components/PageSelector';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getLocalStorage('token', false);
  
  useEffect(() => {
    const tokenDecoded = decodeToken(token);
    // se não existir um token no localstorage, a aplicação redireciona para a página de login
    if (!tokenDecoded) {
      navigate('/login')
    } else {
      /* se já existir um token no local storage, a aplicação 
      decodifica o token e conecta ao servidor socket.io */
      const { sub } = tokenDecoded;
      dispatch(loginUser({ username: sub, password: sub }));
    }
  }, [token, dispatch, navigate]);

  return (
    <div>
      <div>
        <button
          type='button'
          onClick={() => dispatch(setClearTable(true))}
        >
          Clear
        </button>
        <PageSelector />
      </div>
      <Table />
    </div>
  )
}
