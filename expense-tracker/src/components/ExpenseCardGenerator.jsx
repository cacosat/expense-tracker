import React, { useEffect, useState } from "react";
import useTotalExpensesByCategory from "../hooks/useTotalExpensesByCategory"; // custom hook
import TrashIcon from "../assets/trash.svg"
// import { text } from "body-parser"; // throws error of "Module externalized for browser compatibility"

function ExpenseCardGenerator(props) {
  // custom hook
  const totalExpensesByCategory = useTotalExpensesByCategory()
  const totalExpenses = totalExpensesByCategory();

  // fetching categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // useEffect let's you handle connection from component to external system
    async function fetchCategories() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const categoriesData = await response.json();
      setCategories(categoriesData);
    }
    fetchCategories();
  }, [])

  // Fetching expenses
  const [expenses, setExpenses] = useState([]); // useState to keep track of API data (expenses), expense is array of objects

  useEffect(() => { 
    async function fetchExpenses() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`);
        const expenses = await response.json();
        setExpenses(expenses);
      } catch (error) {
        console.error({'Failed fetch': error});
      }
    }
    fetchExpenses();
  }, []);
  
  // ----------------------------------------------------------------
  // Functions
  // ----------------------------------------------------------------

  // sort expenses by category with resulting format of: 
  // [{category_name: [{expense1}, {expense 2}, {expenseN}]}, {category_name: ...}]
  const expensesByCategory = (expenses, categories) => {
    let result = []; 
    let categoriesNameList = [];
    categories.forEach((category) => {
      const categoryName = category.name;
      categoriesNameList.push(categoryName)
      const categoryObj = {[categoryName]: expenses.filter((expense) => expense.category_id === category.id)};
      result.push(categoryObj);
    });

    return [result, categoriesNameList];
  }

  async function deleteCategory(id, name) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        method: 'DELETE', 
      });
      if (!response.ok) {
        throw new Error(`Error in delete req: ${response.statusText}`)
      } else {
        // alert(`Eliminado correctamente: Categoría ${name} (id: ${id})`);
      }
    } catch (e) {
      console.error({'error on deleteCategory DEL request': e})
    }
  }

  function handleCardClick() {
    alert("Category selection under construction.");
  }

  function handleDelClick(categoryName, categories, e) {
    e.stopPropagation(); // stops click from going up (bubbling up) the DOM tree
    window.location.reload();
    
    let category = categories.find((category) => categoryName === category.name); // finds corresponding category by name
    if (category != undefined) {
      let categoryId = category.id;
      deleteCategory(categoryId, categoryName); 
    }
  }

  let [expensesByCat, categoriesNames] = expensesByCategory(expenses, categories);

  useEffect(() => {
    props.setNumOfExpenseCards(categoriesNames.length);
  }, [categories.length])

  {/* 
    TODO: 
    - [x] DELETE request when clicking trashcan (deletes category and expenses) 
    - [ ] make it so there are a fixed num of cards visible (6), but with a 'View more' button to expand
    - [ ] make each card a button (maybe use global state) so that when one is closed, the graph and history relate only to that categroy
  */}

  return <>    
  {categoriesNames.map((category, index) => {
    const categoryTotal = totalExpenses.find(total => total[0] === category); // returns array [totalMatched, totalValue]

    return <React.Fragment key={index}>
    <div 
      onClick={handleCardClick} 
      id={category} 
      className={`active:invert ${index + 1 > props.expenseCardsLimit ? (props.expandExpenseCards ? 'hidden' : 'flex flex-col') : ''} justify-between gap-2 lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700 hover:bg-stone-950`}
    >
      {/* Contenedor card */}
      <div className="flex justify-between  xs:text-lg text-sm font-bold ">
        {/* Ej.: Alojamiento */}
        <img 
          src={TrashIcon} 
          alt="delete icon" 
          onClick={(e) => handleDelClick(category, categories, e)} //event handlers automatically pass event, for more args you need arrow function
          className=" mr-4 opacity-25 hover:opacity-100 cursor-pointer" 
        />
        <div className={category === null ? '' : (category.length >= 12 ? 'break-all' : 'break-words')}>
          {category} 
        </div>
      </div>
      <div className="flex flex-col gap-4">
      {/* contenedor precio + historial */}
        <div className={`flex self-end text-3xl font-bold`}>
            {/* Ej.: $100000 */}
            {/* Last amount registered for each category */}
            {/* {expensesByCat[index][category].length === 0 ? 'No expenses' : expensesByCat[index][category][expensesByCat[index][category].length-1].amount} 1st, access object, then array stored as category, and then index (last/most recent) of said array */}
            {/* modified to show category total */}
            {categoryTotal[1]}
        </div>
        <div className="flex justify-between text-sm text-stone-500 max-sm:hidden">
            <div>
              {/* TODO proper sorting by date added */}
              {/* Ej.: 25 de dic. */}
              {expensesByCat[index][category].length <= 1 ? '-' : expensesByCat[index][category][expensesByCat[index][category].length-2].expense_date}
            </div>
            <div>
              {/* Ej.: $9000 */}
              {expensesByCat[index][category].length <= 1 ? '-' : expensesByCat[index][category][expensesByCat[index][category] .length-2].amount}
            </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  })}
  </>
}

export default ExpenseCardGenerator