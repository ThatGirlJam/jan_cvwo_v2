import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewComment = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [commenter, setCommenter] = useState("");

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/comments/create";

    if (content.length == 0 || commenter.length == 0)
      return;

    const body = {
      content: stripHtmlEntities(content),
      commenter,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/post/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new comment.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="content">Your Comment</label>
                <textarea
                className="form-control"
                id="content"
                name="content"
                rows="5"
                required
                onChange={(event) => onChange(event, setContent)}
                />
              <label htmlFor="commentCommenter">Your Name</label>
              <input
                type="text"
                name="commenter"
                id="commentCommenter"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCommenter)}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Comment
            </button>
            <Link to="/posts" className="btn btn-link mt-3">
              Back to posts
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewComment;