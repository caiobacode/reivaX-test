import React from 'react';
import { Table, UserOptions } from '../components';
import '../style/Home.css'

export default function Home() {
  return (
    <div className='home-div'>
      <UserOptions />
      <Table />
    </div>
  )
}
