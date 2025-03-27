import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { Context } from "../../context/Context";
import "./create.css";
import { ToastContainer, toast } from 'react-toastify';

const Create = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Store image URL
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      username: user?.username,
      category,
      image: imageUrl, // Use image URL instead of file upload
    };

    try {
      const res = await axios.post("https://mern-blog-website-l5zm.onrender.com/posts", postData);
      toast.success("🚀Post created successfully!");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post");
    }
  };

  return (
    <>
      <Navbar />
      <section className="newPost flex justify-center items-center">
        <div className="container boxItems rounded-lg shadow-xl">
          <div className="img">
            <img
              src={imageUrl || "https://images.pexels.com/photos/3183154/pexels-photo-3183154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
              alt="Preview"
              className="image"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-5 py-5">
              <div className="inputGroup mb-2">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  className="border w-full px-2 py-2 rounded"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
              <div className="inputGroup mb-2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="border w-full px-2 py-2 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="inputGroup mb-5">
                <label htmlFor="category">Categories (comma-separated)</label>
                <input
                  type="text"
                  className="border w-full px-2 py-2 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="inputGroup mb-4">
                <label htmlFor="description">Description</label>
                <textarea
                  className="border w-full px-2 py-2 rounded"
                  cols="30"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button className="border w-full px-3 py-2 rounded" type="submit">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Create;
