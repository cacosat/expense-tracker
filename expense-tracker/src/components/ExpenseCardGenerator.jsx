import React, { useEffect, useState } from "react";
import TrashIcon from "../assets/trash.svg"
import { text } from "body-parser";

function ExpenseCardGenerator(props) {
    // fetching categories
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      async function fetchCategories() {
        const response = await fetch('http://localhost:4000/api/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);
      }
      fetchCategories();
    }, [])

    // Fetching expenses
    const [expenses, setExpenses] = useState([]); // useState to keep track of API data (expenses), expense is array of objects

    // useEffect let's you handle connection from component to external system
    useEffect(() => { 
      async function fetchExpenses() {
        try {
          const response = await fetch('http://localhost:4000/api/expenses');
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
      // 1. Generate resulting array with categories and empty arrays for their expenses: [{category_name: []}]
      let result = []; 
      let categoriesNameList = [];
      categories.forEach((category) => {
        const categoryName = category.name;
        categoriesNameList.push(categoryName)
        const categoryObj = {[categoryName]: expenses.filter((expense) => expense.category_name === categoryName)};
        result.push(categoryObj);
        console.log(categoryObj)
      });

      return [result, categoriesNameList];
    }

    async function deleteCategory(id, name) {
      try {
        const response = await fetch(`http://localhost:4000/api/categories/${id}`, {
          method: 'DELETE', 
        });
        if (!response.ok) {
          throw new Error(`Error in delete req: ${response.statusText}`)
        } else {
          alert(`Eliminado correctamente: Categoría ${name} (id: ${id})`);
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
      
      let category = categories.find((category) => categoryName === category.name); // finds corresponding category
      if (category != undefined) {
        let categoryId = category.id;
        deleteCategory(categoryId, categoryName); 
      }
    }

    let [expensesByCat, categoriesNames] = expensesByCategory(expenses, categories);
  
    return <>

    {/* 
      TODO: 
      1. DELETE request when clicking trashcan (deletes category and expenses) 
      2. make it so there are a fixed num of cards visible (6), but with a 'View more' button to expand
      3. make each card a button (maybe use global state) so that when
        one is closed, the graph and history relate only to that categroy
    */}
    
    {categoriesNames.map((category, index) => {

      return <React.Fragment key={index}>
      <div 
        onClick={handleCardClick} 
        id={category} 
        className="active:invert flex flex-col justify-between gap-2 lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700 hover:bg-stone-950"
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
          <div className={`flex self-end ${expensesByCat[index][category].length <= 1 ? 'text-xl text-stone-600' : 'text-3xl font-bold'}`}>
              {/* Ej.: $100000 */}
              {/* Last amount registered for each category */}
              {/* TODO could modify to show category total */}
              {expensesByCat[index][category].length === 0 ? 'No expenses' : expensesByCat[index][category][expensesByCat[index][category].length-1].amount} {/* 1st, access object, then array stored as category, and then index (last/most recent) of said array */}
          </div>
          <div className="flex justify-between text-sm text-stone-500 max-sm:hidden">
              <div>
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