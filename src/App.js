import logo from './logo.svg';
import './App.css';
import react, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { width } from 'dom-helpers';

function App() {
  return (
    <div className="App">
      {window.screen.width > 1000 ? <Content /> : <NotSuitable />}
    </div>
  );
}

function NotSuitable() {
  return (
    <div>
      <p>This Screen size is not suitable for this App. Your screen has to be at least 1000px wide.</p>
    </div>
  )
}

function Content() {

  const [bars, setBars] = useState([1])
  const [barWidth, setBarWidth] = useState(10)


  function fillBars(num) {
    let temp = Math.floor((window.screen.width - (window.screen.width / 5)) / num) - 2
    console.log(temp)
    setBarWidth(temp)
    let tempBars = []
    for (let i = 0; i < num; i++) {
      tempBars.push(getRandomNumber(window.screen.height / 5 * 3))
    }
    setBars(tempBars)
  }

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max)
  }


  return (
    <>
      <header>
        <div>
          Amount of Objects and Sorting Speed
          <Form.Range />
        </div>
        <div>
          <Button onClick={() => fillBars(300)}>Fill bars</Button>
        </div>
      </header>
      <section>
        {bars.length > 0 ? bars.map(bar => <div className="bar" style={{ height: `${bar}px`, width: `${barWidth}px` }}></div>) : "no bars"}
      </section>
    </>
  )
}

export default App;
