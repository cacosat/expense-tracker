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

  // for every change of isExpenseModalOpen || isCategoryModalOpen,
  // the scroll behavior updates to true or false accordingly. All
  // this handled through a useEffect (use component lifecycle) with 
  // dependencies of the modals so it triggers only on their change

  useEffect(() => {
    if (isExpenseModalOpen || isCategoryModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isExpenseModalOpen, isCategoryModalOpen]);

  return <>
  <div id='test' className={`flex flex-col items-center ${isCategoryModalOpen || isExpenseModalOpen ? ' blur-sm' : ''}`}>
    <div className={`flex flex-col items-center gap-12 `}>
      <Header totalExpense='$2.157.020' iconLocation="./assets/plus-circle.svg" onClick={openExpenseModal} />
      <div className='flex justify-center'>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mx-2 md:mx-16 `}>
          <ExpenseCardGenerator />
          <AddCategoryCard onClick={openCategoryModal} />
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
  <AddExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} >
    <AddExpenseForm />
  </AddExpenseModal>
  <AddCategoryModal className={isCategoryModalOpen ? ' blur-none' : ''} onClose={closeCategoryModal} isOpen={isCategoryModalOpen} />
  </>
};

export default App


