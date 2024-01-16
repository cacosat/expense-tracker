import React from "react";

export default function AddCategoryModal(props) {
    // hooks

    if (!props.isOpen) {
        return null;
    }

    return <>
        <div className={`fixed bg-black top-9 border-2 rounded-2xl border-stone-700 p-8  xxs:w-[80vw] xs:w-[50vw] sm:w-[60vw] lg:w-[722px] mx-auto left-0 right-0`}>
            <div className="flex flex-col">
                <button className="self-end" onClick={props.onClose}>X</button>
                {/* form container */}
                <form action="">
                    {/* '{"id": 1, "name": "Groceries", "date_created": "2021-09-01 10:00:00"}' */}
                </form>
            </div>
        </div>
    </>
}