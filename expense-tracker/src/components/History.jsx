import React from "react";
import {useState, useEffect} from "react"
import ArrowUp from "../assets/arrow-up.svg"
import Prev from "../assets/chevron-down.svg"
import DoublePrev from "../assets/chevron-double-down.svg"
import Next from "../assets/chevron-up.svg"
import DoubleNext from "../assets/chevron-double-up.svg"
import infoTooltip from '../assets/info.svg'

export default function History(props) {
    // hooks
    // useState to keep track of expenses
    const [expenses, setExpenses] = useState([]); // expenses is an array of expenses object
    useEffect(() => {
      // useEffect to fetch expenses
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

    const [categories, setCategories] = useState([]);
    useEffect(() => {
      async function fetchCategories() {
        try {
          const response = await fetch('http://localhost:4000/api/categories');
          const categoriesData = await response.json();
          setCategories(categoriesData);
        } catch (e) {
          console.error({'error fetching categories from History component': e})
        }
      }
      fetchCategories();
    }, []);
    
    // --------------
    // Functions
    // --------------

    function retrieveCategoryName(expense, categories) {
      const expenseCategory = categories.filter((category) => category.id === expense.category_id); // returns array with 1 obj
      return expenseCategory[0].name;
    }


    return <>
    <div className={`flex flex-col gap-8 mb-8 xxs:w-[90vw] xs:w-[60vw] sm:w-[70vw] lg:w-[752px]`}>
      <div className='flex justify-between text-2xl text-start'>
        Historial
        <img src={infoTooltip} alt="info icon"  />
      </div>
      <section className="flex flex-col justify-center gap-4 sm:p-8 sm:border-2 sm:border-stone-700 sm:rounded-2xl">
        {/* Table + buttons container */}
        <section className="border-2 rounded-2xl border-stone-700 overflow-hidden">
          {/* Table container and border */}
          
          {/* 
            TODO make list render in pages format with 10 items per page
            and make the nav buttons functional for it:
            <: atras, -1
            >: adelante, +1
          */}
          <table className="min-w-full">
            <thead className="text-stone-500 border-b-[1px] border-stone-700">
              <tr>
                <th>
                  <div className="flex gap-2 p-2">
                    <p>Fecha</p>
                    {/* <img src={ArrowUp} alt="" /> TODO: Make arrow sort on click */}
                  </div>
                </th>
                <th>
                  <div className="flex gap-2 p-2">
                    <p>Monto</p>
                    {/* <img src={ArrowUp} alt="" /> TODO: Make arrow sort on click */}
                  </div>
                </th>
                <th>
                  <div className="flex gap-2 p-2">
                    <p>Categoría</p>
                    {/* <img src={ArrowUp} alt="" /> TODO: Make arrow sort on click */}
                  </div>
                </th>
                <th className="hidden md:table-cell">
                  <div className="flex gap-2 p-2">
                    <p>Descripción</p>
                    {/* <img src={ArrowUp} alt="" /> TODO: Make arrow sort on click */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr 
                  key={expense.id} 
                  className={`text-left ${index === expenses.length-1 ? '' : 'border-b-[1px]'} border-stone-700 hover:bg-stone-950`}
                >
                  <td className="p-2 min-w-[100px]">{expense.expense_date}</td>
                  <td className="p-2 ">{expense.amount}</td>
                  <td className="p-2 ">{retrieveCategoryName(expense, categories)}</td>
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
            <button className="active:invert p-2 border-2 border-stone-700 rounded-md hover:bg-stone-950">
              <img src={DoublePrev} alt="nav button previous" />
            </button>
            <button className="active:invert p-2 border-2 border-stone-700 rounded-md hover:bg-stone-950">
              <img src={Prev} alt="nav button previous" />
            </button>
            <button className="active:invert p-2 border-2 border-stone-700 rounded-md hover:bg-stone-950">
              <img src={Next} alt="nav button next" />
            </button>
            <button className="active:invert p-2 border-2 border-stone-700 rounded-md hover:bg-stone-950">
              <img src={DoubleNext} alt="nav button next" />
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
}