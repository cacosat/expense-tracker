import { useState } from 'react'
import NavBar from './components/navBar'
import ContainerGralInfo from './components/containerGralInfo'
import ExpenseCard from './components/ExpenseCard'
import './App.css'

function App() {


  return <>
  <NavBar />
  <ContainerGralInfo />
  <ExpenseCard category="Comida" expense="$10000" date="25 de dic." dateExpense="$9000"/>
  </>
};

export default App


