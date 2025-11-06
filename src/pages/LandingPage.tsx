import logo from "@/assets/brand/pventure_logo.png";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img
        src={logo}
        alt="Pventure 로고"
        className="w-28 mb-8 drop-shadow-md select-none"
        draggable="false"
      />

      <h2 className="text-2xl font-semibold text-[var(--color-text-main)] mb-2">
        설레는 여행, 시작은 가볍게
      </h2>
      <p className="text-[var(--color-text-sub)] mb-8">
        P를 위한 가장 간단한 여행 플래너
      </p>

      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-8 py-3 rounded-full
                   text-white font-medium text-lg shadow-md
                   bg-[var(--color-primary)]
                   hover:bg-[var(--color-accent)]
                   transition-all duration-300 hover:scale-105"
      >
        <span>시작하기</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
