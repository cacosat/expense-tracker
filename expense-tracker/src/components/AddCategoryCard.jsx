import React from "react";
import { useState, useEffect } from "react";
import PlusIconSmall from "../assets/plus-circle-sm.svg"

export default function AddCategoryCard(props) {
  

  // TODO set up POST request to add categories when clicked
  
  return <>
  <button 
    className="active:bg-white active:text-black flex flex-col justify-center items-end gap-2 lg:w-[240px] lg:max-w-[240px] p-8 max-sm:p-4 border-2 rounded-2xl border-stone-700"
    // onClick toggle modal
    onClick={props.onClick}  
  >
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
  </button>
  </>
}