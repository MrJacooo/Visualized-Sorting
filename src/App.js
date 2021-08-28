import logo from './logo.svg';
import './App.css';
import react, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { width } from 'dom-helpers';
import { sort } from 'prelude-ls';

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
  const [bars, setBars] = useState([])
  const [barWidth, setBarWidth] = useState(100)
  const [sortAlg, setSortAlg] = useState(1)
  const [sorting, setSorting] = useState(false)

  const [sortStepperOne, setSortStepperOne] = useState(0)
  const [sortStepperTwo, setSortStepperTwo] = useState(0)


  function fillBars(num) {
    let temp = Math.floor((window.screen.width - (window.screen.width / 5)) / num) - 2
    console.log(temp)
    setBarWidth(temp)
    let tempBars = []
    for (let i = 0; i < num; i++) {
      tempBars.push(getRandomNumber(window.screen.height / 5 * 3))
    }
    setBars(tempBars)
    setSortStepperOne(0)
    setSortStepperTwo(0)
  }

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max)
  }



  async function sort() {
    if (!sorting && bars.length > 0) {
      setSorting(true)
      if (sortAlg === 1) {
        console.log("starting algorythm")
        let tempArr = bars.slice()
        for (let i = 0; i < bars.length; i++) {

          //Inner pass
          for (let j = 0; j < bars.length - i - 1; j++) {

            //Value comparison using ascending order

            if (tempArr[j + 1] < tempArr[j]) {
              console.log("swapping")

              let temp = tempArr[j];
              tempArr[j] = tempArr[j + 1];
              tempArr[j + 1] = temp
            }
          }
        }
        setBars(tempArr)
      }

    }
    setSorting(false)
  }

  function sortOne() {
    console.log("starting algorythm")
    let tempArr = bars.slice()
    console.log(sortStepperOne, bars.length)
    if (sortStepperOne < bars.length) {

      console.log(sortStepperTwo, bars.length - sortStepperOne - 1)
      //Inner pass
      if (sortStepperTwo < bars.length - sortStepperOne - 1) {

        //Value comparison using ascending order
        if (tempArr[sortStepperTwo + 1] < tempArr[sortStepperTwo]) {


          let temp = tempArr[sortStepperTwo];
          tempArr[sortStepperTwo] = tempArr[sortStepperTwo + 1];
          tempArr[sortStepperTwo + 1] = temp
          setBars(tempArr)
        }
        setSortStepperTwo(sortStepperTwo + 1)

      } else { setSortStepperTwo(0); setSortStepperOne(sortStepperOne + 1) }
    }
  }


  return (
    <>
      <header>
        <div>
          <Form.Label>Amount of Objects and Sorting Speed</Form.Label>
          <Form.Range step="1" min="5" max="300" value={bars.length} onChange={(e) => fillBars(e.target.value)} />
        </div>
        <div>
          <Form.Check id="Radio1" inline type="radio" label="Bubble Sort" name="group1" value={1} checked={sortAlg === 1} onChange={() => setSortAlg(1)} />

          <Form.Check id="Radio2" disabled inline type="radio" label="Sort 2" name="group1" value={1} checked={sortAlg === 2} onChange={() => setSortAlg(2)} />
        </div>
        <div>
          <Button onClick={() => sort()}> Sort 🧩</Button>
          <Button onClick={() => sortOne()}> Sort one Step</Button>
        </div>
      </header>
      <section>
        {bars.length > 0 ? bars.map(bar => <div className="bar" style={{ height: `${bar}px`, width: `${barWidth}px` }}></div>) : <p>Move the Slider at the Top ☝</p>}
      </section>
    </>
  )
}

export default App;
