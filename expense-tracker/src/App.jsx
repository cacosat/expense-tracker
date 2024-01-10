import { useState, useEffect } from 'react'
import ExpenseCard from './components/ExpenseCard'
import Header from './components/Header'
import AddExpenseCard from './components/AddExpenseCard'
import Graph from './components/Graph'
import History from './components/History'
import ExpenseCardGenerator from './components/ExpenseCardGenerator'
import AddExpenseModal from './components/AddExpenseModal'
import './App.css'

function App() {
  // hooks
  // custom hook for responsive width, gives back values based on window object resize
  // function setWidthFromWindow() {
  //   // useState for getting window.innerWidth (returns px including vertical scroll bar)
  //   // and useEffect for using setWidth when resizing via a function implemented with an
  //   // event listener on the window 'resize' event (fires when document view (window) is resized)

  //   const [width, setWidth] = useState(''); 

  //   useEffect(() => {
  //     function resize() {
  //       setWidth(window.innerWidth);
  //     }

  //     // event listener for resize event that triggers resize() and set useWidth with setWidth
  //     window.addEventListener('resize', resize());

  //     // returns function to do clean up and removes the listeners once the component is unmounted
  //     return () => removeEventListener('resize', resize());
  //   }, []);

  //   // return different widths based on screen sizes (breakpoints)
  //   if (width >= '1025'){
  //     return '752px';
  //   } else if (width >= '770') {
  //     return '612px';
  //   } else if (width >= '420') {
  //     return '402px';
  //   } else {
  //     return '310px';
  //   }

  // };

  // const appWidth = setWidthFromWindow();  

  return <>
  <div id='test' className='flex flex-col items-center'>
    <div className={`flex flex-col items-center gap-12 `}>
      <Header totalExpense='$2.157.020' iconLocation="./assets/plus-circle.svg" />
      
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <ExpenseCardGenerator />
          <AddExpenseCard />
        </div>
      </div>

      <div className='flex justify-center'>
        <Graph />
      </div>
      <div className='flex justify-center'>
        <History />
      </div>
    </div>
    <AddExpenseModal />
  </div>
  </>
};

export default App


