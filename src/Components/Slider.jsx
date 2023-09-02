import React, { useState , useCallback , useEffect , useRef } from 'react'
import "../Components/Slider.scss"
import toast from 'react-hot-toast';
const Slider = () => {
    const [password , changePassword] = useState("");
    const [length , setLength] = useState(8);
    const [isNumber , setNumber] = useState(false);
    const [isChar , setChar] = useState(false);
    const pass = useRef(null);
    const generateRandom = useCallback(() => {
        let A = "ABCDEFGIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm"
        let B = "!@#$%^&*()_+}{:><?"
        let C = "0123456789"
        let s = A;
        if(isNumber){
            s += C;
        }
        if(isChar){
            s += B;
        }
        let ans = "";
        for(let i = 0 ; i < length ; i++){
            let index = Math.floor((Math.random() * s.length) + 1);
            ans += s.charAt(index);
        }
        changePassword(ans);
    } , [isNumber , isChar , changePassword , length])

    useEffect(() => {
        generateRandom();
    } , [isNumber , isChar , changePassword , length])
    const handleCopy = () =>{
        window.navigator.clipboard.writeText(password);
        let temp = password;
        toast.success("Copied to Clipboard")
    }
  return (
    <div className="slider">
        <div className="input-and-button">
            <input type="text" placeholder='Password' ref={pass}
            value={password} onChange={(e) => {
                changePassword(e.target.value);
            }} readOnly/>
            <button onClick={(e) => {
                handleCopy();
            }}>Copy</button>
        </div>
        <div className="rest-button">
            <input type="range" min={8} max={100} value={length} onChange={(e) => {
                setLength(e.target.value);
            }}/>
            <label htmlFor="">{length}</label>
            <input type="checkbox" defaultChecked={isChar} onChange={(e) => setChar((r) => !r)} />
            <label htmlFor="">Characters</label>
            <input type="checkbox" defaultChecked={isNumber} onChange={(e) => setNumber((r) => !r)} />
            <label htmlFor="">Numbers</label>
        </div>
        
    </div>
  )
}

export default Slider