import React from "react";

function ExpenseCard(props) {
    // hooks
  
    return <>
    <div className="flex flex-col">
      {/* Contenedor card */}
      <div>
        {props.category} {/* Ej.: Alojamiento */}
      </div>
      <div>
        {props.expense} {/* Ej.: $100000 */}
      </div>
      <div className="flex">
        <div>
          {props.date}
        </div>
        <div>
          {props.dateExpense}
        </div>
      </div>
    </div>
    </>
}

export default ExpenseCard