import { useEffect, useRef, useState } from "react";

export default function Timer () {
    const {timer, isActive, handleStart, handleReset} = useTimer(0);
    useEffect(() => {
        handleStart();
    },[])
    return(
        <>
        <p>{formatTime(timer)}</p>
        </>
    )
}

const useTimer = (initialState = 0) => {
    const [timer,setTimer] = useState(initialState);
    const [isActive,setIsActive] = useState(false);
    const countRef = useRef(null);

    const handleStart = () => {
        setIsActive(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
          }, 1000)
    }
    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setTimer(0);
    }
    return{timer , isActive, handleStart, handleReset}
}
const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }