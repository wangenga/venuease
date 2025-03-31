'use client';

import { useEffect } from "react";
import EmptyState from "./Comp/EmptyState";

interface ErrorStateProps {
    error: Error
}
const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect (() => {
        console.error(error);
    }, [error]);

    return (
    <EmptyState
        title="Ooops"
        subtitle="Something went wrong!"
    />
    )
};
export default ErrorState;