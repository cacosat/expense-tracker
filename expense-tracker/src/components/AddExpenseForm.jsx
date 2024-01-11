import React from "react";

export default function AddExpenseForm() {


    async function postDataToServer(data) {
        // fetch for POST request
        try {

        } catch (error) {

        }
    }

    function handleSubmit(event) {
        const formData = new FormData(event.target); // Construct a set of key/value pairs of form fields and their values
        const data = Object.fromEntries(formData.entries()); // entries() return key/value pairs, and Object gives it JS obj functionality
    }


    return <>
        <form action="" className="flex flex-col gap-8">
            {/* Category selection */}
            <div className="flex flex-col gap-2">
                <label htmlFor=""></label>
                <select name="category_name" id="category">
                    {/* TODO fetch categories and map options to them */}
                    <option value=""></option>
                </select>
            </div>
            {/* Expense Date */}
            <div className="flex flex-col gap-2">
                <label htmlFor="expense_date" className="self-start">Expense Date</label>
                <input 
                    name="expense_date" 
                    type="date" 
                    className=" rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                />
            </div>
            {/* Amount */}
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="self-start"> Amount</label>
                <input 
                    name="amount" 
                    type="number" 
                    className="rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="self-start">Description</label>
                <input 
                    name="description" 
                    type="text" 
                    className="rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                />
            </div>
            {/* Buttons */}
            <div className="flex gap-4 self-end">
                <button type="submit" className="rounded-2xl p-2 px-6 border-2 border-stone-700 active:border-white active:bg-white active:text-black">Enviar</button>
            </div>
        </form>
    </>
} 