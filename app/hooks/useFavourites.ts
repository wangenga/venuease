import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";
import useLoginModal from "./useLoginModal";

interface IUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    // Assumes currentUser.favoriteIds is an array of listing ids
    return currentUser?.favoriteIds?.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (hasFavourited) {
        await axios.delete(`/api/favourites/${listingId}`);
      } else {
        await axios.post(`/api/favourites/${listingId}`);
      }
      router.refresh();
      toast.success("Favourite updated successfully!");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [currentUser, hasFavourited, listingId, loginModal, router]);

  return { hasFavourited, toggleFavourite };
};

export default useFavourite;
