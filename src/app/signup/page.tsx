'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../firebase';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../firebase';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [type, setType] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  
  const router = useRouter();
 
  const handleUserTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const addUserInFirebase = async ( ) => {
     if (email !== '' && password !== '' && passwordAgain !== '') {
      await addDoc(collection(db, 'users'), {
        email: email.trim(),
        type: type,
       });
     }
  };
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password);
    addUserInFirebase();
    setIsAccepted(true);
    setTimeout(() => {
      router.push("/signin");
    }, 3500); // 2500 milisegundos = 2.5 segundos
  };
  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Crear una cuenta
          </h2>
        </div>

        {isAccepted === false && <>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium leading-6 text-white">
                User Type
              </label>
              <div className="mt-2">
                <select
                  id="userType"
                  name="userType"
                  value={type}
                  onChange={handleUserTypeChange}
                  required
                  className="bg-transparent block w-full rounded-md border-0   py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                >
                  <option value="profesional" className='bg-gray-100 text-black'>Profesional</option>
                  <option value="empresa" className='bg-gray-100 text-black'>Empresa</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password Again
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                onClick={() => signup()}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div></>}
        {isAccepted && <>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Cuenta creada con éxito
          </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Redireccionando al inicio de sesión...
          </h2>
        </>}
      </div>
    </>
  )
}