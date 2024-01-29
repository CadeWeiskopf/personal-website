import { ReactElement } from "react";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
// import Chat from "./pages/chat/Chat";
import About from "./pages/about/About";

interface IRoute {
  path: string;
  component: ReactElement;
  navLabel: string;
}
const routes: IRoute[] = [
  {
    path: "/",
    component: <Home />,
    navLabel: "Home",
  },
  {
    path: "/contact",
    component: <Contact />,
    navLabel: "Contact",
  },
  {
    path: "/about",
    component: <About />,
    navLabel: "Services",
  },
  // {
  //   path: "/chat",
  //   component: <Chat />,
  //   navLabel: "Free Chat",
  // },
];
export default routes;
