import React, { useEffect, useState } from "react";

function ExpenseCardGenerator(props) {
    // useState
    const [useExpenses, setExpenses] = useState([]); // useState to keep track of API data (expenses), useExpenses is array of objects
    // const [useCategories, setCategories]= useState([]); // useState to keep track of categories available

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

    // useEffect(() => {
    //   async function fetchCategories() {
    //     try {
    //       const response = await fetch('http://localhost:4000/api/categories');
    //       const categories = await response.json();
    //       setCategories(categories);
    //     } catch (error) {
    //       console.error({'failed categories fetch': error});
    //     }
    //   }
    //   fetchCategories();
    // }, []);  
    
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
      TODO: make each card a button (maybe use global state) so that when
        one is closed, the graph and history relate only to that categroy
    */}
    
    {categories.map((category, index) => {

      return <React.Fragment key={index}>
      <div className="active:invert flex flex-col justify-end gap-2 lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700 hover:bg-stone-950">
        {/* Contenedor card */}
        <div className="xs:text-lg text-sm font-bold self-end">
          {/* Ej.: Alojamiento */}
          {/* {expense.category_name}  */}
          {category}
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