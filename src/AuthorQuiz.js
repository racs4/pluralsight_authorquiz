import React from 'react';
import logo from './logo.svg';
import './AuthorQuiz.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Hero() {
  return (
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p> Guess the correct book from the author of the photo</p>
    </div>
  );
}

function Book({ title, onClick }) {
  return (
    <div className="answer" onClick={() => { onClick(title) }}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ author, books, highlight, onAnswerSelected }) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{ backgroundColor: highlightToBgColor(highlight) }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="author-image" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => {
          return (
            <Book title={title} key={title} onClick={onAnswerSelected} />
          );
        })}
      </div>
    </div>
  );
}

function Continue({ show, onContinue }) {
  return (
    <div>
      {
        show ?
          (<div className="col-2 offset-10 mt-2">
            <button className="btn btn-primary" onClick={onContinue}>Continue</button>
          </div>) :
          null
      }
    </div>
  );
}

function Footer() {
  return (
    <div className="col-10 offset-1">
      <Link to="/add" > Add an author </Link>
      <p>All images are from <a href="#">Wikimedia Commons</a> and are in public domain.</p>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: "ANSWER_SELECTED", answer });
    },
    onContinue: () => {
      dispatch({ type: "CONTINUE" })
    }
  };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(function ({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue show={highlight === "correct"} onContinue={onContinue} />
      <Footer />
    </div>
  );
});

export default AuthorQuiz;
