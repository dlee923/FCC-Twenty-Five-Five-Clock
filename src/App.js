import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faPause, faRefresh } from '@fortawesome/free-solid-svg-icons';

const title = <h1 className="title">25 + 5 Clock</h1>

const OptionContainer = ({title, optionValue, decreaseFx, increaseFx}) => {
  return (
    <div className="option-container">
      <p className="option-container-title">{title}</p>
      <div className="option-container-selector">
        <button className="option-container-selector-button" onClick={decreaseFx}><FontAwesomeIcon icon={faArrowDown} /></button>
        <p className="option-value">{optionValue}</p>      
        <button className="option-container-selector-button" onClick={increaseFx}><FontAwesomeIcon icon={faArrowUp} /></button>
      </div>      
    </div>  
  );
}

function SessionContainer({minutes, seconds}) {
  return (
    <div className="session-container">
      <p className="session-container-title">Session</p>
      <p className="session-container-value">{minutes}:{seconds}</p>
    </div>
  );
}

const SessionControlRow = ({playFx, pauseFx, resetFx}) => {
  return (
    <div className="session-control-row">
      <button className="session-control-row-btn" onClick={playFx}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button className="session-control-row-btn" onClick={pauseFx}>
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button className="session-control-row-btn" onClick={resetFx}>
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
      timeRemaining: 1500, // 60s * 25m
      minutesRemaining: 25,
      secondsRemaining: "00"
    }
  }

  decreaseBreak = () => {
    console.log("decrease break");
    this.setState({
      breakLength: this.state.breakLength - 1 < 0 ? 0 : this.state.breakLength - 1
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
    this.setTimerValue(this.state.sessionLength - 1 < 0 ? 0 : this.state.sessionLength - 1, "00");
    this.setState({
      sessionLength: this.state.sessionLength - 1 < 0 ? 0 : this.state.sessionLength - 1
    });
  }

  increaseSession =() => {
    console.log("increase session")
    this.setTimerValue(this.state.sessionLength + 1 > 60 ? 60 : this.state.sessionLength + 1, "00");
    this.setState({
      sessionLength: this.state.sessionLength + 1 > 60 ? 60 : this.state.sessionLength + 1,
    });
  }

  setTimerValue = (minutes, seconds) => {
    console.log("set timer")
    this.setState({
      minutesRemaining: minutes,
      secondsRemaining: seconds
    });
  }

  play = () => {
    console.log("play");
    setInterval(this.updateTimeRemaining, 1000);
  }

  pause = () => {
    console.log("pause");
    clearInterval();
  }

  reset = () => {
    console.log("reset")
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeRemaining: 1500, // 60s * 25m
      minutesRemaining: 25,
      secondsRemaining: "00"
    });
  }

  updateTimeRemaining = () => {
    console.log("update time remaining")
    const timeRemaining = this.state.timeRemaining - 1;
    const minutesRemaining = parseInt((this.state.timeRemaining - 1) / 60);
    const secondsRemaining = (this.state.timeRemaining - 1) % 60;
    this.setTimerValue(minutesRemaining, secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining)
    this.setState({
      timeRemaining: timeRemaining,
    });
  }

  render() {
    return (
      <div className="App">
        {title}        
        <div className="option-container-group">
          <OptionContainer 
            title="Break Length" 
            optionValue={this.state.breakLength} 
            decreaseFx={this.decreaseBreak}
            increaseFx={this.increaseBreak}
          />
          <span style={{width: "70px"}}></span>
          <OptionContainer 
            title="Session Length" 
            optionValue={this.state.sessionLength} 
            decreaseFx={this.decreaseSession} 
            increaseFx={this.increaseSession}
          />
        </div>        
        <SessionContainer minutes={this.state.minutesRemaining} seconds={this.state.secondsRemaining}/>
        <SessionControlRow playFx={this.play} pauseFx={this.pause} resetFx={this.reset}/>
        <Signature />
      </div>
    );
  }  
}

export default App;
