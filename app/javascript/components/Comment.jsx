import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const url = `/api/v1/comments/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setComment(response))
      .catch(() => navigate(`/posts`));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteComment = () => {
    const url = `/api/v1/comments/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate(`/posts`))
      .catch((error) => console.log(error.message));
  };

  const commentContent = addHtmlEntities(comment.content);
  
  return (
    <div className="">
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Your Comment</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${commentContent}`,
              }}
            />
            <h5>{comment.commenter}</h5>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteComment}
            >
              Delete Comment
            </button>
            <button 
                type="button" 
                className="btn btn-warning" 
                onClick={() => navigate(`/comment/edit/${params.id}`)}
            >
                Edit Comment
            </button>
          </div>
        </div>
        <Link to="/posts" className="btn btn-link">
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default Post;