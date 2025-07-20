import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Question from "./Question.jsx"

function App() {

  const [gameState, setGameState] = useState(false)
  const [questions, setQuestions] = useState([])
  const [correctCount, setCorrectCount] = useState(null)
  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false)

  function startGame(){
    setGameState(true)
    fetchQuestions()
  }

  function playAgain(){
    setCorrectCount(null)
    setHasCheckedAnswers(false)
    fetchQuestions()
  }


  function fetchQuestions(){
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuestions(data.results.map((question) => {
      return{
        ...question,
        selectedAnswer: "",
        allAnswers:shuffleAnswers([...question.incorrect_answers, question.correct_answer]),
        id: nanoid()
      }
      
    })))
  }

  function shuffleAnswers(everyQuestion){
    return everyQuestion.sort(() => Math.random() - 0.5)
  }
  
  function hold(answer, id){
     setQuestions((prevQuestions) => 
       prevQuestions.map((q) => 
          q.id === id ? {...q, selectedAnswer: answer} : q
      )
     )
  }

  function checkAnswers(questions){
    let count = 0
    questions.forEach((q) => {
      if(q.correct_answer === q.selectedAnswer){
        count++
      }
    })
    setCorrectCount(count)
    setHasCheckedAnswers(true)
  }



  return (
    <>
    <main>
      {!gameState &&
      <section className='start-game'>
        <h1>Quizzical</h1>
        <p>Test your general knowledge!</p>
        <button onClick={startGame}>Start quiz</button>
      </section>}

    { gameState && 
      <section className='main-game'>
        <Question
         checkAnswers={() => checkAnswers(questions)} 
         questions={questions} 
         hold={hold}
         hasCheckedAnswers={hasCheckedAnswers}

         />
      </section>}


    <footer>
    {gameState && correctCount != null ? <h2>You scored {correctCount}/5 correct answers</h2> : null}
    {hasCheckedAnswers && <button className='check-answers' onClick={playAgain}>Play again!</button>}
    </footer>
       

    </main>
    <div className='background-images'>
      <img src='blob.svg' alt= "blue blob in background"></img>
      <img src='yellowblob.svg' alt= "yellow blob in background"></img>
    </div>
  </>

  )
}

export default App
