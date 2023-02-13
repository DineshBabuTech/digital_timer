// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isPlaying: false, setTimer: 25, setMin: 25, setSec: 0}

  resetTimer = () => {
    this.setState({setMin: 25, setTimer: 25, setSec: 0, isPlaying: false})
    clearInterval(this.timerID)
  }

  increaseTimer = () => {
    const {isPlaying} = this.state
    if (isPlaying === false) {
      this.setState(prevState => ({setTimer: prevState.setTimer + 1}))
      this.setState(prevState => ({setMin: prevState.setMin + 1}))
    }
  }

  decreaseTimer = () => {
    const {isPlaying} = this.state
    if (isPlaying === false) {
      this.setState(prevState => ({setTimer: prevState.setTimer - 1}))
      this.setState(prevState => ({setMin: prevState.setMin - 1}))
    }
  }

  toggleStartOrPause = () => {
    const {isPlaying} = this.state
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))

    if (isPlaying) {
      clearInterval(this.timerID)
    } else {
      this.timerID = setInterval(this.tick, 1000)
    }
  }

  tick = () => {
    const {setSec, setTimer} = this.state
    if (setTimer > 0) {
      if (setSec === 0) {
        this.setState({setSec: 59})
        this.setState(prevState => ({setTimer: prevState.setTimer - 1}))
      } else {
        this.setState(prevState => ({setSec: prevState.setSec - 1}))
      }
    } else if (setTimer === 0) {
      if (setSec === 0) {
        this.setState({setSec: 59})
      } else if (setSec === 1) {
        this.setState({setSec: 0})
        clearInterval(this.timerID)
      } else {
        this.setState(prevState => ({setSec: prevState.setSec - 1}))
      }
    }
  }

  incrementTimeSec = () => {
    this.setState(prevState => ({setSec: prevState.setSec + 1}))
  }

  render() {
    const {isPlaying, setMin, setTimer, setSec} = this.state
    const imgUrl = isPlaying
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imgAlt = isPlaying ? 'pause icon' : 'play icon'
    const text = isPlaying ? 'Pause' : 'Start'
    return (
      <div className="app-container">
        <h1 className="title">Digital Timer</h1>
        <div className="responsive-cont">
          <div className="timer">
            <div className="time-cont">
              <h1 className="time">
                {setTimer > 9 ? `${setTimer}` : `0${setTimer}`}:
                {setSec > 9 ? `${setSec}` : `0${setSec}`}
              </h1>
              <p className="status">{isPlaying ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="cont">
            <div className="set-cont">
              <button
                onClick={this.toggleStartOrPause}
                className="click-btn"
                type="button"
              >
                <img src={imgUrl} alt={imgAlt} className="icon" />
              </button>
              <button
                onClick={this.toggleStartOrPause}
                type="button"
                className="click-btn text"
              >
                {text}
              </button>

              <button className="click-btn" type="button">
                <img
                  onClick={this.resetTimer}
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
              </button>
              <p className="click-btn text">Reset</p>
            </div>
            <p className="limit">Set Timer limit</p>
            <div className="sym-cont">
              <button
                onClick={this.decreaseTimer}
                className="sym"
                type="button"
              >
                -
              </button>
              <p className="btn" type="button">
                {setMin}
              </p>
              <button
                onClick={this.increaseTimer}
                className="sym"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
