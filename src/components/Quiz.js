import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const Quiz = ({ settings }) => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [result, setResult] = useState(0);
    const amount = +settings['amount'];

    useEffect(() => {
        const fetchData = async () => {
            let initialURL = 'https://opentdb.com/api.php?';

            for (let key in settings) {
                if (settings[key]) {
                    initialURL += `${key}=${settings[key]}&`;
                }
            }

            console.log(initialURL);

            const response = await fetch(initialURL);

            const data = await response.json();

            setQuizData(data.results);
        };

        fetchData();
    }, [settings]);

    const correctAnswerWasChosen = () => {
        setResult(result + 1);
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    };

    const incorrectAnswerWasChosen = () => {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    };

    if (currentQuestionNumber === amount) {
        return (
            <p>
                Final Result: {result}/{currentQuestionNumber}
                <Link to='/'>Back to Menu</Link>
            </p>
        );
    } else if (quizData.length) {
        const currentQuestion = quizData[currentQuestionNumber];
        console.log(currentQuestion);
        const { question, correct_answer, incorrect_answers } = currentQuestion;

        let answers = [{ text: correct_answer, isCorrect: true }];
        incorrect_answers.forEach((answer) => {
            answers.push({
                text: answer,
                isCorrect: false,
            });
        });
        answers.sort(() => Math.random() - 0.5);

        return (
            <div>
                <p className='result'>
                    <span style={{ fontWeight: 'bold' }}>Result: </span>
                    {result}/{currentQuestionNumber}
                </p>
                <p className='category'>
                    <span style={{ fontWeight: 'bold' }}>Category: </span>
                    {currentQuestion.category}
                </p>
                <p className='difficulty'>
                    <span style={{ fontWeight: 'bold' }}>Difficulty: </span>
                    {currentQuestion.difficulty}
                </p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                            `${currentQuestionNumber + 1}. ${question}`
                        ),
                    }}
                />
                <div className='answers'>
                    {answers.map(({ text, isCorrect }, key) => (
                        <button
                            key={key}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(text),
                            }}
                            onClick={
                                isCorrect
                                    ? correctAnswerWasChosen
                                    : incorrectAnswerWasChosen
                            }
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return <p>Loading data...</p>;
    }
};

export default Quiz;
