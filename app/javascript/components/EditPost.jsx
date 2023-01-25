import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState({});
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [bod, setBod] = useState("");
  
  
    useEffect(() => {
      const url = "api/v1/posts/" + String(id);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPostData(data);
          setTitle(data.title || "nooo");
          setCategory(data.category || "it's not working");
          setBod(data.bod || "sorry");

        })
        .catch((error) => console.log(error));
    }, [id]);
  
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
      const url = "api/v1/posts/" + String(id);
  
      if (title.length === 0 || category.length === 0 || bod.length === 0)
        return;
  
        const body = {
            title,
            category,
            bod: stripHtmlEntities(bod),
        };
  
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "PUT",
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
            Edit the post...
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
                  value={title}
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
                  value={category}
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
                value={bod}
                onChange={(event) => onChange(event, setBod)}
              />
              <button type="submit" className="btn custom-button mt-3">
                Update Post
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

export default EditPost;
