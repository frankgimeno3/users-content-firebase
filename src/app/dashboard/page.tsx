'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
 



export default function Dashboard() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
 

  return (
    <div className="p-8">

      <main className='h-screen bg-zinc-500 '>
        Hola
      </main>
      <button className='text-white' onClick={() => signOut()}> 
            Cerrar sesión
          </button>
    </div>
  )
}

Dashboard.requireAuth = true