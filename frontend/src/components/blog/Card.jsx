import React, { useEffect, useState } from "react";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Card = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://mern-blog-website-l5zm.onrender.com/posts"); // Update with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="mt-12">
      <div className="mx-auto container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-3">Loading...</p>
        ) : posts.length > 0 ? (
          posts.map((item) => (
            <div
              className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              key={item._id}
            >
              <div className="mb-5">
                {item.image && (
                  <img
                    src={item.image}
                    alt="blog-img"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <AiOutlineTags className="text-lg text-gray-600" />
                <a href="/" className="text-blue-600 opacity-70 text-sm">
                  #{item.category}
                </a>
              </div>
              <Link to={`/details/${item._id}`}>
                <h3 className="text-lg font-semibold hover:underline">{item.title}</h3>
              </Link>
              <p className="text-gray-500 text-sm mt-2 leading-6">
                {item.description.slice(0, 180)}...
              </p>
              <div className="flex items-center mt-4 text-gray-600 text-sm">
                <AiOutlineClockCircle className="mr-2 text-lg" />
                <span>{new Date(item.timestamp).toDateString()}</span>
                <AiOutlineComment className="ml-4 mr-2 text-lg" />
                <span>27</span>
                <AiOutlineShareAlt className="ml-4 mr-2 text-lg" />
                <span>SHARE</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No posts available.</p>
        )}
      </div>
    </section>
  );
};
