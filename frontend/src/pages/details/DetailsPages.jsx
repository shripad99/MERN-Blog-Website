import React, { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import "./details.css";
import "../../components/header/header.css";

export const DetailsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ title: "", description: "" });

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(res.data);
        setUpdatedPost({ title: res.data.title,  description: res.data.description });
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  // Delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        data: { username: post.username }, // Ensure user authorization
      });
      alert("Post deleted successfully!");
      navigate("/"); // Redirect to home after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  // Update post
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/posts/${id}`, {
        username: post.username, // Ensure user authorization
        title: updatedPost.title,
        description: updatedPost.description,
      });
      setPost(res.data);
      setIsEditing(false);
      alert("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <>
      <Navbar />
      {post ? (
        <section className="singlePage flex justify-center items-center">
          <div className="container">
            <div className="left">
              <img src={post.image || "https://via.placeholder.com/500"} alt={post.title} className="rounded" />
            </div>
            <div className="right">
              <div className="buttons">
                <button className="button px-3 py-3 text-white rounded shadow bg-blue-500" onClick={() => setIsEditing(true)}>
                  <BsPencilSquare />
                </button>
                <button className="button px-3 py-3 text-white rounded shadow bg-red-500" onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <p>Author: {post.username}</p>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-3">Edit Post</h2>
            <input
              type="text"
              className="w-full p-2 mb-3 border rounded"
              value={updatedPost.title}
              onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
            />
            <textarea
              className="w-full p-2 mb-3 border rounded"
              rows="10"
              value={updatedPost.description}
              onChange={(e) => setUpdatedPost({ ...updatedPost, description: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
