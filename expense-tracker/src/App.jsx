import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import AddCategoryCard from './components/AddCategoryCard'
import Graph from './components/Graph'
import History from './components/History'
import ExpenseCardGenerator from './components/ExpenseCardGenerator'
import AddExpenseModal from './components/AddExpenseModal'
import './App.css'
import AddExpenseForm from './components/AddExpenseForm'
import AddCategoryModal from './components/AddCategoryModal'

function App() {
  // hooks
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const [isCategoryModalOpen, setIsExpenseCategroyOpen] = useState(false);
  const openCategoryModal = () => setIsExpenseCategroyOpen(true);
  const closeCategoryModal = () => setIsExpenseCategroyOpen(false);

  return <>
  <div id='test' className={`flex flex-col items-center `}>
    <div className={`flex flex-col items-center gap-12 ${isExpenseModalOpen ? 'blur-sm' : ''}`}>
      <Header totalExpense='$2.157.020' iconLocation="./assets/plus-circle.svg" onClick={openExpenseModal} />
      <AddExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal}>
        <AddExpenseForm />
      </AddExpenseModal>
      
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <ExpenseCardGenerator />
          <AddCategoryCard onClick={openCategoryModal} />
          <AddCategoryModal onClose={closeCategoryModal} isOpen={isCategoryModalOpen} />
        </div>
      </div>

      <div className='flex justify-center'>
        <Graph />
      </div>
      <div className='flex justify-center'>
        <History />
      </div>
    </div>
  </div>
  </>
};

export default App


