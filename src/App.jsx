import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass =""
    let str  ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz"
    if (numberAllowed) str += "0123456789"
    if  (charAllowed)  str += "!@#$%&*~<?|"

    for (let i = 1; i <= length; i++) {
         let char = Math.floor(Math.random() * str.length + 1) 
         pass += str.charAt(char)     
    }

    setPassword(pass)
      
    
  }, [length, numberAllowed, charAllowed, setPassword ])

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [numberAllowed, charAllowed, passwordGenerator]) 

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input 
    type="text"
    value={password}
    className='outline-none w-full px-3 py-1'
    placeholder="Password"
    readOnly
    ref={passwordRef}
     />
     <button 
     onClick={copypasswordtoclipboard}
     className="outline-none bg-blue-500 text-white px-4 py-0.5 shrink-0">Copy</button>

    </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={50}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setLength(e.target.value)}}
       />
       <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={() => {
          setNumberAllowed((prev) => !prev)
        }} />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id='charInput'
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }} />
        <label htmlFor="charInput">Characters</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
