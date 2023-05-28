import React, { useEffect } from 'react'
import Table from '../components/Table'
import { getLocalStorage } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = getLocalStorage('token', false)
    // se já não existir um token no localstorage, a aplicação redireciona para a página de login
    if (!token) { // falta validar se o token é válido
      navigate('/login')
    }
  })

  return (
    <div>
      <Table />
    </div>
  )
}
