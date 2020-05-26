import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

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

function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.author.books.find((title) => title === action.answer);
      return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' });
    case "CONTINUE":
      return Object.assign({}, state, { highlight: '', turnData: getTurnData(authors) });
    case "ADD_AUTHOR":
      return Object.assign({}, state, { authors: state.authors.concat([action.author]) });
    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route exact path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


