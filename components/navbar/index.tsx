import { BookOpen, User, LogIn, LogOut } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="py-4 border-b">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo e Nome */}
        <div className="flex items-center">
          <BookOpen className="w-8 h-8 mr-2" />
          <span className="text-2xl font-semibold">LearnAcademy</span>
        </div>

        {/* Links de navegação */}
        <div className="space-x-6">
          {session ? (
            <form action={async () => {
              'use server'
              await auth.api.signOut({
                headers: await headers()
              })
              redirect('/')
            }}>
              <Button type='submit' className={buttonVariants()}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </form>
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
