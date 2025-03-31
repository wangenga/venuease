import Button from "../Comp/Button";
import Container from "../Comp/Container";

import Heading from "../Comp/Heading";
import ListingCard from "../Comp/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
    listings: SafeListing[] ;
    currentUser? : SafeUser | null;
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {

return (
    <>
        <div className='pt-24'></div>
        <Container>
            <div className="flex items-center justify-between">
                <Heading 
                    title='Favorites'
                    subtitle='List of places you like'
                />
                
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 " >
                {listings.map((listing) => (
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                    hideInclusions
                    />
                ))}
                </div>
        </Container>
    </>
  )
}

export default FavoritesClient