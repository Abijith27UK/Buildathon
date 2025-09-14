import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/clients", label: "Clients" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-200 p-4">
      <h1 className="text-lg font-bold mb-6">InsureCo</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-2 rounded-lg font-medium text-sm ${
              pathname.startsWith(link.to)
                ? "bg-gray-100 text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
