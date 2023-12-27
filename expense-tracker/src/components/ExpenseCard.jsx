import React from "react";

function ExpenseCard(props) {
    // hooks
  
    return <>
    <div className="flex flex-col gap-2 lg:w-[240px] lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700">
      {/* Contenedor card */}
      <div className="text-lg max-sm:text-base font-bold self-end">
        {props.category} {/* Ej.: Alojamiento */}
      </div>
      <div className="flex flex-col gap-4">
      {/* contenedor precio + historial */}
        <div className="flex self-end text-3xl max-sm:text-2xl font-bold">
            {props.expense} {/* Ej.: $100000 */}
        </div>
        <div className="flex justify-between text-sm text-stone-500 max-sm:hidden">
            <div>
            {props.date} {/* Ej.: 25 de dic. */}
            </div>
            <div>
            {props.dateExpense} {/* Ej.: $9000 */}
            </div>
        </div>
      </div>
    </div>
    </>
}

export default ExpenseCard