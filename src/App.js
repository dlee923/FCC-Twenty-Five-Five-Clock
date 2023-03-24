import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faPause, faRefresh } from '@fortawesome/free-solid-svg-icons';

const title = <h1 className="title">25 + 5 Clock</h1>

const OptionContainer = ({title, optionValue}) => {
  return (
    <div className="option-container">
      <p className="option-container-title">{title}</p>
      <div className="option-container-selector">
        <FontAwesomeIcon icon={faArrowDown} />
        <p className="option-value">{optionValue}</p>      
        <FontAwesomeIcon icon={faArrowUp} />
      </div>      
    </div>  
  );
}

function SessionContainer({time}) {
  return (
    <div className="session-container">
      <p className="session-container-title">Session</p>
      <p className="session-container-value">{time}</p>
    </div>
  );
}

const SessionControlRow = () => {
  return (
    <div className="session-control-row">
      <FontAwesomeIcon icon={faPlay} />
      <FontAwesomeIcon icon={faPause} />
      <FontAwesomeIcon icon={faRefresh} />
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
      breakLength: 0,
      sessionLength: 0,
      session: 0
    }
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
  }

  decrease() {}
  increase() {}
  play() {}
  pause() {}
  reset() {}

  render() {
    return (
      <div className="App">
        {title}        
        <div className="option-container-group">
          <OptionContainer title="Break Length" optionValue="5" />
          <span style={{width: "70px"}}></span>
          <OptionContainer title="Session Length" optionValue="25" />
        </div>        
        <SessionContainer time="25:00" />
        <SessionControlRow />
        <Signature />
      </div>
    );
  }  
}

export default App;
