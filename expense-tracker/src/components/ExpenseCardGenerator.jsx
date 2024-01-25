import React, { useEffect, useState } from "react";
import TrashIcon from "../assets/trash.svg"

function ExpenseCardGenerator(props) {
    // useState
    const [useExpenses, setExpenses] = useState([]); // useState to keep track of API data (expenses), useExpenses is array of objects

    // useEffect
    useEffect(() => { // useEffect let's you handle connection from component to external system
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
    
    // functions
    const expensesByCategory = (expenses) => {
      // TODO: reduce to single for loop
      let result = {};

      let categories = []; // contains all category names
      expenses.forEach((expense) => {
        if (!categories.includes(expense.category_name)) {
          categories.push(expense.category_name);
          result[expense.category_name] = []; // adding {category_name : []} to result
        }
      });

      expenses.forEach((expense) => {
        if (categories.includes(expense.category_name)) {
          result[expense.category_name].push(expense);
        }
      });

      return [result, categories]; // result of type {category_name: [{expense1}, {expense 2}, {expenseN}],}
    }

    let [expensesByCat, categories] = expensesByCategory(useExpenses);
  
    return <>

    {/* 
      TODO: 
      
      1.make each card a button (maybe use global state) so that when
        one is closed, the graph and history relate only to that categroy
      2.make it so there are a fixed num of cards visible (6), but with a 'View more' button to expand
    */}
    
    {categories.map((category, index) => {

      return <React.Fragment key={index}>
      <div className="active:invert flex flex-col justify-end gap-2 lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700 hover:bg-stone-950">
        {/* Contenedor card */}
        <div className="flex justify-between  xs:text-lg text-sm font-bold ">
          {/* Ej.: Alojamiento */}
          <img src={TrashIcon} alt="" className=" mr-4 opacity-25 hover:opacity-100" />
          <div className={category === null ? '' : (category.length >= 12 ? 'break-all' : 'break-words')}>
            {category} 
          </div>
        </div>
        <div className="flex flex-col gap-4">
        {/* contenedor precio + historial */}
          <div className="flex self-end text-3xl font-bold">
              {/* Ej.: $100000 */}
              {/* Last amount registered for each category */}
              {/* TODO could modify to show category total */}
              {expensesByCat[category][expensesByCat[category].length-1].amount}              
          </div>
          <div className="flex justify-between text-sm text-stone-500 max-sm:hidden">
              <div>
                {/* Ej.: 25 de dic. */}
                {expensesByCat[category].length <= 1 ? '-' : expensesByCat[category][expensesByCat[category].length-2].expense_date}
              </div>
              <div>
                {/* Ej.: $9000 */}
                {expensesByCat[category].length <= 1 ? '-' : expensesByCat[category][expensesByCat[category].length-2].amount}
              </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    })}
    </>
}

export default ExpenseCardGenerator