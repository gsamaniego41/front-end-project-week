import React from "react";
import "../App.css";
import Modal from "react-modal";

class NoteView extends React.Component {
  constructor(props) {
    super(props);

    this.note = this.props.notes.find(
      note => `${note._id}` === this.props.match.params.id
    );

    this.state = {
      showDelete: false,
      isEditing: false,
      tags: [],
      title: this.note.title,
      textBody: this.note.textBody
    };
  }

  toggleShowDelete = () => {
    this.setState({showDelete: !this.state.showDelete});
  };

  toggleEdit = () => {
    this.setState({isEditing: !this.state.isEditing});
  };

  updateHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = id => {
    console.log(id);
    const {tags, title, textBody} = this.state;
    const updatedNote = {tags, title, textBody};
    this.props.update(id, updatedNote);
    this.setState({tags: [], title: "", textBody: ""});
    this.props.history.push("/notes");
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    this.props.delete(id);
    this.toggleShowDelete();
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div className="note-view">
        {!this.state.isEditing ? (
          <div>
            <div className="edit-delete">
              <span onClick={this.toggleEdit}>edit</span>
              <span onClick={this.toggleShowDelete}>delete</span>
            </div>

            <Modal isOpen={this.state.showDelete} portalClassName="modal">
              <p>Are you sure you want to delete this?</p>
              <div>
                <button
                  className="cancel"
                  onClick={e => this.handleDelete(e, this.note._id)}
                >
                  Delete
                </button>
                <button onClick={this.toggleShowDelete}>No</button>
              </div>
            </Modal>

            <div className="single-note-content">
              <h2>{this.note.title}</h2>
              <p>{this.note.textBody}</p>
            </div>
          </div>
        ) : (
          <div className="new-note">
            <h1>Edit Note:</h1>
            <form onSubmit={() => this.handleSubmit(this.note._id)}>
              <input
                required
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.updateHandler}
              />
              <br />
              <textarea
                required
                cols="30"
                rows="10"
                name="textBody"
                value={this.state.textBody}
                onChange={this.updateHandler}
              />
              <br />
              <button>Save</button>
              <button onClick={this.toggleEdit}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default NoteView;
