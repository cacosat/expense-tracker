import React from "react";
import AddExpenseForm from "./AddExpenseForm";

export default function AddExpenseModal(props) {
    // hooks

    // TODO set up modal behavior
    if (!props.isOpen) {
        // don't return anything if modal isn't open.
        return null;
    }

    return <>
        <div className={`fixed bg-black top-9 border-2 rounded-2xl border-stone-700 p-8  xxs:w-[80vw] xs:w-[50vw] sm:w-[60vw] lg:w-[722px] mx-auto left-0 right-0`}>
            <div className="flex flex-col">
                <button className="self-end" onClick={props.onClose}>X</button>
                {/* form container */}
                {props.children}
            </div>
        </div>
    </>
}