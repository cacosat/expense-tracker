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
  const [expandExpenseCards, setExpandExpenseCards] = useState(true);
  const toggleExpandExpenseCards = () => setExpandExpenseCards(prevState => !prevState); // prevState is arbitrary name for the "pending"/previous state accesible by the useState hook.
  const expenseCardsLimit = 5;

  const [numOfExpenseCards, setNumOfExpenseCards] = useState(0);

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const [isCategoryModalOpen, setIsExpenseCategroyOpen] = useState(false);
  const openCategoryModal = () => setIsExpenseCategroyOpen(true);
  const closeCategoryModal = () => setIsExpenseCategroyOpen(false);

  
  useEffect(() => {
    // for every change of isExpenseModalOpen || isCategoryModalOpen,
    // the scroll behavior updates to true or false accordingly. All
    // this handled through a useEffect (use component lifecycle) with 
    // dependencies of the modals so it triggers only on their change
    if (isExpenseModalOpen || isCategoryModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isExpenseModalOpen, isCategoryModalOpen]);

  useEffect(() => {
    // puts event listener on window for 'ESC' key to close modals, when component mounts
    // then it returns a cleanup function for the listener when component unmounts

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeCategoryModal();
        closeExpenseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {window.removeEventListener('keydown', handleKeyDown)}
  }, []);

  return <>
  <div id='test' className={`flex flex-col items-center ${isCategoryModalOpen || isExpenseModalOpen ? ' blur-sm' : ''}`}>
    <div className={`flex flex-col items-center gap-12 `}>
      <Header iconLocation="./assets/plus-circle.svg" onClick={openExpenseModal} />
      <div className='flex flex-col justify-center gap-2'>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mx-2 md:mx-16 `}>
          <ExpenseCardGenerator
            expandExpenseCards = {expandExpenseCards}
            expenseCardsLimit = {expenseCardsLimit}
            numOfExpenseCards = {numOfExpenseCards}
            setNumOfExpenseCards = {setNumOfExpenseCards}
          />
          <AddCategoryCard onClick={openCategoryModal} />
        </div>
        <button 
          className=' underline text-stone-600 self-end mx-2 md:mx-16 '
          onClick={toggleExpandExpenseCards}
        >
          {numOfExpenseCards > expenseCardsLimit ? (expandExpenseCards ? 'Ver más' : 'Cerrar') : ''}
        </button>
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


