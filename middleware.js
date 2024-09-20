export { default } from "next-auth/middleware"


export const config = {
    matcher:
        [
            '/user/profile/:path*',
            '/admin/panel/:path*',


        ]
}