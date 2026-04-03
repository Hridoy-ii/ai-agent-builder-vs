import { createBrowserRouter } from "react-router";
import { BuilderPage } from "./pages/builder-page";
import { SavedPage } from "./pages/saved-page";
import { LibraryPage } from "./pages/library-page";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: BuilderPage },
      { path: "saved", Component: SavedPage },
      { path: "library", Component: LibraryPage },
    ],
  },
]);