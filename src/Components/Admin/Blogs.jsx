// src/Components/Admin/Blogs.jsx
import { useState, useEffect } from "react";
import { firestore } from "../../Service/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, "blogs"));
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await updateDoc(doc(firestore, "blogs", editingBlog.id), formData);
      } else {
        await addDoc(collection(firestore, "blogs"), formData);
      }
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
      });
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteDoc(doc(firestore, "blogs", id));
      fetchBlogs();
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData(blog);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">Manage Blogs</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow rounded-xl p-4 space-y-3"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Preview"
          className="w-full border p-2 rounded"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded"
          rows="5"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
        >
          {editingBlog ? <FaEdit /> : <FaPlus />}
          {editingBlog ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blogs Table */}
      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Excerpt</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-3 py-2">{b.title}</td>
                  <td className="px-3 py-2">{b.excerpt}</td>
                  <td className="px-3 py-2">{b.date}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
