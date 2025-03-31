// app/admin/listings/page.tsx (Server Component)
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import AdminLayout from "../AdminLayout";
import Container from "@/app/Comp/Container";
import AdminListingsClient from "../AdminListingsClient";
import { SafeListing } from "@/app/types"; // SafeListing is defined with createdAt as string
import ExportPdfButton from "@/app/Comp/ExportPdfButton";

const AdminListingsPage = async () => {
  // Check if the current user is admin
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.email !== "daisyimg65@gmail.com") {
    redirect("/");
  }

  // Fetch all listings with booking count
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: { select: { bookings: true } },
    },
  });

  // Convert dates to strings
  const safeListings: SafeListing[] = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return (
    <AdminLayout>
      <Container>
        <AdminListingsClient initialListings={safeListings} />
      </Container>
    </AdminLayout>
  );
};

export default AdminListingsPage;
