import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QuizCard from "./components/QuizCard";
import { fetchQuiz } from "./API";
import { Difficulty } from "./API";
import { QuestionState } from "./API";
import { setTotalAnswers } from "./utils";

const TOTAL_QUESTIONS = 10;

export type AnsObj={
  question:string;
  answer:string;
  correct:boolean;
  correct_answer:string
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [useranswers, setUseranswers] = useState<AnsObj[]>([]);
  const [number, setNumber] = useState(0);
  const [gameover, setGameover] = useState(true);
  const [score, setScore] = useState(0);
  const[isanswered,setIsanswered]=useState(true)
  const[newgame,setNewgame]=useState(true)
  const[finalscore,setFinalscore]=useState(0)
  const[diff,setDiff]=useState(Difficulty.EASY)

  const startQuiz = async () => {
    setLoading(true);
    setGameover(false);

    const result = await fetchQuiz(TOTAL_QUESTIONS, diff);
    setQuestions(result);
    console.log(result)
    

    setLoading(false);
    setNewgame(false)

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer=e.currentTarget.value
    const correct=questions[number].correct_answer === answer
    const question=questions[number].question
    const correct_answer=questions[number].correct_answer

    const AnsObj={
      question,
      answer,
      correct,
      correct_answer
    }
   
    setUseranswers((data)=> [...data,AnsObj])
    if(correct) {
      setScore((prev)=> prev+10)
   
    } 



    setIsanswered(false)


    if(number==TOTAL_QUESTIONS-1){
      setGameover(true)
      setFinalscore(score)
      setNumber(0)
      setLoading(true)
      setUseranswers([])
      setNewgame(false)

    }


  };

  const nextQuestion = () => {



      setNumber((data)=> data+1)
    

      setIsanswered(true)












  };

  const clearFinalSc=()=>{
  setFinalscore(0)
  setScore(0)
  setNewgame(true)
  }

  const selValChange=(val:any)=>{
   
    setDiff(val)

  }

  return (
    <React.Fragment>
      <div className="card text-center" id="main-card">
        <div className="card-header" style={{border:'none'}}>
          <div className="card-title">
            <h2 style={{color:'snow',textShadow:'2px 2px 2px #000'}}>React-Quiz</h2>
          </div>
        </div>
        {newgame?(<p style={{color:'#382933',fontSize:'1.3rem',textShadow:"0.5px  #fff"}}> Please start the Quiz By Clicking on Start Button....</p>):(null)}
  {gameover && !newgame?(<span>Final-Score: &nbsp;{finalscore}</span>):(null)}
        <div className="card-body">

       { gameover ?(<div >
         <span>Select Difficulty: </span>

        <select name="" id="" onChange={(e)=>{
        selValChange(e.currentTarget.value)
        }}>
       
           <option value={Difficulty.EASY} selected={true} >Easy</option>
           <option value={Difficulty.HARD}>Hard</option>
           <option value={Difficulty.MEDIUM}>Medium</option>
         </select>
       
       </div>
           
       ):(null)}
      

      <br/>
          {gameover ? (
            <button
              className="btn btn-md btn-info"
              onClick={() => {
                startQuiz();
                clearFinalSc()
              }}
            >
              {newgame?('Start-Quiz'):('Restart')}
            </button>
          ) : null}
          {!gameover ? <p style={{color:'#523906',fontSize:'1.5rem'}}>Score:{score}</p> : null}

          {loading &&!gameover &&(<p>Loading....</p>) }
          {!loading && !gameover && (
            <QuizCard
              question={questions[number].question}
              answers={questions[number].answers}
              questionnr={number + 1}
              totalquestions={TOTAL_QUESTIONS}
              callback={checkAnswer}
              useranswer={useranswers ? useranswers[number] : undefined}
            />
          )}
        </div>

        <div className="card-footer">
          {!gameover && !loading && number !== TOTAL_QUESTIONS-1  && !isanswered  && (
            <button
              className="btn btn-md btn-success"
              onClick={() => {
                nextQuestion();
              }}
            >
              Next-Question
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
