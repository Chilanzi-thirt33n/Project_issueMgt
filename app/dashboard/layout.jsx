import Crumbs from "../components/BreadCrumbs";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Nav";
import Copyright from "../components/CopyRight";

export default function DashboardLayout({ children }) {
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
      <body>
        <div className="grid grid-cols-[20rem,1fr] w-screen h-screen bg-gray-200 gap-2">
          {/* Sidebar */}
          <aside className="h-full w-80 text-white p-2">
            <Sidebar />
          </aside>

          {/* Main Section */}
          <main className="flex flex-col h-full overflow-hidden p-2">
            {/* Navigation and Breadcrumbs */}
            <div className="sticky top-0 z-50 bg-gray-200">
              <nav className="rounded-md">
                <Navigation data={user} />
              </nav>
              <header className="p-2">
                <Crumbs />
              </header>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>

            {/* Footer */}
            <footer className="p-4 text-center border-t border-gray-300">
              <Copyright data={CompanyDetails} />
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
