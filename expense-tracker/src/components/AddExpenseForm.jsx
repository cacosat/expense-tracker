import React, { useState, useEffect } from "react";

export default function AddExpenseForm() {

    // Fetch categories to later map onto dropdown options
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://localhost:4000/api/categories');
                const categories = await response.json();
                setCategories(categories);
            } catch (error) {
                console.error({'Failed to fetch categories within AddExpenseForm': error});
            }
        }
        fetchCategories();
    }, []);

    async function postDataToServer(data) {
        // fetch for POST request
        try {
            const response = await fetch('http://localhost:4000/api/expenses', {
                method: "POST", 
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(`HTTP POST resquest error: ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error({'error in POST req': error})
        }
    }

    function handleSubmit(event) {
        const formData = new FormData(event.target); // Construct a set of key/value pairs of form fields and their values
        let data = Object.fromEntries(formData.entries()); // entries() return key/value pairs, and Object gives it JS obj functionality
        
        event.preventDefault(); // prevents refresh of the page

        // add category_name to data payload by:
        // first finding the category that is being sent
        const categorySent = categories.find((category) => {
            return category.id.toString() === data.category_id // arrow func with {} needs explicit return
        });
        // second adding the name of the category to the data object
        data = {...data, category_name: categorySent.name}
        
        postDataToServer(data);
    }


    return <>
        <form action="" className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Category selection */}
            <div className="flex flex-col gap-2">
                <label htmlFor="category_id" className="self-start">Category</label>
                <select name="category_id" 
                        id="category_id" 
                        className="rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                >
                    {/* TODO fetch categories and map options to them */}
                    {categories.map((category, index) => {
                        return <option value={category.id} key={index}>{category.name}</option>
                    })}
                </select>
            </div>
            {/* Expense Date */}
            <div className="flex flex-col gap-2">
                <label htmlFor="expense_date" className="self-start">Expense Date</label>
                <input 
                    name="expense_date"
                    id="expense_date" 
                    type="date" 
                    className=" rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                />
            </div>
            {/* Amount */}
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="self-start"> Amount</label>
                <input 
                    name="amount" 
                    id="amount"
                    type="number" 
                    className="rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="self-start">Description</label>
                <input 
                    name="description" 
                    id="description"
                    type="text" 
                    className="rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                />
            </div>
            {/* Buttons */}
            <div className="flex gap-4 self-end">
                <button 
                    type="submit" 
                    className="rounded-2xl p-2 px-6 border-2 border-stone-700 active:border-white active:bg-white active:text-black"
                >
                    Enviar
                </button>
            </div>
        </form>
    </>
} 