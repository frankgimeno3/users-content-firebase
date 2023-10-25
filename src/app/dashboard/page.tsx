'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
 



export default function Dashboard() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [userData, setUserData] = useState("")

  useEffect(() => {
    console.log(session)
      if (session?.data?.user?.email) {
        setUserData(session.data.user.email);
      } else {setUserData("Usuario")}
    }, [session?.data?.user?.email]);
  

  return (
    <div className="p-8">

      <main className='h-screen bg-zinc-500 '>
         <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Bienvenido, {userData}</h2>

      </main>
      <button className='text-white p-3' onClick={() => signOut()}> 
            Cerrar sesión
          </button>
    </div>
  )
}

Dashboard.requireAuth = true