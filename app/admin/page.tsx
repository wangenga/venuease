// app/admin/page.tsx (Server Component)
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import AdminLayout from "./AdminLayout";
import Container from "../Comp/Container";
import AdminUsersClient from "./AdminUsersClient";

const AdminPage = async () => {
  // Fetch current user on the server
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.email !== "daisyimg65@gmail.com") {
    redirect("/");
  }

  // Fetch all users (select only needed fields)
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  // Convert dates to strings (for safe serialization)
  const safeUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  return (
    <AdminLayout>
      <Container>
        <AdminUsersClient initialUsers={safeUsers} />
      </Container>
    </AdminLayout>
  );
};

export default AdminPage;

