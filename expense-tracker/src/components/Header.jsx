import { useState, useEffect } from "react";
import PlusIcon from "../assets/plus-circle.svg"

export default function Header(props) {
    // useState to keep track of total
    let [useTotal, setTotal] = useState(0);

    // useEffect for data fetching
    useEffect(() => {
        async function fetchTotal() {
            try {
                const response = await fetch('http://localhost:4000/api/expenses/total');
                const total = await response.json();
                setTotal(total);
            } catch (error) {
                console.error({'Failed fetchTotal': error});
            }
        }
        fetchTotal();
    }, []);

    return <>
    <div className={`flex justify-between`}>
        <div className={`flex xxs:w-[90vw] xs:w-[60vw] sm:w-[70vw] lg:w-[752px] justify-between items-center mt-8`}>
            <div className="flex flex-col items-start gap-4">
                {/* text */}
                <h3 className="text-2xl">
                    Total
                </h3>
                <h1 className="text-4xl font-bold">
                    {useTotal.total}
                </h1>
            </div>
            <button onClick={props.onClick} className="active:bg-white rounded-3xl" >
                <img className="active:invert" src={PlusIcon} />
            </button>
        </div>
    </div>
    </>
}