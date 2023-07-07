"use client"

import { useState, useMemo } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Counter() {
    const [count, setCount] = useState(0);
    const [incrementer, setIncrementer] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [invalidIncrementer, setInvalidIncrementer] = useState(false);

    // mengubah nilai incrementer
    const changeIncrementer = (value: string) => {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue)) {
            setInvalidIncrementer(true);
        } else {
            setInvalidIncrementer(false);
            setIncrementer(parsedValue);
        }
    };
    const handleIncrement = () => {
        if (!invalidIncrementer) {
            let incrementedCounter = count + incrementer;
            setCount(incrementedCounter);
        }
    };

    const handleDecrement = () => {
        if (!invalidIncrementer) {
            let decrementedCounter = count - incrementer;
            setCount(decrementedCounter);
        }
    };

    // untuk mengatur nilai inputValue berdasarkan perubahan yang terjadi pada elemen input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        changeIncrementer(event.target.value);
    };

    // Reset
    const handleReset = () => {
        setCount(0);
        setIncrementer(1);
        setInputValue('');
        setInvalidIncrementer(false);
    };

    // rendered boxes dan pengacakan warna
    const renderedBoxes = useMemo(() => {
        return Array.from({ length: count }).map((_, index) => {
            const randomPercentage = Math.random() * 90;
            const boxColor = `hsl(${randomPercentage}, 70%, 40%)`;
            return (
                <div
                    key={index}
                    className="w-12 h-12 m-2 rounded"
                    style={{ backgroundColor: boxColor }}
                ></div>
            );
        });
    }, [count]);

    // mendefinisikan warna angka berdasarkan genap atau ganjil
    // jika genap maka akan hitam jika ganjil maka akan putih
    const textColor = count % 2 === 0 ? 'text-black' : 'text-white';

    // toggle mode gelap dan terang
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // tampilan berdasarkan mode gelap atau terang
    const containerClass = isDarkMode ? 'dark bg-black' : '';
    const boxContainerClass = isDarkMode ? 'overflow-auto no-scrollbar h-72 bg-gray-700 rounded-sm shadow-xl lg:w-5/6 md:3/6 sm:2/5' : 'overflow-auto no-scrollbar h-72 bg-teal-300 rounded-sm shadow-xl lg:w-5/6 md:3/6 sm:2/5';
    const buttonClass = isDarkMode ? 'btn dark' : 'btn';

    return (
        <div className={`${containerClass} mx-auto h-screen grid justify-items-center`}>
            <div className={`grid justify-items-center ${isDarkMode ? 'bg-gray-800' : 'bg-teal-400'} rounded-md shadow-2xl text-xl w-3/4 px-3 mt-1 pt-3`}>
                <h1 className={`${isDarkMode ? 'text-white' : 'text-black '} pb-2`}>Counter App</h1>
                <div className={boxContainerClass}>
                    <div className="grid justify-items-center gap-1 grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
                        {renderedBoxes}
                    </div>
                </div>

                <p className={`text-center text-6xl pt-5 ${textColor}`}>
                    <strong>{count}</strong>
                </p>

                {invalidIncrementer && (
                    <div className="p-0.5 shadow-lg bg-red-500 text-white text-center rounded-md mt-4">
                        Invalid incrementer value. Please enter a valid number.
                    </div>
                )}

                <div className="grid object-center justify-items-center gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 h-auto">
                    <button onClick={handleDecrement} disabled={invalidIncrementer} className={`${buttonClass} ${isDarkMode ? 'bg-red-500' : 'bg-red-500'} shadow-lg rounded-md m-5 px-5 hover:text-white ${invalidIncrementer ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        -
                    </button>
                    <input
                        className={`w-36 h-10 shadow-lg rounded-md text-center my-5 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-teal-300 '}`}
                        id="inputnumber"
                        placeholder="input value"
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleIncrement} disabled={invalidIncrementer} className={`${buttonClass} ${isDarkMode ? 'bg-green-500' : 'bg-green-500'} shadow-lg rounded-md m-5 px-5 hover:text-white ${invalidIncrementer ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        +
                    </button>
                </div>

                <div>
                    <button onClick={handleReset} className={`${buttonClass} ${isDarkMode ? 'bg-blue-500' : 'bg-blue-500'} shadow-lg rounded-md m-5 px-5 py-2 hover:text-white`}>
                        Reset
                    </button>
                </div>
                <div>
                    <button
                        onClick={toggleMode}
                        className={`btn m-2.5 px-3 py-2 ${isDarkMode ? 'bg-teal-400 text-white' : 'bg-gray-800 text-white'} rounded-md`}>
                        {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
