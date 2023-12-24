import React from "react";
import PlusIcon from "../assets/plus-circle.svg"

export default function Header(props) {
    // hooks

    return <>
    <div className="flex justify-center">
        <div className="flex justify-between items-center mt-8" style={{width: `${props.width}px`}}>
            <div className="flex flex-col items-start gap-4">
                {/* text */}
                <h3 className="text-2xl">
                    Total
                </h3>
                <h1 className="text-4xl font-bold">
                    {props.totalExpense}
                </h1>
            </div>
            <div>
                <img src={PlusIcon} />
            </div>
        </div>
    </div>
    </>
}