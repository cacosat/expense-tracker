import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import AddExpenseCard from './components/AddExpenseCard'
import Graph from './components/Graph'
import History from './components/History'
import ExpenseCardGenerator from './components/ExpenseCardGenerator'
import AddExpenseModal from './components/AddExpenseModal'
import './App.css'
import AddExpenseForm from './components/AddExpenseForm'

function App() {
  // hooks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return <>
  <div id='test' className={`flex flex-col items-center `}>
    <div className={`flex flex-col items-center gap-12 ${isModalOpen ? 'blur-sm' : ''}`}>
      <Header totalExpense='$2.157.020' iconLocation="./assets/plus-circle.svg" onClick={openModal} />
      
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <ExpenseCardGenerator />
          <AddExpenseCard onClick={onClick} />
        </div>
      </div>

      <div className='flex justify-center'>
        <Graph />
      </div>
      <div className='flex justify-center'>
        <History />
      </div>
    </div>
    <AddExpenseModal isOpen={isModalOpen} onClose={closeModal}>
      <AddExpenseForm />
    </AddExpenseModal>
  </div>
  </>
};

export default App


