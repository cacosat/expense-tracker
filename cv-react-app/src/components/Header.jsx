import React from "react";
import PlusIcon from "../assets/plus-circle.svg"

export default function Header(props) {
    // hooks

    return <>
    <div className="flex justify-center">
        <div className="flex justify-between m-8" style={{width: `${props.width}px`}}>
            <div>
                {/* text */}
                <h3>
                    Total
                </h3>
                <h1>
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