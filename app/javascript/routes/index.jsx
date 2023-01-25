import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Posts from "../components/Posts";
import Post from "../components/Post";
import EditPost from "../components/EditPost";
import NewPost from "../components/NewPost";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/edit/:id" element={ <EditPost />} />
      <Route path="/post" element={<NewPost />} />
    </Routes>
  </Router>
);