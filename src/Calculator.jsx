import { useState, useRef, useEffect } from "react"
import { evaluate } from "mathjs"

const Calculator = () => {
    const operators = ['%', '/', '*', '-', '+', '.']
    const parantheses = ['(', ')'] 
    const [displayTokens, setDisplayTokens] = useState([])
    const [display, setDisplay] = useState('0')
    const displayRef = useRef(null)

    const isDigit = char => /^[0-9]$/.test(char)

    // automic scroll to right when display updates
    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth
        }
    }, [display])

    const tokensToString = (tokens) => {
        let stringTokens = ''
        for (const token of tokens) {
            if (isDigit(token) || token === '.') {
                stringTokens += token
            } else {
                stringTokens += ' ' + token + ' '
            }
        }
        return stringTokens
    }

    const addSignToExpression = (sign) => {
        const lastSign = displayTokens.length === 0 ? '0' : displayTokens[displayTokens.length - 1]

        if (isDigit(sign) || parantheses.includes(sign)) {
            const updatedTokens = [...displayTokens, sign]
            setDisplayTokens(updatedTokens)
            setDisplay(tokensToString(updatedTokens))
        }
        else if (operators.includes(sign)) {
            if (operators.includes(lastSign) ||
                ((displayTokens.length === 0 && sign !== '-')) ||
                    lastSign === '(') return
            const updatedTokens = [...displayTokens, sign]
            setDisplayTokens(updatedTokens)
            setDisplay(tokensToString(updatedTokens))
        }
        else {
            console.error('Unknown sign')
        }
    }

    const deleteLastSign = () => {
        if (displayTokens.length === 0) return
        const updatedTokens = displayTokens.slice(0, -1)
        setDisplayTokens(updatedTokens)
        setDisplay(updatedTokens.length === 0 ? '0' : tokensToString(updatedTokens))
    }

    const clearExpression = () => {
        setDisplayTokens([])
        setDisplay('0')
    }

    const calculatePercentage = () => {
        const operatorsSet = new Set(operators)
        // delete comma
        operatorsSet.delete('.')
        const displayTokensSet = new Set(displayTokens)
        if (operatorsSet.intersection(displayTokensSet).size > 0) return
        const expression = displayTokens.join('')
        const result = parseFloat(expression) / 100
        const resultTokens = result.toString().split('')
        setDisplayTokens(resultTokens)
        setDisplay(tokensToString(resultTokens))

    }

    const calculate = () => {
        const lastSign = displayTokens.length === 0 ? '0' : displayTokens[displayTokens.length - 1]
        if (operators.includes(lastSign)) return
        const expression = displayTokens.join('')
        try {
            const result = evaluate(expression)
            const resultTokens = result.toString().split('')
            setDisplayTokens(resultTokens)
            setDisplay(tokensToString(resultTokens))
        } catch (error) {
            console.error('Calculation error:', error)
            setDisplay(error.message)
            setDisplayTokens([])
        }
    }
    
    return (
        <div className="calc border-2 rounded-sm w-40 mx-auto">
            <div 
            ref={displayRef}
            className="display text-right h-10 p-1 border-b-1 overflow-auto whitespace-nowrap">{display}</div>
            <div className="grid grid-cols-4">
                    <button
                        onClick={clearExpression}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >C</button>
                    <button
                        onClick={deleteLastSign}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >⌫</button>
                    <button
                        onClick={calculatePercentage}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >%</button>
                    <button
                        onClick={() => addSignToExpression('/')}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >÷</button>
                    <button
                        onClick={() => addSignToExpression('7')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >7</button>
                    <button
                        onClick={() => addSignToExpression('8')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >8</button>
                    <button
                        onClick={() => addSignToExpression('9')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >9</button>
                     <button
                        onClick={() => addSignToExpression('*')}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >×</button>
                    <button
                        onClick={() => addSignToExpression('4')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >4</button>
                    <button
                        onClick={() => addSignToExpression('5')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >5</button>
                    <button
                        onClick={() => addSignToExpression('6')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >6</button>
                     <button
                        onClick={() => addSignToExpression('-')}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >-</button>
                     <button
                        onClick={() => addSignToExpression('1')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >1</button>
                     <button
                        onClick={() => addSignToExpression('2')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >2</button>
                     <button
                        onClick={() => addSignToExpression('3')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer'
                    >3</button>
                    <button
                        onClick={() => addSignToExpression('+')}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >+</button>
                    {/* Dropdown placeholder button */}
                    <div className="relative group ">
                        <button 
                        className="text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer">
                            ()
                        </button>
                        <div
                            className="absolute top-full left-0 mb-1 group-hover:flex rounded-md px-2 py-1 hidden border border-gray-300">
                                                        <button
                                    onClick={() => addSignToExpression('(')}
                                    className="text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer"
                                >
                                    (
                                </button>
                                <button
                                    onClick={() => addSignToExpression(')')}
                                    className="text-white bg-gray-400 rounded-md px-2 m-1 hover:bg-gray-500 hover:cursor-pointer"
                                >
                                    )
                                </button>
                            </div>
                    </div>
                    {/* End dropdown menu */}
                     <button
                        onClick={() => addSignToExpression('0')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1  hover:bg-gray-500 hover:cursor-pointer'
                    >0</button>
                    <button
                        onClick={() => addSignToExpression('.')}
                        className='text-white bg-gray-400 rounded-md px-2 m-1  hover:bg-gray-500 hover:cursor-pointer'
                    >,</button>
                    <button
                        onClick={calculate}
                        className='text-white bg-orange-400 rounded-md px-2 m-1 hover:bg-orange-500 hover:cursor-pointer'
                    >=</button>
            </div>
       </div>
    )
}

export default Calculator