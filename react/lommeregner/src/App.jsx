import React, { useState } from 'react';

export default function App() {
    const [input, setInput] = useState('');

    function addInput(num) {
        const pattern = /=/;

        setInput(preInput => {
            if (pattern.test(preInput)) {
                return clearInput(num.toString());
            }
            return preInput + num;
        });
    }

    function calulate() {
        setInput(preInput => preInput + ' = ' + eval(input).toString());
    }

    function clearInput(num = '') {
        setInput(num);
    }

    return(
        <div className='w-screen h-screen bg-zinc-950 flex justify-center items-center'>
            <div className=' bg-zinc-800 flex flex-col items-center rounded-lg'>
                <div className='h-24 w-full flex items-center bg-gray-700 p-2 rounded-lg shadow-lg'>
                    <input type="text" className='flex-grow h-full text-2xl text-white bg-transparent border-none focus:outline-none px-3' value={input} disabled/>
                    <button className='h-full px-4 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg ml-2' onClick={() => clearInput()}>x</button>
                </div>
                <div className='grow w-full grid grid-cols-4 gap-2 mt-2'>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('1')}>1</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('2')}>2</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('3')}>3</button>
                    <button style={{ backgroundColor: 'rgba(255, 165, 0, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('+')}>+</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('4')}>4</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('5')}>5</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('6')}>6</button>
                    <button style={{ backgroundColor: 'rgba(255, 165, 0, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('-')}>-</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('7')}>7</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('8')}>8</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('9')}>9</button>
                    <button style={{ backgroundColor: 'rgba(255, 165, 0, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('*')}>*</button>
                    <button style={{ backgroundColor: 'rgba(255, 192, 203, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('0')}>0</button>
                    <button style={{ backgroundColor: 'rgba(255, 165, 0, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('.')}>.</button>
                    <button style={{ backgroundColor: 'rgba(255, 165, 0, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => addInput('/')}>/</button>
                    <button style={{ backgroundColor: 'rgba(255, 165, 0, 1)' }} className='w-24 h-24 rounded-lg shadow-md hover:bg-zinc-600 active:bg-zinc-500' onClick={() => calulate()}>Enter</button>
                </div>
            </div>
        </div>
    )
}
