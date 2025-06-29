import { useEffect, useState } from "react";
import axiosInstance from "../../hooks/useAxiosInstance";

const TrackUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/admin/users/track");
        setUsers(res.data.users || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Group users by IP address
  const usersByIp = users.reduce((acc, user) => {
    if (!acc[user.ip]) acc[user.ip] = [];
    acc[user.ip].push(user);
    return acc;
  }, {});

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleSuspend = async (userId) => {
    if (!window.confirm("Suspend this user for 48 hours?")) return;
    try {
      await axiosInstance.patch(`/api/admin/users/${userId}/suspend`);
      // Refresh the users list
      const res = await axiosInstance.get("/api/admin/users/track");
      setUsers(res.data.users || []);
    } catch (err) {
      alert("Failed to suspend user");
    }
  };

  const handleUnsuspend = async (userId) => {
    if (!window.confirm("Unsuspend this user?")) return;
    try {
      await axiosInstance.patch(`/api/admin/users/${userId}/unsuspend`);
      // Refresh the users list
      const res = await axiosInstance.get("/api/admin/users/track");
      setUsers(res.data.users || []);
    } catch (err) {
      alert("Failed to unsuspend user");
    }
  };

  const formatSuspensionTime = (suspensionEndsAt) => {
    if (!suspensionEndsAt) return null;
    const endTime = new Date(suspensionEndsAt);
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Expired";
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Track Users</h2>
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Track Users</h2>
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Track Users</h2>
      {Object.keys(usersByIp).length === 0 ? (
        <div className="text-center py-12 text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          {Object.entries(usersByIp).map(([ip, users]) => (
            <div key={ip} className="mb-8 border rounded-lg shadow bg-base-100">
              <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between bg-base-200">
                <div>
                  <span className="font-semibold">IP Address:</span> {ip}
                  <span className="ml-4 font-semibold">Device:</span> {users[0].device || "Unknown"}
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  {users.length > 1 ? `${users.length} accounts from this IP` : "1 account from this IP"}
                </div>
              </div>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Suspension Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="font-bold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString()}<br />
                        <span className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleTimeString()}</span>
                      </td>
                      <td>
                        {user.suspended ? (
                          <span className="badge badge-error">Suspended</span>
                        ) : (
                          <span className="badge badge-success">Active</span>
                        )}
                      </td>
                      <td>
                        {user.suspended && user.suspensionEndsAt ? (
                          <div className="text-sm">
                            <div className="font-medium text-red-600">
                              {formatSuspensionTime(user.suspensionEndsAt)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Until: {new Date(user.suspensionEndsAt).toLocaleString()}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-error btn-xs mr-2"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        {user.suspended ? (
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() => handleUnsuspend(user._id)}
                          >
                            Unsuspend
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning btn-xs"
                            onClick={() => handleSuspend(user._id)}
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackUser; 