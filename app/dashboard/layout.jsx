import Crumbs from "../components/BreadCrumbs";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Nav";
import Copyright from "../components/CopyRight";

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

  const CompanyDetails = {
    name: "TechValley",
    address: "123 Main St, Anytown, USA",
    phone: "555-555-5555",
    email: "info@company.com",
    website: "https://www.techvalleyzambia.com/",
  };

  return (
    <html lang="en">
      <body className="w-screen bg-gray-200 h-screen">
        <div className="grid grid-cols-[auto,1fr] w-full h-full ">
          {/* Sidebar (Fixed Position) */}
          <aside className="fixed left-0 top-0 w-80 h-full b p-2 z-40">
            <Sidebar />
          </aside>

          {/* Main Section */}
          <main className="ml-80 h-full flex flex-col p-3">
            {/* Navigation and Breadcrumbs (Fixed) */}
            <div className="sticky top-0 z-50 bg-gray-200">
              <nav className="rounded-md">
                <Navigation data={user} />
              </nav>
              <header className="p-2">
                <Crumbs />
              </header>
            </div>

            {/* Main Content (scrollable in Y-axis only) */}
            <div className="flex-1 overflow-y-auto p-4 w-full flex-grow">
              {children}
            </div>

            {/* Footer */}
            <footer className="p-4 text-center border-t border-gray-300 ">
              <Copyright data={CompanyDetails} />
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
