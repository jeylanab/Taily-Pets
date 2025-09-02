// src/Components/Blogs.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import { PawPrint } from "lucide-react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // Track which blog is expanded

  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="p-10 text-gray-600">Loading blogs...</p>;
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id); // toggle expand
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <PawPrint className="text-purple-500" /> Pet Care Blogs
      </h2>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found. Please check back later.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition flex flex-col"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toDateString()}
                </p>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-3">
                  {expandedId === post.id ? post.content : post.excerpt}
                </p>
                <button
                  onClick={() => toggleExpand(post.id)}
                  className="text-purple-600 font-medium hover:underline mt-auto self-start"
                >
                  {expandedId === post.id ? "Show Less ↑" : "Read More →"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
