import { Outlet, useLocation, matchPath } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatingButtonManager from "./FloatingButtonManager";
import { PAGE_UI_CONFIG, PAGE_TITLE_CONFIG } from "../config/pageConfig";
import { colors } from "@/theme/colors";

const defaultConfig = {
  header: true,
  sidebar: true,
  floatingButton: true,
  bgColor: colors.background,
};

function getMatchedConfig<T>(map: Record<string, T>, path: string): T | null {
  for (const [pattern, value] of Object.entries(map)) {
    if (matchPath({ path: pattern, end: true }, path)) return value;
  }
  return null;
}

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const config = getMatchedConfig(PAGE_UI_CONFIG, pathname) ?? defaultConfig;
  const pageTitle = getMatchedConfig(PAGE_TITLE_CONFIG, pathname) ?? "Pventure";

  useEffect(() => {
    document.title = pageTitle;
  }, [pathname]);

  return (
    <div
      className="app-shell layout"
      style={{
        backgroundColor: config.bgColor ?? colors.background,
        transition: "background-color 0.4s ease",
      }}
    >
      {config.sidebar !== false && (
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}

      {config.header && <Header onMenuClick={() => setIsMenuOpen(true)} />}

      <main className="app-main">
        <Outlet />
      </main>

      {!isMenuOpen && <FloatingButtonManager />}
    </div>
  );
}
