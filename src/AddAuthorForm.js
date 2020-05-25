import React from 'react';
import './AddAuthorForm.css';

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
            actualBook: "",
            books: []
        };
    }

    onFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    addBook = (book) => {
        this.setState({
            books: [...this.state.books, book]
        });
    }

    render() {
        return (
            <div className="col-6 offset-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="authorName">Author</label>
                        <input name="name" type="text" className="form-control" id="authorName" aria-describedby="nameAuthor" value={this.state.name} onChange={this.onFieldChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">ImageUrl</label>
                        <input name="imageUrl" type="text" className="form-control" id="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
                    </div>
                    <div>
                        <ul className="list-group">
                            {this.state.books.map((book, i) => {
                                return (<li style={{ listStyleType: "none", fontWeight: "bold"}} key={i}> {book} </li>);
                            })}
                        </ul>
                    </div>
                    <div className="form-group">
                        <label htmlFor="actualBook">Book(s)</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="actualBook" value={this.state.actualBook} onChange={this.onFieldChange} aria-label="Book's name" />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" id="button-addon2" onClick={(event) => { this.addBook(this.state.actualBook) }}>Add Book</button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

function AddAuthorForm({ onAddAuthor }) {
    return (
        <div className="container-fluid add-author-form">
            <div className="jumbotron col-10 offset-1">
                <h1 className="text-center">Add Author</h1>
                <AuthorForm onAddAuthor={onAddAuthor} />
            </div>
        </div>
    );
}

export default AddAuthorForm;