// src/components/sign-up-lojista-form.tsx
'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignUpLojistaForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            store_name: storeName,
            user_role: 'lojista',
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      alert('Cadastro realizado! Se a confirmação de e-mail estiver ativa no Supabase, por favor, verifique sua caixa de entrada.');
      router.push('/');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {/* --- INÍCIO DA CORREÇÃO DE COR --- */}
      <Card className="bg-neutral-950 border-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Cadastro de Lojista</CardTitle>
          <CardDescription className="text-neutral-400">Crie sua conta de vendedor para começar a liquidar seu estoque!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="storeName" className="text-neutral-300">Nome da Loja</Label>
                <Input
                  id="storeName"
                  type="text"
                  placeholder="Minha Loja de Tênis"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="bg-neutral-800 text-white border-neutral-700 placeholder:text-neutral-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-neutral-300">Seu Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-800 text-white border-neutral-700 placeholder:text-neutral-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-neutral-300">Crie uma Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-neutral-800 text-white border-neutral-700 placeholder:text-neutral-500"
                />
              </div>
              {/* --- FIM DA CORREÇÃO DE COR --- */}

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Cadastrar Minha Loja'}
              </Button>
            </div>
             <div className="mt-4 text-center text-sm">
              Já tem uma conta?{' '}
              <Link href="/auth" className="underline underline-offset-4">
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}