import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Sign In</h1>
      <button 
        onClick={() => signIn('google', { callbackUrl: `${window.location.origin}`,prompt: 'select_account'})}
        style={{
          padding: '10px 20px',
          background: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}