
import React from "react";
import { useState, useEffect } from "react";

export default function AddCategoryModal(props) {
    // hooks
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await fetch('http://localhost:4000/api/categories');
            const dataCategories = await response.json();
            setCategories(dataCategories);
          } catch(error) {
            console.error({'error fetching categories for category model': error.message});
          }
        }
        fetchCategories();
    }, [])

    useEffect(() => {
        // puts event listener on window for 'Enter' key to submit
        
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {window.removeEventListener('keydown', handleKeyDown)}
    }, []);

    async function postPayload(data) {
        try {
            const response = await fetch('http://localhost:4000/api/categories', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data) // make it into JSON str
            })
            if (!response.ok) {
                throw new Error(`http POST error on postPayload for category: ${response.status}`)
            }

            const responseData = response.json();
        } catch (e) {
            console.error({'error in POST category with handleSubmit': e})
        } 
    }

    function handleSubmit(event) {
        // process form to JS object and send post request via fetch() with category.name as body and prevent refresh on target
        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData.entries());

        // event.preventDefault(); // prevents refresh
        
        postPayload(payload);
    }

    if (!props.isOpen) {
        return null;
    }

    

    return <>
        <div className={`fixed bg-black top-9 border-2 rounded-2xl border-stone-700 p-8 xxs:w-[80vw] xs:w-[50vw] sm:w-[60vw] lg:w-[722px] mx-auto left-0 right-0`}>
            <div className="flex flex-col">
                <button className="self-end" onClick={props.onClose}>X</button>
                {/* form container */}
                <form action="" className="flex flex-col gap-8 my-8" onSubmit={handleSubmit}>
                    {/* '{"id": 1, "name": "Groceries", "date_created": "2021-09-01 10:00:00"}' */}
                    <div className="flex flex-col gap-2">
                        {/* 
                        TODO: make chips to display which categories exist within AddCategoryModal
                            and replicate within App.jsx, after the Header component
                        
                        <label className="self-start" htmlFor="categories">Categorias </label>
                            {categories.map((category, index) => {
                                return <div key={index}>{category.name}</div>
                            })} 
                        */}
                        <label htmlFor="category_name" className="self-start">Nombre de la nueva categoria: </label>
                        <input type="text" name="name" id="category_name" className="rounded-2xl p-2 border-2 border-stone-700 bg-stone-950" />
                    </div>
                    <div className="flex gap-4 self-end">
                        <button 
                            type="submit" 
                            className="rounded-2xl p-2 px-6 border-2 border-stone-700 active:border-white active:bg-white active:text-black"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}