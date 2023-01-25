import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditComment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentData, setCommentData] = useState({});
    const [content, setContent] = useState("");
    const [commenter, setCommenter] = useState("");
  
  
    useEffect(() => {
      const url = `/api/v1/comments/edit/${id}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCommentData(data);
          setContent(data.content || "nooo");
          setCommenter(data.commenter || "it's not working");

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
      const url = `/api/v1/comments/update/${id}`;
  
      if (content.length === 0 || commenter.length === 0)
        return;
  
        const body = {
            content: stripHtmlEntities(content),
            commenter,
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
      .then((response) => navigate(`/comment/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit the comment...
          </h1>
            <form onSubmit={onSubmit}>
              <label htmlFor="content">Your Comment</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="5"
                required
                value={content}
                onChange={(event) => onChange(event, setContent)}
              />
              <div className="form-group">
                <label htmlFor="commentCommenter">Your Name</label>
                <input
                  type="text"
                  name="commenter"
                  id="commentCommenter"
                  className="form-control"
                  required
                  value={commenter}
                  onChange={(event) => onChange(event, setCommenter)}
                />
              </div>
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

export default EditComment;
