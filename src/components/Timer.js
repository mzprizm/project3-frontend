import React, {useState, useEffect} from 'react'
import TimerDisplay from './TimerDisplay'
import TimerButtons from './TimerButtons'
import '../css/timer.css'

function Timer(props) {
    const [time, setTime] = useState({ms:0, s:0, m:0, h:0})
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    // 0 = not started
    // 1 = started
    // 2 = pause

    useEffect(()=>{
        start()
    },[])

    const start = () => {
        run();
        setStatus(1)
        setInterv(setInterval(run, 10));
    };

    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if(updatedM === 60){
            updatedH++;
            updatedM = 0;
        }
        if(updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if(updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH})
    };

    const stop = () => {
        clearInterval(interv)
        setStatus(2)
    };

    const reset = () => {
        clearInterval(interv)
        setStatus(0)
        setTime({ms:0, s:0, m:0, h:0})
    };
    const resume = () => start();
    
    if(props.currentIndex == 0){
        if(props.timeArr[1] == time.s)
        console.log("you are behind")
    }
  

    return (
        <div className="main-section">
            <div className="clockWrapper">
                <div className="timer">
                    <TimerDisplay time={time} />
                    <TimerButtons status={status} resume={resume} stop={stop} reset={reset} start={start}/>
                </div>
            </div>
        </div>
    )
}

export default Timer