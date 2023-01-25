import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [bod, setBod] = useState("");

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
    const url = "/api/v1/posts/create";

    if (title.length == 0 || category.length == 0 || bod.length == 0)
      return;

    const body = {
      title,
      category,
      bod: stripHtmlEntities(bod),
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
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="postTitle">Post Title</label>
              <input
                type="text"
                name="title"
                id="postTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postCategory">Category</label>
              <input
                type="text"
                name="category"
                id="postCategory"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCategory)}
              />
              <small id="categoryHelp" className="form-text text-muted">
                Separate each category with a comma.
              </small>
            </div>
            <label htmlFor="bod">Description</label>
            <textarea
              className="form-control"
              id="bod"
              name="bod"
              rows="5"
              required
              onChange={(event) => onChange(event, setBod)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
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

export default NewPost;