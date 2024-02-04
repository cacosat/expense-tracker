import React from "react";
import { useState, useEffect } from "react";
import PlusIconSmall from "../assets/plus-circle-sm.svg"

export default function AddCategoryCard(props) {
  

  // TODO set up POST request to add categories when clicked
  
  return <>
  <button 
    className="active:invert flex flex-col justify-center items-end gap-2 lg:w-[240px] lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700 hover:bg-stone-950"
    // onClick toggle modal
    onClick={props.onClick}  
  >
    {/* Contenedor card */}
    <div className="text-lg max-sm:text-base font-bold text-end">
      Añadir Categoría
    </div>
    <div className="">
    {/* contenedor ícono */}
      <div className="">
          <img src={PlusIconSmall} />
      </div>
    </div>
  </button>
  </>
}