import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

const getTurnData = (authors) => {
  const allBooks = authors.reduce((p, author) => {
    return p.concat(author.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const correctAnswer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => {
      return author.books.some((title) => title === correctAnswer)
    })
  }
}

const state = {
  turnData: getTurnData(authors),
  highlight: ''
}

const onAnswerSelected = (answer) => {
  const isCorrect = state.turnData.author.books.find((title) => title === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return (
    < AuthorQuiz  {...state} onAnswerSelected={onAnswerSelected} />
  );
}

function AddAuthorForm() {
  return (
    <div>
      <h1>Add</h1>
    </div>
  );
}

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

render();