import React from "react";
import AddExpenseForm from "./AddExpenseForm";

export default function AddExpenseModal(props) {
    // hooks

    return <>
        <div className={`border-2 rounded-2xl border-stone-700 p-8 w-[${props.width}]`}>
            <div className="flex flex-col">
                <button className="self-end">X</button>
                {/* form container */}
                <AddExpenseForm />
                <div className="flex gap-4 self-end p-4">
                    <button>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </div>
        </div>
    </>
}