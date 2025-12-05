"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/logout', {
          method: 'POST',
          credentials: 'include', 
        });

        if (!response.ok) {
          console.error('Logout failed');
        }
        
        localStorage.removeItem('token');
        sessionStorage.clear();
        
        router.replace('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        router.replace('/login'); 
      } finally {
        setLoading(false);
      }
    };

    logoutUser();
  }, [router]);
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Logging out...</h1>
        <p>Please wait.</p>
      </div>
    );
  }

}