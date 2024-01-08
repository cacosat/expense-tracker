import React from "react";
import {useState, useEffect} from "react"
import ArrowUp from "../assets/arrow-up.svg"
import Prev from "../assets/chevron-down.svg"
import DoublePrev from "../assets/chevron-double-down.svg"
import Next from "../assets/chevron-up.svg"
import DoubleNext from "../assets/chevron-double-up.svg"

export default function History(props) {
    // hooks
    // useState to keep track of expenses
    let [useExpenses, setExpenses] = useState([]); // useExpenses is an array of expenses object

    // useEffect to fetch expenses
    useEffect(() => {
      async function fetchExpenses() {
        try {
          const response = await fetch('http://localhost:4000/api/expenses');
          const expenses = await response.json();
          setExpenses(expenses);
        } catch (error) {
          console.error({'Failed expenses fetch for history': error});
        }
      }
      fetchExpenses();
    }, []);

    // const expenses = [
    //   { id: 0, date: '20/12/2023', category: 'Comida', description: 'Descripción del gasto de la comida', amount: '$9000' },
    //   { id: 1, date: '23/12/2023', category: 'Alojamiento', description: 'Descripción del gasto de alojamiento', amount: '$90500' },
    //   { id: 2, date: '26/12/2023', category: 'Movilización', description: 'Descripción del gasto de movilización', amount: '$5300' },
    //   { id: 3, date: '27/12/2023', category: 'Comida', description: 'Descripción del gasto de comida', amount: '$11500' },
    //   { id: 4, date: '29/12/2023', category: 'Comida', description: 'Descripción del gasto de comida', amount: '$20500' },
    //   { id: 5, date: '31/12/2023', category: 'Alojamiento', description: 'Descripción del gasto de alojamiento', amount: '$156500' },
    //   { id: 6, date: '01/01/2023', category: 'Otros', description: 'Descripción del gasto de otro tipo', amount: '$86500' },
    // ];

    // {"id":1,"category_id":1,"category_name":"Groceries","description":"Bought vegetables","expense_date":"2021-09-05","amount":45,"date_created":"2024-01-05 02:06:46"}
    // {"id":2,"category_id":2,"category_name":"Transportation","description":"Monthly bus pass","expense_date":"2021-09-06","amount":60,"date_created":"2024-01-05 02:07:08"}
    // {"id":3,"category_id":3,"category_name":"Utilities","description":"Electricity bill","expense_date":"2021-09-07","amount":75,"date_created":"2024-01-05 02:07:10"}
    // {"id":4,"category_id":4,"category_name":"Dining Out","description":"Dinner at a diner","expense_date":"2021-09-08","amount":30,"date_created":"2024-01-05 02:07:11"}
    // {"id":5,"category_id":1,"category_name":"Groceries","description":"Bought vegetables","expense_date":"2021-09-05","amount":49,"date_created":"2024-01-05 02:09:06"}
    // {"id":6,"category_id":2,"category_name":"Transportation","description":"Bike pass","expense_date":"2021-10-06","amount":10,"date_created":"2024-01-05 02:11:12"}
    // {"id":7,"category_id":3,"category_name":"Utilities","description":"Electricity bill","expense_date":"2021-09-09","amount":175,"date_created":"2024-01-05 02:11:35"}
    // {"id":8,"category_id":1,"category_name":"Groceries","description":"Bought vegetables","expense_date":"2021-09-05","amount":49,"date_created":"2024-01-05 02:11:47"}
    // {"id":9,"category_id":4,"category_name":"Dining Out","description":"Pizza with friends","expense_date":"2021-09-15","amount":36,"date_created":"2024-01-06 23:26:31"}
    // {"id":10,"category_id":5,"category_name":"Other","description":"Miscellaneous","expense_date":"2021-09-15","amount":156,"date_created":"2024-01-06 23:32:16"}
  
    return <>
    <div className={`flex flex-col gap-8 mb-8 w-[${props.width}]`}>
      <div className='text-2xl text-start'>
        Historial
      </div>
      <section className="flex flex-col justify-center gap-4 sm:p-8 sm:border-2 sm:border-stone-700 sm:rounded-2xl">
        {/* Table + buttons container */}
        <section className="border-2 rounded-2xl border-stone-700 overflow-hidden">
          {/* Table container and border */}
          <table className="min-w-full">
            <thead className="text-stone-500 border-b-[1px] border-stone-700">
              <tr>
                <th>
                  <div className="flex gap-2 p-2">
                    <p>Fecha</p>
                    <img src={ArrowUp} alt="" />
                  </div>
                </th>
                <th>
                  <div className="flex gap-2 p-2">
                    <p>Monto</p>
                    <img src={ArrowUp} alt="" />
                  </div>
                </th>
                <th>
                  <div className="flex gap-2 p-2">
                    <p>Categoría</p>
                    <img src={ArrowUp} alt="" />
                  </div>
                </th>
                <th className="hidden sm:table-cell">
                  <div className="flex gap-2 p-2">
                    <p>Descripción</p>
                    <img src={ArrowUp} alt="" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {useExpenses.map((expense, index) => (
                <tr 
                  key={expense.id} 
                  className={`text-left ${index === useExpenses.length-1 ? '' : 'border-b-[1px]'} border-stone-700`}
                >
                  <td className="p-2 ">{expense.expense_date}</td>
                  <td className="p-2 ">{expense.amount}</td>
                  <td className="p-2 ">{expense.category_name}</td>
                  <td className="p-2 hidden sm:table-cell max-w-[250px]">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="flex gap-8 justify-end items-center">
          <p>1 de 10</p>
          <div className="flex gap-4">
            {/* buttons */}
            <button className="p-2 border-2 border-stone-700 rounded-md">
              <img src={DoublePrev} alt="nav button previous" />
            </button>
            <button className="p-2 border-2 border-stone-700 rounded-md">
              <img src={Prev} alt="nav button previous" />
            </button>
            <button className="p-2 border-2 border-stone-700 rounded-md">
              <img src={Next} alt="nav button next" />
            </button>
            <button className="p-2 border-2 border-stone-700 rounded-md">
              <img src={DoubleNext} alt="nav button next" />
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
}