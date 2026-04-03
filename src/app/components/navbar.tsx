import { Link, useLocation } from "react-router";
import { Menu, Bot, Timer, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";

export function Navbar() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-white px-4 lg:px-6 h-16 flex items-center justify-between">
      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button  size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 mt-8">
              <Link
                to="/"
                className={`text-lg px-4 py-2 rounded-lg ${isActive("/") ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Builder
              </Link>
              <Link
                to="/saved"
                className={`text-lg px-4 py-2 rounded-lg ${isActive("/saved") ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Saved
              </Link>
              <Link
                to="/library"
                className={`text-lg px-4 py-2 rounded-lg ${isActive("/library") ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Library
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold text-lg">
            AI Builder
          </span>
        </div>
      </div>

      {/* Desktop Logo & Nav */}
      <div className="hidden lg:flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-indigo-600" />
          <span className="font-semibold text-xl">
            Nebula Ai Agent Builder
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button
              
              className={
                isActive("/")
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "nebula-bg-active"
              }
            >
              Builder
            </Button>
          </Link>
          <Link to="/saved">
            <Button
              className={
                isActive("/saved")
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "nebula-bg-active"
              }
            >
              Saved
            </Button>
          </Link>
          <Link to="/library">
            <Button
              
              className={
                isActive("/library")
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "nebula-bg-active"
              }
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Library
            </Button>
          </Link>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Timer className="h-4 w-4" />
        <span className="hidden sm:inline">
          {time.toLocaleTimeString()}
        </span>
      </div>
    </nav>
  );
}