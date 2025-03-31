// app/admin/bookings/page.tsx (Server Component)
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import AdminLayout from "../AdminLayout";
import Container from "@/app/Comp/Container";
import AdminBookingsClient from "../AdminBookingsClient";

const AdminBookingsPage = async () => {
  // Ensure only admin can access this page.
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.email !== "daisyimg65@gmail.com") {
    redirect("/");
  }

  // Fetch all bookings including listing (with owner) and booking user.
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      listing: {
        include: {
          user: true, // Listing owner
        },
      },
      user: true, // Booked by user
    },
  });

  // Transform data into a "safe" shape for the client (convert dates to strings)
  const safeBookings = bookings.map((booking) => ({
    ...booking,
    createdAt: booking.createdAt.toISOString(),
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    listing: booking.listing
      ? {
          ...booking.listing,
          createdAt: booking.listing.createdAt.toISOString(),
          // Ensure listing.user is safely transformed:
          user: booking.listing.user
            ? {
                name: booking.listing.user.name,
                email: booking.listing.user.email,
              }
            : null,
        }
      : null,
    user: booking.user
      ? {
          name: booking.user.name,
          email: booking.user.email,
        }
      : null,
  }));

  return (
    <AdminLayout>
      <Container>
        <AdminBookingsClient initialBookings={safeBookings} />
      </Container>
    </AdminLayout>
  );
};

export default AdminBookingsPage;
