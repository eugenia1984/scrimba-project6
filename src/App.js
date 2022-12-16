import React, { useEffect, useState } from "react";
import "./jsconfig.json";
import Confetti from "react-confetti";
import  useWindowSize  from "./hook/useWindowSize.jsx";
import Die from "./components/die/Die";
import "./App.css";
import Title from "./components/title/Title";
import Explanation from "./components/explanation/Explanation";
import "./international";
import { TEXT, BTN_TXT } from "./international";

function App() {
  //const { width, height} = useWindowSize;
  const size = useWindowSize();

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.held);
    const allSameNumber = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        held: false,
        id: i + 1,
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollUnheldDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die, i) =>
          die.held ? die : { value: randomDieValue(), held: false, id: i + 1 }
        )
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti width={size.width} height={size.height} />}
      <Title text={TEXT.title} />
      <Explanation text={TEXT.explanation} />
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollUnheldDice}>
        {tenzies ? BTN_TXT.reset : BTN_TXT.roll}
      </button>
    </main>
  );
}

export default App;
