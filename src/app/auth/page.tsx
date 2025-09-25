'use client';

import { createClient } from '@/lib/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

// Definimos o componente da página
const AuthPage: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const getRedirectURL = () => {
    return typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : 'http://localhost:3000/auth/callback';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-center text-2xl font-bold text-white mb-4">Bem-vindo!</h2>
          <p className="text-center text-neutral-400 mb-6">Faça login ou crie sua conta para continuar.</p>
          <Auth
            supabaseClient={supabase}
            theme="dark"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(270 60% 55%)',
                    brandAccent: 'hsl(270 100% 70%)',
                    inputText: '#ffffff',
                    inputBackground: '#262626',
                    inputBorder: '#525252',
                    inputLabelText: '#a0a0a0',
                    defaultButtonText: '#ffffff',
                  },
                },
              },
            }}
            providers={['github']}
            redirectTo={getRedirectURL()}
            view="sign_in"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Seu e-mail',
                  password_label: 'Sua senha',
                  button_label: 'Entrar',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  link_text: 'Não tem uma conta? Crie uma',
                },
              },
            }}
          />
        </div>

        <div className="text-center mt-6">
          <Link href="/auth/lojista" className="text-sm text-neutral-400 hover:text-white hover:underline transition-colors">
            É um vendedor? Cadastre sua loja aqui.
          </Link>
        </div>
      </div>
    </div>
  );
};

// Garantimos que o componente seja exportado como padrão
export default AuthPage;