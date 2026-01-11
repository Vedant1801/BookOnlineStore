


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Users = () => {
  const { users, getAllUser, aToken, editUser: editUserAPI, deleteUser: deleteUserAPI } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aToken) getAllUser();
  }, [aToken]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    await deleteUserAPI(id);
    setLoading(false);
    getAllUser();
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editUser.name || !editUser.email) return alert("Name and Email are required");
    setLoading(true);
    await editUserAPI(editUser._id, editUser);
    setIsEditing(false);
    setLoading(false);
    getAllUser();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Management</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-[#3AAFA9] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created</th>
              <th className="py-3 px-4 text-left">Updated</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-[#3AAFA9]/10 transition duration-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone || "N/A"}</td>
                  <td className="py-3 px-4">{user.gender || "Not Selected"}</td>
                  <td className="py-3 px-4">{user.dob || "Not Selected"}</td>
                  <td className="py-3 px-4 capitalize">{user.role || "N/A"}</td>
                  <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="bg-[#3AAFA9] text-white px-3 py-1 rounded-md hover:bg-[#2E8C87] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={loading}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              value={editUser.phone || ""}
              onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
              placeholder="Phone"
              className="w-full mb-3 p-2 border rounded"
            />

            {/* Gender */}
            <select
              value={editUser.gender || ""}
              onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Role */}
            <select
              value={editUser.role || ""}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            {/* DOB */}
            <input
              type="date"
              value={editUser.dob || ""}
              onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-[#3AAFA9] text-white px-4 py-2 rounded hover:bg-[#2E8C87] disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
