import he from "he"

export default function Question(props){

    console.log(props)

    return(
        <>
            <div className="questions">
               {props.questions.map((question,index) => {
                const selected = question.selectedAnswer
                const questionButtons = question.allAnswers.map((q, index) => {

                    const styles = {}
                    if (props.hasCheckedAnswers) {
                      if (q === question.correct_answer) {
                        styles.backgroundColor = "#94D7A2"  // green for correct
                      } else if (selected === q) {
                        styles.backgroundColor = "#F8BCBC"  // red for wrong selection
                      } else {
                        styles.opacity = "0.5" // fade out unselected wrong answers
                      }
                    } else {
                      if (selected === q) {
                        styles.backgroundColor = "#D6DBF5" // highlight selection
                      }
                    }
                    
                    return <button 
                    disabled={props.hasCheckedAnswers}
                    style={styles}
                    onClick={() => props.hold(q, question.id)} 
                    key={index}> {he.decode(q)} </button>
                })

                return(
                <div key={index}>
                    <h2 >{he.decode(question.question)}</h2>
                    <div className="question-btns">
                        {questionButtons}
                    </div>
                    <div className="divider"></div>
                </div>
                )
               })}
               {!props.hasCheckedAnswers && <button className="check-answers"disabled={props.hasCheckedAnswers}onClick={props.checkAnswers}>Check answers</button>}
            </div>
        </>

    )
}