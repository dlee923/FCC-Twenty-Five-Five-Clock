import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faPause, faRefresh } from '@fortawesome/free-solid-svg-icons';

const title = <h1 className="title">25 + 5 Clock</h1>

const OptionContainer = ({titleID, decreaseID, increaseID, valueID, title, optionValue, decreaseFx, increaseFx}) => {
  return (
    <div className="option-container">
      <p className="option-container-title" id={titleID}>{title}</p>
      <div className="option-container-selector">
        <button className="option-container-selector-button" id={decreaseID} onClick={decreaseFx}><FontAwesomeIcon icon={faArrowDown} /></button>
        <p className="option-value" id={valueID}>{optionValue}</p>      
        <button className="option-container-selector-button" id={increaseID} onClick={increaseFx}><FontAwesomeIcon icon={faArrowUp} /></button>
      </div>      
    </div>  
  );
}

function SessionContainer({title, minutes, seconds}) {
  return (
    <div className="session-container">
      <p className="session-container-title" id="timer-label">{title}</p>
      <p className="session-container-value" id="time-left">{minutes}:{seconds}</p>
    </div>
  );
}

const SessionControlRow = ({playPauseFx, resetFx}) => {
  return (
    <div className="session-control-row">
      <button className="session-control-row-btn" id="start_stop" onClick={playPauseFx}>
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button className="session-control-row-btn" id="reset" onClick={resetFx}>
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </div>    
  );
}

const Signature = () => {
  return (
    <div className="signature">
      <p className="signature-designed">Designed by Peter Weinberg and</p>
      <p className="signature-coded">Coded by Daniel Lee</p>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isSession: true,
      timeRemaining: 1500, // 60s * 25m
      minutesRemaining: 25,
      secondsRemaining: "00",
      interval: ''
    }
  }

  decreaseBreak = () => {
    console.log("decrease break");
    this.setState({
      breakLength: this.state.breakLength - 1 < 1 ? 1 : this.state.breakLength - 1
    });
  }

  increaseBreak = () => {
    console.log("increase break")    
    this.setState({
      breakLength: this.state.breakLength + 1 > 60 ? 60 : this.state.breakLength + 1
    });    
  }

  decreaseSession = () => {
    console.log("decrease session");
    this.setTimerValue(this.state.sessionLength - 1 < 1 ? 1 : this.state.sessionLength - 1, "00");
    this.setState({
      sessionLength: this.state.sessionLength - 1 < 1 ? 1 : this.state.sessionLength - 1,
      timeRemaining: (this.state.sessionLength - 1) * 60
    });
  }

  increaseSession =() => {
    console.log("increase session")
    this.setTimerValue(this.state.sessionLength + 1 > 60 ? 60 : this.state.sessionLength + 1, "00");
    this.setState({
      sessionLength: this.state.sessionLength + 1 > 60 ? 60 : this.state.sessionLength + 1,
      timeRemaining: (this.state.sessionLength + 1) * 60
    });
  }

  setTimerValue = (minutes, seconds) => {
    console.log("changing timer values")
    this.setState({
      minutesRemaining: minutes,
      secondsRemaining: seconds
    });
  }

  setTimerProperties = (isSession) => {
    document.documentElement.style.setProperty("--timer-color", "white");
    this.setState ({
      isSession: isSession,
      timeRemaining: isSession ? this.state.sessionLength * 60 : this.state.breakLength * 60,
      minutesRemaining: isSession ? this.state.sessionLength : this.state.breakLength,
      secondsRemaining: "00"
    });
  }

  

  playPause = () => {    
    if (this.state.interval === "" || this.state.interval === clearInterval(this.state.interval)) {
      console.log("play");
      this.setState ({
        interval: setInterval(this.updateTimeRemaining, 1000)
      });      
    } else {
      console.log("pause");
      this.setState ({
        interval: clearInterval(this.state.interval)
      });
    }
  }

  reset = () => {
    console.log("reset")    
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeRemainingIsSession: true,
      timeRemaining: 1500, // 60s * 25m
      minutesRemaining: 25,
      secondsRemaining: "00",
      interval: clearInterval(this.state.interval)
    });
    document.documentElement.style.setProperty("--timer-color", "white");    
  }

  toggleTimeRemainingIsSession = () => {
    this.setState ({
      isSession: !this.state.isSession
    });
  }

  updateTimeRemaining = () => {
    console.log("update time remaining")
    this.changeTimerColor(this.state.timeRemaining - 1);
    const timeRemaining = this.state.timeRemaining - 1;
    const minutesRemaining = parseInt((this.state.timeRemaining - 1) / 60);
    const secondsRemaining = (this.state.timeRemaining - 1) % 60;
    this.setTimerValue(minutesRemaining, secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining)
    this.setState({
      timeRemaining: timeRemaining,
    });
    if (timeRemaining < 0) {
      this.setTimerProperties(!this.state.isSession);
    }
  }

  changeTimerColor = (timeRemaining) => {
    document.documentElement.style.setProperty("--timer-color", timeRemaining < 61 ? "Crimson" : "white");
  }

  render() {
    return (
      <div className="App">
        {title}        
        <div className="option-container-group">
          <OptionContainer
            titleID="break-label"
            decreaseID="break-decrement"
            increaseID="break-increment"
            valueID="break-length"
            title="Break Length"
            optionValue={this.state.breakLength} 
            decreaseFx={this.decreaseBreak}
            increaseFx={this.increaseBreak}
          />
          <span style={{width: "70px"}}></span>
          <OptionContainer 
            titleID="session-label"
            decreaseID="session-decrement"
            increaseID="session-increment"
            valueID="session-length"
            title="Session Length" 
            optionValue={this.state.sessionLength} 
            decreaseFx={this.decreaseSession} 
            increaseFx={this.increaseSession}
          />
        </div>        
        <SessionContainer title={this.state.isSession ? "Session" : "Break"} minutes={this.state.minutesRemaining} seconds={this.state.secondsRemaining}/>
        <SessionControlRow playPauseFx={this.playPause} resetFx={this.reset}/>
        <Signature />
      </div>
    );
  }  
}

export default App;
