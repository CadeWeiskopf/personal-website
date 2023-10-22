import { ReactElement } from "react";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Chat from "./pages/chat/Chat";

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
    navLabel: "Get in touch",
  },
  {
    path: "/chat",
    component: <Chat />,
    navLabel: "Chat with community",
  },
];
export default routes;
