import { Map, List, Image, Wallet } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const tabs = [
    { id: "plan", label: "일정", icon: <List size={22} /> },
    { id: "map", label: "지도", icon: <Map size={22} /> },
    { id: "album", label: "앨범", icon: <Image size={22} /> },
    { id: "budget", label: "예산", icon: <Wallet size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 backdrop-blur-md shadow-md border-t border-gray-100 z-40">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center justify-center text-xs"
            >
              <div
                className={`${
                  isActive ? "text-[var(--color-primary)]" : "text-gray-400"
                } transition-colors`}
              >
                {tab.icon}
              </div>
              <span
                className={`mt-1 ${
                  isActive
                    ? "text-[var(--color-primary)] font-medium"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
