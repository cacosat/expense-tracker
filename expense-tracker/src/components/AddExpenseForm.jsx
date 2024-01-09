import React from "react";

export default function AddExpenseForm() {

    return <>
        <form action="" className="flex flex-col gap-8">
            {/* Expense Date */}
            <div className="flex flex-col">
                <label htmlFor="expense_date">Expense Date</label>
                <input name="expense_date" type="date" className="text-black" />
            </div>
            {/* Amount */}
            <div className="flex flex-col">
                <label htmlFor="amount"> Amount</label>
                <input name="amount" type="number" className="text-black" />
            </div>
            {/* Description */}
            <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <input name="description" type="text" className="text-black" />
            </div>
        </form>
    </>
} 