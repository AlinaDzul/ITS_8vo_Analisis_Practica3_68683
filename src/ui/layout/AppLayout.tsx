import React, { useEffect } from "react"; // Añadimos useEffect
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { Outlet, Navigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { AuthServiceImpl } from "../../infrastructure/services/AuthServiceImpl";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-7xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const authService = new AuthServiceImpl();

  // Verificación inicial
  const isExpired = authService.isTokenExpired();
  if (isExpired) {
    return <Navigate to="/signin" replace />;
  }

  // Verificación periódica mientras estás en una ruta protegida
  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      if (authService.isTokenExpired()) {
        authService.logout(); // Limpia el token y la expiración
        window.location.href = "/signin"; // Redirige al login
      }
    }, 5000); // Verifica cada 5 segundos

    return () => clearInterval(checkTokenExpiration); // Cleanup al desmontar
  }, [authService]);

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;