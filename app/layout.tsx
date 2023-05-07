import { Bebas_Neue } from "next/font/google";

// eslint-disable-next-line import/order
import { getCurrentUser } from "./actions/getCurrentUser";
import "./globals.css";

import { Nav } from "./components/Nav";
import { MatchModal } from "./components/modals/MatchModal";
import { ToasterProvider } from "./providers/ToasterProvider";

export const metadata = {
  title: "AudioTIn",
  description: "find your voice",
};

const font = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider></ToasterProvider>
        <MatchModal />
        <Nav currentUser={currentUser}></Nav>
        <section className="h-[100svh] box-border pb-20 pt-28">
          {children}
        </section>
      </body>
    </html>
  );
}
