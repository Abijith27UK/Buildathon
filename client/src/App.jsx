import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ClientList from "./pages/ClientList";
import ClientDetails from "./pages/ClientDetails";
import DocumentViewer from "./pages/DocumentViewer";
import Overview from "./pages/clientTabs/Overview";
import Policies from "./pages/clientTabs/Policies";
import Documents from "./pages/clientTabs/Documents";
import Claims from "./pages/clientTabs/Claims";
import BuyPolicy from "./pages/clientTabs/BuyPolicy";
import BuyPolicyDetails from "./pages/clientTabs/BuyPolicyDetails";
import Settings from "./pages/Setting";

function App() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/:id" element={<ClientDetails />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="policies" element={<Policies />} />
              <Route path="policies/buy" element={<BuyPolicy />} />
              <Route path="policies/buy/:id" element={<BuyPolicyDetails />} />
              <Route path="documents" element={<Documents />} />
              <Route path="claims" element={<Claims />} />
            </Route>
            <Route path="/documents" element={<DocumentViewer />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
