// pages/api/listings.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {getCurrentUserInternal} from "@/pages/api/getCurrentUserInternal"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const currentUser = await getCurrentUserInternal(req, res);
  console.log("Current User:", currentUser);

  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const body = req.body;
    const {
      title,
      description,
      imageSrc,
      eventType,
      roomCount,
      bathroomCount,
      capacity,
      location,
      price,
      additionalServices,
    } = body;

    if (
      !title ||
      !description ||
      !imageSrc ||
      !eventType ||
      !roomCount ||
      !bathroomCount ||
      !capacity ||
      !location ||
      !price
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        eventType,
        roomCount,
        bathroomCount,
        capacity,
        locationValue: location.value,
        price: parseInt(price, 10),
        additionalServices,
        userId: currentUser.id,
      },
    });

    return res.status(201).json(listing);
  } catch (error) {
    console.error("Error creating listing:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
