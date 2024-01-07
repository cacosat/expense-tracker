import { useState, useEffect } from 'react'
import ExpenseCard from './components/ExpenseCard'
import Header from './components/Header'
import AddExpenseCard from './components/AddExpenseCard'
import Graph from './components/Graph'
import History from './components/History'
import ExpenseCardGenerator from './components/ExpenseCardGenerator'
import './App.css'

function App() {


  return <>
  <div id='test' className='flex flex-col items-center gap-12 max-w-4xl'>
    <Header width='752px' totalExpense='$2.157.020' iconLocation="./assets/plus-circle.svg" />
    
    <div className='flex justify-center'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <ExpenseCardGenerator />
        <AddExpenseCard />
      </div>
    </div>

    <div className='flex justify-center'>
      <Graph width='752px' />
    </div>
    <div className='flex justify-center'>
      <History width='752px' />
    </div>
  </div>
  </>
};

export default App


