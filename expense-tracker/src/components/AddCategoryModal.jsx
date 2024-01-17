import React from "react";

export default function AddCategoryModal(props) {
    // hooks

    if (!props.isOpen) {
        return null;
    }

    return <>
        <div className={`fixed bg-black top-9 border-2 rounded-2xl border-stone-700 p-8 xxs:w-[80vw] xs:w-[50vw] sm:w-[60vw] lg:w-[722px] mx-auto left-0 right-0`}>
            <div className="flex flex-col">
                <button className="self-end" onClick={props.onClose}>X</button>
                {/* form container */}
                <form action="" className="flex flex-col gap-8 my-8">
                    {/* '{"id": 1, "name": "Groceries", "date_created": "2021-09-01 10:00:00"}' */}
                    <div className="flex flex-col gap-2">
                        <label className="self-start" htmlFor="category">Nueva Categoría</label>
                        <input 
                            type="text" 
                            id="category" 
                            className=" rounded-2xl p-2 border-2 border-stone-700 bg-stone-950"
                        />
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