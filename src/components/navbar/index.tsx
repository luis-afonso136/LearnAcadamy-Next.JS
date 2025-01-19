import { BookOpen, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white text-black py-4 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo e Nome */}
        <div className="flex items-center">
          <BookOpen className="w-8 h-8 mr-2 text-black" />
          <span className="text-2xl font-semibold">LearnAcademy</span>
        </div>

        {/* Links de navegação */}
        <div className="hidden sm:flex space-x-6">
            <Link href="/login">
          <Button className="flex items-center bg-black text-white border-2 border-black hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-gray-300 rounded-lg px-4 py-2 transition duration-300">
            <LogIn className="w-5 h-5 mr-2 text-white" />
            Login
          </Button>
            </Link>
            <Link href="/register">
          <Button className="flex items-center bg-black text-white border-2 border-black hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-gray-300 rounded-lg px-4 py-2 transition duration-300">
            <User className="w-5 h-5 mr-2 text-white" />
            Register
          </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
