// src/app/painel-lojista/page.tsx

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LojistaDashboard } from '@/components/LojistaDashboard'; // Vamos criar este componente a seguir

export default async function PainelLojistaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Se não estiver logado, manda para a página de login
    redirect('/auth');
  }

  // Busca o perfil do usuário para checar a função (role)
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_role')
    .eq('id', user.id)
    .single();

  // Se o perfil não for de lojista, redireciona para a home.
  // Isso impede que clientes acessem o painel.
  if (profile?.user_role !== 'lojista') {
    redirect('/');
  }

  // Busca a loja associada a este lojista
  const { data: store } = await supabase
    .from('stores')
    .select('id, name')
    .eq('owner_id', user.id)
    .single();

  // Busca os produtos da loja, se ela existir
  const { data: products } = store
    ? await supabase.from('products').select('*').eq('store_id', store.id)
    : { data: [] };

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <LojistaDashboard user={user} store={store} products={products || []} />
    </div>
  );
}