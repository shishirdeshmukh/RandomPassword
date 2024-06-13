import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
 const [length,setLength] = useState(9)  
 const [numallow,setnumallow] = useState(false)  
 const [charallow,setcharallow] = useState(false)  
 const [password,setpassword] = useState("")  
 
 const passref = useRef(null)
 
 const passwordGenerator = useCallback(()=>{
  let pass =""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if (numallow) {
    str  = str + "0123456789"
  }

  if (charallow) {
    str = str + "@#!$^&*"
  }

  for (let i = 1; i < length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    
  }
  setpassword(pass)

 } , [length ,numallow , charallow , setpassword] )
 
const copyclick = useCallback(()=>{
  passref.current?.select()
  
  window.navigator.clipboard.writeText(password)
} , [password])
useEffect(()=>{
  passwordGenerator()
} ,[length , numallow , charallow , passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-center text-white '>Password Generator</h1>

      <div className='flex items-center  gap-x-1'>
        <input type='text' value = {password} className='outline-none w-full py-1 px-3 rounded-lg' placeholder='password'readOnly ref={passref}/>
        <button className='outline-none bg-sky-600 text-white px-3 py-0.5 shrink-0 rounded-lg' onClick={copyclick}>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-3'>
        <input type="range" min={6} max={29} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-3'>
        <input type="checkbox" defaultChecked={numallow} id='numinput'  onChange={()=>{setnumallow((prev) => !prev)}}/>
        <label htmlFor='numinput'>Numbers</label>
      </div>
      
      <div className='flex items-center gap-x-3'>
        <input type="checkbox" defaultChecked={charallow} id='charinput'  onChange={()=>{setnumallow((prev) => !prev)}}/>
        <label htmlFor='charinput'>Characters</label>
      </div>


      </div>
    </div>
  )
}

export default App
