import React, { useEffect, useState } from "react";

function ExpenseCardGenerator(props) {
    // useState
    const[useExpenses, setExpenses] = useState([]); // useState to keep track of API data (expenses), useExpenses is array of objects
    
    // functions
    const extractObjectByAttribute = (array, attribute) => {
      let filteredArray = array.filter((obj) => obj.category_id === attribute);
      return filteredArray;
    }
  
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
  
    
    return <>
    {useExpenses.map((expense, index) => {
      let categoryExpenses = extractObjectByAttribute(useExpenses, expense.category_id);

      return <>
      <div key={index} className="flex flex-col gap-2 lg:w-[240px] lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700">
        {/* Contenedor card */}
        <div className="text-lg max-sm:text-base font-bold self-end">
          {expense.category_name} {/* Ej.: Alojamiento */}
        </div>
        <div className="flex flex-col gap-4">
        {/* contenedor precio + historial */}
          <div className="flex self-end text-3xl max-sm:text-2xl font-bold">
              {expense.amount} {/* Ej.: $100000 */}
          </div>
          <div className="flex justify-between text-sm text-stone-500 max-sm:hidden">
              <div>
                {categoryExpenses.length <= 1 || index === 0 ? '-': categoryExpenses[categoryExpenses.length-1].expense_date} {/* Ej.: 25 de dic. */}
              </div>
              <div>
                {categoryExpenses.length <= 1 || index === 0 ? '-' : categoryExpenses[categoryExpenses.length-1].amount} {/* Ej.: $9000 */}
              </div>
          </div>
        </div>
      </div>
      </>
    })}
    </>
}

export default ExpenseCardGenerator