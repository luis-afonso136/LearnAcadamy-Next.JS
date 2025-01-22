"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { toast } from "../../hooks/use-toast";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { Edit, Trash } from "lucide-react";

interface UserData {
  id?: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // Handle create/update user
  const handleSave = async (userData: UserData) => {
    const method = userData.id ? "PUT" : "POST";
    const url = userData.id ? `/api/user/${userData.id}` : "/api/user";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      toast({ title: "Success", description: "User saved successfully!" });
      setIsDialogOpen(false);
      setSelectedUser(null);
      const updatedUsers = await fetch("/api/user").then((res) => res.json());
      setUsers(updatedUsers);
    } else {
      toast({ title: "Error", description: "Failed to save user." });
    }
  };

  // Handle delete user
  const handleDelete = async (userId: string) => {
    const res = await fetch(`/api/user/${userId}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Success", description: "User deleted successfully!" });
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      toast({ title: "Error", description: "Failed to delete user." });
    }
  };

  return (
    <div className="min-h-screen p-4 sm:ml-14">
      <h1 className="text-xl font-bold mb-4">Admin Panel - Users</h1>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  className="p-2 mr-2 rounded"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDialogOpen(true);
                  }}
                  variant="outline"
                  size="icon"
                  title="Edit User"
                >
                  <Edit className="w-4 h-4"  />
                </Button>
                <Button
                  className="p-2 rounded mr-2"
                  onClick={() => handleDelete(user.id!)}
                  variant="outline"
                  size="icon"
                  color="destructive"
                  title="Delete User"
                >
                  <Trash className="w-4 h-4"  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Create/Edit User */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Edit User" : "Create User"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const userData: UserData = {
                id: formData.get("id") as string | undefined,
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                role: formData.get("role") as string,
                password: formData.get("password") as string | undefined,
              };
              handleSave(userData);
            }}
          >
            {selectedUser?.id && (
              <input type="hidden" name="id" value={selectedUser.id} />
            )}
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              defaultValue={selectedUser?.name || ""}
              required
            />
            <Label htmlFor="email" className="mt-4">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={selectedUser?.email || ""}
              required
            />
            <Label htmlFor="role" className="mt-4">
              Role
            </Label>
            <Select
              name="role"
              value={selectedUser?.role || "ALUNO"}
              onValueChange={(value) =>
                setSelectedUser(
                  (prev) => ({ ...prev, role: value } as UserData)
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="PROFESSOR">Professor</SelectItem>
                <SelectItem value="ALUNO">Aluno</SelectItem>
              </SelectContent>
            </Select>
            {!selectedUser && (
              <>
                <Label htmlFor="password" className="mt-4">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </>
            )}
            <DialogFooter>
              <Button type="submit">
                {selectedUser ? "Update" : "Create"} User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
