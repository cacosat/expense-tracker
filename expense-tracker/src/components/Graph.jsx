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
      } catch (e) {
        console.error({'error fetching expenses from graph': e.message});
      }
    }
    fetchExpenses();
  }, []);

  function rawDataToGraphData(categoriesData, expensesData) {
    // the format is each row represent a slice [category, totalAmount],
    // first row is [sliceLabels, sliceValues], here: ['Categories', 'Total Expenses']
    
    let graphData = [];
    graphData.push(['Categories', 'Total Expenses'])
    categoriesData.forEach((category) => {
      let catName = category.name;
      let categoryExpenses = expensesData.filter(expense => category.name === expense.category_name);
      let categoryExpensesTotal = categoryExpenses.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);
      graphData.push([category.name, categoryExpensesTotal]);
    })
    
    console.log(graphData)
    return graphData;
  }
  const data = rawDataToGraphData(categories, expenses);

  // const data = [
  //   ["Task", "Hours per Day"],
  //   ["Work", 11],
  //   ["Eat", 2],
  //   ["Commute", 2],
  //   ["Watch TV", 2],
  //   ["Sleep", 7], // CSS-style declaration
  // ];
    
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
        pieSliceBorderColor: '#000000'
        // colors: ['#D32F2F', '#1976D2', '#388E3C', '#FBC02D', '#7B1FA2'],
    };

    return <>
    <div  className="flex flex-col gap-8">
      <div className='text-2xl text-start'>
        Gráfico de Gastos
      </div>
      <div className={`flex flex-col xxs:w-[90vw] xs:w-[60vw] sm:w-[70vw] lg:w-[752px] justify-center py-4 border-2 rounded-2xl border-stone-700 overflow-hidden`}>
        <Chart
            chartType="PieChart"
            height= "350px"
            data={data}
            options={options}
        />
      </div>
    </div>
    </>
}