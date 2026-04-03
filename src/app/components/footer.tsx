import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Nebula Ai Agent Builder
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hridoy-ii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
