import {useState, useEffect} from 'react'

// Custom hook to use function across components
// this hook returns an array of two elements array following:
// [['Categories', 'Total Expenses'], [cat1, totalCat1], ..., [catN, totalCatN]]

export default function useTotalExpensesByCategory() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // categories
        async function fetchCategories() {
        try {
            const response = await fetch('http://localhost:4000/api/categories');
            const dataCategories = await response.json();
            setCategories(dataCategories);
        } catch (e) {
            console.error({'error fetching categories from custom hook for total expenses': e})
        }
        }
        fetchCategories();

        // expenses
        async function fetchExpenses() {
        try {
            const response = await fetch('http://localhost:4000/api/expenses');
            const expensesData = await response.json();
            setExpenses(expensesData);
        } catch (e) {
            console.error({'error fetching expenses from custom hook for total expenses': e});
        }
        }
        fetchExpenses();
    }, []);

    function totalExpensesByCategory() {
        let result = [];
        // result.push(['Categories', 'Total Expenses'])
        categories.forEach((category) => {
        let categoryExpenses = expenses.filter(expense => category.id === expense.category_id);
        let categoryExpensesTotal = categoryExpenses.reduce((total, expense) => {
            return total + expense.amount;
        }, 0);
        result.push([category.name, categoryExpensesTotal]);
        })
        
        return result;
    }
    
    return totalExpensesByCategory;
}