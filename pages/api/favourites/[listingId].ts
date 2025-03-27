//pages/api/favourites/[listingId].ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb";
import { getCurrentUserInternal } from "../getCurrentUserInternal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const currentUser = await getCurrentUserInternal(req, res);
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { listingId } = req.query;
    if (!listingId || typeof listingId !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    if (!favoriteIds.includes(listingId)) {
      favoriteIds.push(listingId);
    }

    try {
      const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds },
      });
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error updating favourites:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    const currentUser = await getCurrentUserInternal(req, res);
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { listingId } = req.query;
    if (!listingId || typeof listingId !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const favoriteIds = currentUser.favoriteIds || [];
    const newFavoriteIds = favoriteIds.filter((id: string) => id !== listingId);

    try {
      const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds: newFavoriteIds },
      });
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error removing favourite:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
