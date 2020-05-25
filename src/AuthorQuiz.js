import React from 'react';
import logo from './logo.svg';


function Hero() {
  return (
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p> Guess the correct book from the author of the photo</p>
    </div>
  );
}

function Turn() {
  return (<div />);
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

function AuthorQuiz() {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn />
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
