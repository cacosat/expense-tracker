import { useState, useEffect, useRef } from 'react'
import ExpenseCard from './components/ExpenseCard'
import Header from './components/Header'
import AddExpenseCard from './components/AddExpenseCard'
import Graph from './components/Graph'
import History from './components/History'
import ExpenseCardGenerator from './components/ExpenseCardGenerator'
import './App.css'

function App() {
  // null reference to gridRef, later on to be referenced in the gird element
  const gridContainerRef = useRef(null);

  // useState to keep track of the width
  const [gridWidth, setGridWidth] = useState(0);

  // useEffect hook to update the state on first render
  useEffect(() => {
    // check if ref is set, then returns width if true or 0 if false
    // dependencies === [] tell react to not depend on anything so it runs only at render 
    setGridWidth(gridContainerRef.current ? gridContainerRef.current.offsetWidth : 0);
  }, []);

  return <>
  <div className='flex flex-col xl:mx-30 gap-12'>
    <Header width={gridWidth} totalExpense='$2.157.020' iconLocation="./assets/plus-circle.svg" />
    
    <div className='flex justify-center'>
      <div ref={gridContainerRef} className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <ExpenseCardGenerator />
        <AddExpenseCard />
      </div>
    </div>

    <div className='flex justify-center'>
      <Graph width={gridWidth} />
    </div>
    <div className='flex justify-center'>
      <History width={gridWidth} />
    </div>
  </div>
  </>
};

export default App


