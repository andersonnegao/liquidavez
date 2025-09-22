'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { RiSearch2Line } from 'react-icons/ri';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import avatar from '@/images/avatar.png';
import ButtonCircle3 from '@/shared/Button/ButtonCircle3';
import Input from '@/shared/Input/Input';
import Logo from '@/shared/Logo/Logo';
import CartSideBar from '../CartSideBar';
import MenuBar from './MenuBar';

const MainNav = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth');
  };

  return (
    <div className="container flex items-center justify-between py-4 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center gap-5 lg:basis-[60%]">
        <Logo />
        <div className="hidden w-full max-w-1xl items-center gap-5 rounded-full border border-neutral-300 pr-3 lg:flex">
          <Input
            type="text"
            className="border-transparent bg-[hsl(var(--background))] placeholder:text-neutral-500 focus:border-transparent"
            placeholder="try 'Nike Air Jordan'"
          />
          <RiSearch2Line className="text-2xl text-neutral-500" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5">
        <div className="relative hidden lg:block">
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-2xl" />
        </div>

        <div className="flex items-center divide-x bg-[hsl(var(--background))] divide-[hsl(var(--background))]">
          <CartSideBar />
          {user ? (
            <div className="flex items-center gap-2 pl-5">
              <ButtonCircle3 className="overflow-hidden bg-[hsl(var(--background))]" size="w-10 h-10">
                <Image
                  src={avatar}
                  alt="avatar"
                  className="h-full w-full object-cover object-center"
                />
              </ButtonCircle3>
              <span className="hidden text-sm lg:block">{user.email}</span>
              <button
                onClick={handleLogout}
                className="ml-2 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-5">
              <Link href="/auth" className="rounded-full bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 transition-colors">
                Entrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
