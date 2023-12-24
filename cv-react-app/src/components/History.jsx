import React from "react";
import ArrowUp from "../assets/arrow-up.svg"
import Prev from "../assets/chevron-down.svg"
import DoublePrev from "../assets/chevron-double-down.svg"
import Next from "../assets/chevron-up.svg"
import DoubleNext from "../assets/chevron-double-up.svg"

export default function History(props) {
    // hooks

    const expenses = [
      { id: 0, date: '20/12/2023', category: 'Comida', description: 'Descripción del gasto de la comida', amount: '$9000' },
      { id: 1, date: '23/12/2023', category: 'Alojamiento', description: 'Descripción del gasto de alojamiento', amount: '$90500' },
      { id: 2, date: '26/12/2023', category: 'Movilización', description: 'Descripción del gasto de movilización', amount: '$5300' },
      { id: 3, date: '27/12/2023', category: 'Comida', description: 'Descripción del gasto de comida', amount: '$11500' },
      { id: 4, date: '29/12/2023', category: 'Comida', description: 'Descripción del gasto de comida', amount: '$20500' },
      { id: 5, date: '31/12/2023', category: 'Alojamiento', description: 'Descripción del gasto de alojamiento', amount: '$156500' },
      { id: 6, date: '01/01/2023', category: 'Otros', description: 'Descripción del gasto de otro tipo', amount: '$86500' },
    ];
  
    return <>
    <div style={{width: `${props.width}px`}} className="flex flex-col gap-8 mb-8 ">
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
              {expenses.map((expense, index) => (
                <tr 
                  key={expense.id} 
                  className={`text-left ${index === expenses.length-1 ? '' : 'border-b-[1px]'} border-stone-700`}
                >
                  <td className="p-2 ">{expense.date}</td>
                  <td className="p-2 ">{expense.amount}</td>
                  <td className="p-2 ">{expense.category}</td>
                  <td className="p-2 hidden sm:table-cell">{expense.description}</td>
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