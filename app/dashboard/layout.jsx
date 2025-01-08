import Crumbs from "../components/BreadCrumbs";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Nav";

export const metadata = {
  title: "Issue Logger v1.0.0",
  description: "MVP app with Next.js frontend",
};

export default function RootLayout({ children }) {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  };

  return (
    <html lang="en">
      <body className="">
        <div className="grid grid-cols-[auto,1fr] w-screen h-screen p-2 bg-gray-200 gap-2">
          {/* Sidebar */}
          <aside className="w-80 h-full bg-gray-200">
            <Sidebar />
          </aside>

          {/* Main Section */}
          <main className="flex flex-col h-full">
            {/* Navigation and Breadcrumbs */}
            <div className="sticky top-0 z-50 bg-gray-200">
              <nav className="rounded-md">
                <Navigation data={user} />
              </nav>
              <header className="p-2">
                <Crumbs />
              </header>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>

            {/* Footer */}
            <footer className="p-4 text-center bg-gray-200 border-t border-gray-300">
              Footer Content
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
