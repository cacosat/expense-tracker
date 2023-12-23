import { useState, useEffect, useRef } from 'react'
import ExpenseCard from './components/ExpenseCard'
import Header from './components/Header'
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
  <div className='flex flex-col xl:mx-30'>
    <Header width={gridWidth} totalExpense='$560.000' iconLocation="./assets/plus-circle.svg" />
    <div className='flex justify-center'>
      <div ref={gridContainerRef} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {/* Values [category, expense, date, dateExpenses] should be dynamic */}
        <ExpenseCard category="Alojamiento" expense="$368990" date="20 de dic." dateExpense="$89000"/>
        <ExpenseCard category="Comida" expense="$10000" date="25 de dic." dateExpense="$9000"/>
        <ExpenseCard category="Movilización" expense="$105620" date="28 de dic." dateExpense="$81025"/>
        <ExpenseCard category="Entretención" expense="$262500" date="31 de dic." dateExpense="$65000"/>
        <ExpenseCard category="Otros" expense="$89000" date="02 de ene." dateExpense="$9000"/>
      </div>
    </div>
  </div>
  </>
};

export default App


