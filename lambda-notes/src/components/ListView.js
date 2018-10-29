import React from "react";
import "../App.css";
import NoteCard from "./NoteCard";
import {Route} from "react-router-dom";

const ListView = props => {
  return (
    <div className="list-view">
      <h1>Your Notes:</h1>
      <div className="note-card-container">
        {props.notes.map(note => {
          return (
            <NoteCard note={note} key={note._id} viewNote={props.viewNote} />
          );
        })}
      </div>
    </div>
  );
};

export default ListView;