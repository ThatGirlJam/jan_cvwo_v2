import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ category: "" });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setPost(response))
      .catch(() => navigate("/posts"));
  }, [params.id]);

  useEffect(() => {
    const url = "/api/v1/comments/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setComments(res))
      .catch(() => navigate("/"));
  }, []);

  const allComments = comments.map((comment, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{comment.content}</h5>
          <h6 className="card-title">{comment.commenter}</h6>
          <Link to={`/comment/${comment.id}`} className="btn custom-button">
            View
          </Link>
        </div>
      </div>
    </div>
  ));

  const noComment = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No comments yet.
      </h4>
    </div>
  );

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deletePost = () => {
    const url = `/api/v1/destroy/${params.id}`;
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
      .then(() => navigate("/posts"))
      .catch((error) => console.log(error.message));
  };


  const categoryList = () => {
    let categoryList = "No category available";

    if (post.category.length > 0) {
      categoryList = post.category
        .split(",")
        .map((category, index) => (
          <li key={index} className="list-group-item">
            {category}
          </li>
        ));
    }

    return categoryList;
  };

  const postBod = addHtmlEntities(post.bod);
  
  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={post.image}
          alt={`${post.title} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {post.title}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Category</h5>
              {categoryList()}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Description</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${postBod}`,
              }}
            />
            <h5></h5>
            <h5 className="mb-2">Comments</h5>
            <div className="row">
            {comments.length > 0 ? allComments: noComment}
            </div>
            <div className="text-end mb-3">
              <Link to="/comment" className="btn custom-create-button">
                Create New Comment
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deletePost}
            >
              Delete Post
            </button>
            <button 
                type="button" 
                className="btn btn-warning" 
                onClick={() => navigate(`/edit/${params.id}`)}
            >
                Edit Post
            </button>
          </div>
        </div>
        <Link to="/posts" className="btn btn-link custom-back-button">
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default Post;