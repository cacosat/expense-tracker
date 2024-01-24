import React from "react";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export default function Graph(props) {
    // hooks

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:4000/api/categories');
        const dataCategories = await response.json();
        setCategories(dataCategories);
        console.log(dataCategories);
      } catch (e) {
        console.error({'error fetching categories from graph': e.message})
      }
    }
    fetchCategories();
    async function fetchExpenses() {
      try {
        const response = await fetch('http://localhost:4000/api/expenses');
        const expensesData = await response.json();
        setExpenses(expensesData);
        console.log(expensesData);
      } catch (e) {
        console.error({'error fetching expenses from graph': e.message});
      }
    }
    fetchExpenses();
  }, []);

    // TODO replace data with actual categories and expenses, 
    // this will be done via GET request and processing data format

  function dataToGraphData(data) {
    let graphData = [[]];
    // the format is:
    // data = [[catgories (first one defines x axis)], 
    // [N filas, cada una representa datos con la misma ubicación del eje x], ...];
    // Also graphData should show 10 days x axis fixed (?)
    
    // first insert names into array[0] which contains array of [xAxis, name1, ..., nameN];
    // second, insert expenses organized by index (same index === same category) into array[1]

    // TODO GET request for expenses

    return graphData;
  }

    // data will show last 10 days fixed;
    const data = [
        [
          'Day',
          // 'total',
          'Alojamiento',
          'Comida',
          'Movilización',
          'Entretenimiento',
          'Otros',
        ],
        [1, 168990, 7800, 15620, 25800, 8000],
        [2, 0, 9500, 130000, 15000, 15000],
        [3, 0, 12000, 10590, 6700, 19852],
        [4, 60000, 41000, 11000, 27000, 2000],
        [5, 0, 28000, 8000, 5800, 8000],
        [6, 0, 9800, 3000, 29000, 3000],
        [7, 53000, 19700, 104000, 36650, 10568],
        [8, 0, 10100, 19000, 28000, 20560],
        [9, 45000, 9900, 36500, 2000, 38520],
        [10, 37000, 15200, 7700, 10365, 8000],
        [11, 56000, 5500, 86000, 63000, 85000]

        // With totalValue at index[1]
        // [1, 226210, 168990, 7800, 15620, 25800, 8000],
        // [2, 395710, 0, 9500, 130000, 15000, 15000],
        // [3, 444852, 0, 12000, 10590, 6700, 19852],
        // [4, 828852, 60000, 41000, 11000, 270000, 2000],
        // [5, 878652, 0, 28000, 8000, 5800, 8000],
        // [6, 923452, 0, 9800, 3000, 29000, 3000],
        // [7, 1147370, 53000, 19700, 104000, 36650, 10568],
        // [8, 1405030, 0, 10100, 19000, 28000, 200560],
        // [9, 1536950, 45000, 9900, 36500, 2000, 38520],
        // [10, 1615215, 37000, 15200, 7700, 10365, 8000],
        // [11, 1910715, 56000, 5500, 86000, 63000, 85000]
      ];
    
    const options = {
        backgroundColor: '#000000',
        hAxis: {
            textStyle: { color: '#FFFFFF' }, // Custom color for horizontal axis labels
            gridlines: { color: 'transparent' },
        },
        vAxis: {
            textStyle: { color: '#FFFFFF' }, // Custom color for vertical axis labels
            gridlines: { color: '#27272A' },
            viewWindow: {
                min: 0,
                max: 200000
              },
        },
        colors: ['white', 'red', 'blue'],
        curveType: "function",
        legend: { 
            position: "top", 
            textStyle: {color: '#FFFFFF'} 
        },
        colors: ['#D32F2F', '#1976D2', '#388E3C', '#FBC02D', '#7B1FA2'],
    };

    return <>
    <div  className="flex flex-col gap-8">
      <div className='text-2xl text-start'>
        Gráfico de Gastos
      </div>
      <div className={`flex flex-col xxs:w-[90vw] xs:w-[60vw] sm:w-[70vw] lg:w-[752px] justify-center py-4 border-2 rounded-2xl border-stone-700 overflow-hidden`}>
        <Chart
            chartType="LineChart"
            height= "350px"
            data={data}
            options={options}
        />
      </div>
    </div>
    </>
}