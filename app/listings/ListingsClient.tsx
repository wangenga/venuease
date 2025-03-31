'use client';

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';

import { SafeListing, SafeUser } from '../types'

import Container from '../Comp/Container';
import Heading from '../Comp/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../Comp/listings/ListingCard';
import Button from '../Comp/Button';

interface ListingsClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const ListingsClient: React.FC<ListingsClientProps> = ({
    listings, currentUser
}) => {
    const router = useRouter();
    const [ deletingId, setDeletingId ] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)

        .then(() => {
            toast.success("Listing Deleted");
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error)
        })
        .finally(() => {
            setDeletingId('');
        });
    }, [router])
  return (
    <>
        <div className='pt-24'></div>
        <Container>
            <div className="flex items-center justify-between">
                <Heading 
                    title='Properties'
                    subtitle='List of your properties'
                />
                <div>
                    <Button 
                        outline
                        className="w-auto px-4" 
                        label="View Report"
                        onClick={() => {}}
                        
                    />
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 " >
                {listings.map((listing) => (
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="Delete Listing"
                    currentUser={currentUser}
                    hideInclusions={true} // Hide "without inclusions"
                    />
                ))}
                </div>
        </Container>
    </>
  )
}

export default ListingsClient