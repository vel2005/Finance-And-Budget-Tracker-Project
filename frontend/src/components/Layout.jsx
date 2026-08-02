import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;