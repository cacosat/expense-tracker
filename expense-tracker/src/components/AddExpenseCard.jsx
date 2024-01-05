import React from "react";
import { useState, useEffect } from "react";
import PlusIconSmall from "../assets/plus-circle-sm.svg"

export default function AddExpenseCard() {
    
    
    
    return <>
    <div className="flex flex-col justify-center items-end gap-2 lg:w-[240px] lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700">
      {/* Contenedor card */}
      <div className="text-lg max-sm:text-base font-bold text-end">
        Añadir
      </div>
      <div className="">
      {/* contenedor ícono */}
        <div>
            <img src={PlusIconSmall} />
        </div>
      </div>
    </div>
    </>
}