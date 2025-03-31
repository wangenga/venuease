export { default } from "next-auth/middleware" ;

export const config = {
    matcher: [
        "/listings",
        "/events",
        "/bookings",
        "/favorites",
        "/admin",
    ]
}