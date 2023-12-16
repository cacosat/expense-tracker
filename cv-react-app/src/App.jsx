import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          Hello, Tailwind!
        </h1>
      </div>
      <div>
        <Dropdown />
      </div>
    </>
  )
}

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const items = ['Uppercase', 'Lowercase', 'Camel Case', 'Kebab Case'];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative group">
        <button 
          id="dropdown-button" 
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          <span className="mr-2">Open Dropdown</span>
          {/* SVG code here */}
        </button>
        {isOpen && (
          <div id="dropdown-menu" className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
            <input 
              id="search-input" 
              className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" 
              type="text" 
              placeholder="Search items" 
              autocomplete="off"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {items
              .filter((item) => item.toLowerCase().includes(searchTerm))
              .map((item, index) => (
                <a key={index} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                  {item}
                </a>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default App
