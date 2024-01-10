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

  
    return <>
    <div className={`flex flex-col gap-8 mb-8 xxs:w-[90vw] xs:w-[60vw] sm:w-[70vw] lg:w-[752px]`}>
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
                <th className="hidden md:table-cell">
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
                  <td className="p-2 min-w-[100px]">{expense.expense_date}</td>
                  <td className="p-2 ">{expense.amount}</td>
                  <td className="p-2 ">{expense.category_name}</td>
                  <td className="p-2 hidden md:table-cell w-[250px]">{expense.description}</td>
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