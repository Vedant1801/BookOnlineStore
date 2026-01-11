

import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";

export default function Books() {
  const { books, aToken, getAllBooks, updateBook, deleteBook } =
    useContext(AdminContext);

  const categories = [...new Set(books.map((book) => book.category))];
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editingBook, setEditingBook] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    category: "",
    old_price: "",
    new_price: "",
    about: "",
    rating: "",
    trending: false,
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (aToken) getAllBooks();
  }, [aToken]);

  useEffect(() => {
    if (selectedCategory)
      setFilteredBooks(books.filter((b) => b.category === selectedCategory));
    else setFilteredBooks(books);
  }, [selectedCategory, books]);

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditData({
      title: book.title || "",
      category: book.category || "",
      old_price: book.old_price || "",
      new_price: book.new_price || "",
      about: book.about || "",
      rating: book.rating || "",
      trending: book.trending || false,
      image: book.image || "",
    });
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setEditData({ ...editData, image: URL.createObjectURL(file) });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("category", editData.category);
    formData.append("old_price", editData.old_price);
    formData.append("new_price", editData.new_price);
    formData.append("about", editData.about);
    formData.append("rating", editData.rating);
    formData.append("trending", editData.trending);
    if (imageFile) formData.append("image", imageFile);

    await updateBook(editingBook._id, formData);
    setEditingBook(null);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen p-4">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-white rounded-xl shadow-lg p-5 mb-6 md:mb-0 md:mr-6">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-2">
          📚 Categories
        </h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg font-medium ${
              selectedCategory === ""
                ? "bg-[#3AAFA9] text-white"
                : "hover:bg-[#3AAFA9]/20 text-gray-700"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-2 px-4 rounded-lg font-medium ${
                category === selectedCategory
                  ? "bg-[#3AAFA9] text-white"
                  : "hover:bg-[#3AAFA9]/20 text-gray-700"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category
                )
              }
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Books Area */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
            {selectedCategory ? `${selectedCategory} Books` : "All Books"}
          </h1>
        </div>

        {/* Book Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition-all duration-300"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold truncate">
                  {book.title}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  💰 ₹{book.new_price}
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  📂 {book.category}
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(book)}
                    className="px-3 py-1 bg-[#3AAFA9] text-white rounded-md hover:bg-[#2E8C87]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20">No books found 📭</p>
        )}
      </main>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Edit Book</h2>

            {/* Title */}
            <label className="font-medium">Title</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
            />

            {/* Category */}
            <label className="font-medium">Category</label>
            <select
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
            >
              <option value="">Select Category</option>
              <option value="History">📖 History</option>
              <option value="Finance">📊 Finance</option>
              <option value="Science Fiction">🚀 Science Fiction</option>
              <option value="Fantasy">🌊 Fantasy</option>
              <option value="Biography">👤 Biography</option>
            </select>

            {/* Prices */}
            <label className="font-medium">Old Price</label>
            <input
              type="number"
              value={editData.old_price}
              onChange={(e) =>
                setEditData({ ...editData, old_price: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
            />

            <label className="font-medium">New Price</label>
            <input
              type="number"
              value={editData.new_price}
              onChange={(e) =>
                setEditData({ ...editData, new_price: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
            />

            {/* About */}
            <label className="font-medium">About</label>
            <textarea
              value={editData.about}
              onChange={(e) =>
                setEditData({ ...editData, about: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
              rows="3"
            />

            {/* Rating */}
            <label className="font-medium">Rating (0-5)</label>
            <input
              type="number"
              value={editData.rating}
              onChange={(e) =>
                setEditData({ ...editData, rating: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
              min="0"
              max="5"
            />

            {/* Trending */}
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={editData.trending}
                onChange={(e) =>
                  setEditData({ ...editData, trending: e.target.checked })
                }
                className="mr-2"
              />
              <label className="font-medium">Trending</label>
            </div>

            {/* Image Upload */}
            <label className="font-medium">Thumbnail Image</label>
            {editData.image && (
              <img
                src={editData.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md mb-3 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded-md mb-3"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingBook(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#3AAFA9] text-white rounded-md hover:bg-[#2E8C87]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
