import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ getQuizSettings }) => {
    const [amount, setAmount] = useState('10');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');

    return (
        <div>
            <h1>Menu</h1>
            <form>
                <label htmlFor='amount'>Number of questions: </label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type='number'
                    id='amount'
                />

                <label htmlFor='category'>Select category: </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id='category'
                >
                    <option value=''>Any category</option>
                    <option value='9'>General knowledge</option>
                    <option value='10'>Entertainment: Books</option>
                    <option value='11'>Entertainment: Film</option>
                    <option value='12'>Entertainment: Music</option>
                    <option value='13'>
                        Entertainment: Musicals &#38; Theatres
                    </option>
                    <option value='14'>Entertainment: Television</option>
                    <option value='15'>Entertainment: Video Games</option>
                    <option value='16'>Entertainment: Board Games</option>
                    <option value='17'>Science &#38; Nature</option>
                    <option value='18'>Science: Computers</option>
                    <option value='19'>Science: Mathematics</option>
                    <option value='20'>Mythology</option>
                    <option value='21'>Sports</option>
                    <option value='22'>Geography</option>
                    <option value='23'>History</option>
                    <option value='24'>Politics</option>
                    <option value='25'>Art</option>
                    <option value='26'>Celebrities</option>
                    <option value='27'>Animals</option>
                    <option value='28'>Vehicles</option>
                    <option value='29'>Entertainment: Comics</option>
                    <option value='30'>Science: Gadgets</option>
                    <option value='31'>
                        Entertainment: Japanese Anime &#38; Manga
                    </option>
                    <option value='32'>
                        Entertainment: Cartoon &#38; Animations
                    </option>
                </select>

                <label htmlFor='difficulty'>Select Difficulty: </label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    id='difficulty'
                >
                    <option value=''>Any Category</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>

                <label htmlFor='type'>Select Type: </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    id='type'
                >
                    <option value=''>Any Type</option>
                    <option value='miltiple'>Multiple Choice</option>
                    <option value='boolean'>True / False</option>
                </select>
            </form>
            <Link
                onClick={() => {
                    getQuizSettings({
                        amount,
                        category,
                        difficulty,
                        type,
                    });
                }}
                to='/quiz'
            >
                Enter the quiz
            </Link>
        </div>
    );
};

export default Menu;
