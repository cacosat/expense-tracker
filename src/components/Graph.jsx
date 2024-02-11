import React from "react";
import { useState, useEffect } from "react";
import useTotalExpensesByCategory from "../hooks/useTotalExpensesByCategory"; // custom hook
import { Chart } from "react-google-charts";
import infoTooltip from '../assets/info.svg'

export default function Graph(props) {
  // Custom hooks
  const totalExpensesByCategory = useTotalExpensesByCategory()
  const graphData = totalExpensesByCategory();
  const columnNames = ['Categories', 'Total Expenses'];
  graphData.unshift(columnNames);
    
  const options = {
      // title: 'titulo',
      titleTextStyle: {color: 'white'},
      pieHole: 0.5,
      backgroundColor: 'transparent',
      chartArea: {
        top: '25%',
      },
      legend: { 
          position: "top", 
          alignment: "center",
          textStyle: {color: '#FFFFFF'},
          maxLines: 2 
      },
      pieSliceBorderColor: '#000000',
      sliceVisibilityThreshold: 0.2, // % of the total graph
      // colors: ['#D32F2F', '#1976D2', '#388E3C', '#FBC02D', '#7B1FA2'],
  };

  return <>
  <div  className="flex flex-col gap-8">
    <div className='text-2xl text-start'>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div>
            Gastos por categoría
          </div>
          <div className="text-lg text-stone-500">
            {graphData.length > 1 ? '' : 'No hay información'}
          </div>
        </div>  
        <img src={infoTooltip} alt="info icon" />
      </div>
    </div>
    <div className={`flex flex-col xxs:w-[90vw] xs:w-[60vw] sm:w-[70vw] lg:w-[752px] justify-center py-4 border-2 rounded-2xl border-stone-700 overflow-hidden`}>
      <Chart
          chartType="PieChart"
          height= "350px"
          data={graphData}
          options={options}
      />
    </div>
  </div>
  </>
}