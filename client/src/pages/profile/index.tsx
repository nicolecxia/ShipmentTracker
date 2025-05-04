import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession({ 
      required: true,
      onUnauthenticated() {
        router.push(`${window.location.origin}/auth/signin`);
      } });

  if (status === "loading") return <div>Loading...</div>;

  if (!session) return <div>You are not signed in</div>;

  return (
    <div style={{ padding: '50px' }}>
      <h1>Profile</h1>
      <div>
        <img 
          src={session.user.image} 
          alt={session.user.name}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}