import React from "react";
import AddExpenseForm from "./AddExpenseForm";

export default function AddExpenseModal(props) {
    // hooks

    // TODO set up modal behavior

    return <>
        <div className={`border-2 rounded-2xl border-stone-700 p-8  xxs:w-[80vw] xs:w-[50vw] sm:w-[60vw] lg:w-[722px]`}>
            <div className="flex flex-col">
                <button className="self-end">X</button>
                {/* form container */}
                <AddExpenseForm />
            </div>
        </div>
    </>
}