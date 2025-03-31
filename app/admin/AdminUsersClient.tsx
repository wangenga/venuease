'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "../Comp/EmptyState";
import Button from "../Comp/Button";
import { SafeUser } from "@/app/types";
import useAddUserModal from "../hooks/useAddUserModal";
import ExportPdfButton from "../Comp/ExportPdfButton";

interface AdminUsersClientProps {
  initialUsers: SafeUser[];
}

const AdminUsersClient: React.FC<AdminUsersClientProps> = ({ initialUsers }) => {
  const router = useRouter();
  const [users, setUsers] = useState<SafeUser[]>(initialUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUserModal = useAddUserModal();

  // Fetch users again (optional) after add/delete if needed
  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data: SafeUser[] = await response.json();
    setUsers(data);
    console.log("success")
  };


    // Delete user function
    const handleDeleteUser = async (id: string) => {
        console.log("Delete function called for user ID:", id);
        const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      
        if (response.ok) {
          ; // Log before fetchUsers()
          await fetchUsers();
          console.log("User deleted successfully")
        } else {
          console.error("Failed to delete user");
        }
      };
      const printRef = React.useRef(null)

      const handleDownloadPdf = () => {

      }
      
      

    if (users.length === 0) {
        return <EmptyState title="No users found" subtitle="Please add a user." />;
    }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Users</h1>
      <div className="flex py-3 flex-row justify-between">
        <Button 
            onClick={() => addUserModal.onOpen()}
            label="Add User" 
            className="w-1/5  px-4 p-2"
        />
        <ExportPdfButton />
        
      </div>

      {/* Users Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Date Created</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
              <Button
                onClick={() => handleDeleteUser(user.id)}
                className=""
                label="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersClient;
