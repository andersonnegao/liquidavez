// src/app/auth/lojista/page.tsx
import { SignUpLojistaForm } from "@/components/sign-up-lojista-form";

export default function LojistaSignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
            <SignUpLojistaForm />
        </div>
    );
}