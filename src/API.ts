import {setTotalAnswers} from './utils'

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Questions={
  category:string,
  type:string,
  difficulty:string,
  question:string,
  correct_answer:string,
  incorrect_answers:string[],

}

export type QuestionState=Questions & {answers:string[]}

export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {
  const URL = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`;

  const result = await (await fetch(URL)).json();

   return result.results.map((question:Questions)=>{
    return ({
      ...question,
      answers:setTotalAnswers([...question.incorrect_answers,question.correct_answer])

    })
  })
};
