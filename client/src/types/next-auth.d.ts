import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    //   role: string;  // Custom field
    };
    // accessToken?: string;  // Custom token
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     accessToken?: string;
//   }
// }