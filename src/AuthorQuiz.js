import React from 'react';
import logo from './logo.svg';
import './AuthorQuiz.css';

function Hero() {
  return (
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p> Guess the correct book from the author of the photo</p>
    </div>
  );
}

function Book({title}) {
  return (
    <div className="answer">
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ author, books }) {
  return (
    <div className="row turn" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="author-image" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => {
          return (
            <Book title={title} key={title} />
          );
        })}
      </div>
    </div>
  );
}

function Continue() {
  return (<div />);
}

function Footer() {
  return (
    <div className="col-10 offset-1 row">
      <p>All images are from <a href="#">Wikimedia Commons</a> and are in public domain.</p>
    </div>
  );
}

function AuthorQuiz({ turnData }) {
  console.log(turnData);
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} />
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
