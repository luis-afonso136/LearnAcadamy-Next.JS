import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Book,
  Home,
  LogOut,
  Package,
  PanelBottom,
  Settings2,
  User,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

export function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside
        className="fixed inset-y-0 left-0 z-10 w-14 border-r
        bg-background sm:flex flex-col
        "
      >
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary
                     text-primary-foreground rounded-full"
            >
              <Package className="h-4 w-4" />
              <span className="sr-only">Sidebar</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground
                  transition-colors hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/cursos"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground
                  transition-colors hover:text-foreground"
                >
                  <Book className="h-5 w-5" />
                  <span className="sr-only">Cursos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Cursos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/profile"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground
                  transition-colors hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground
                  transition-colors hover:text-foreground"
                >
                  <Settings2 className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
}
