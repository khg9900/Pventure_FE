import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { useAuth } from "../hooks/useAuth";

const PROVIDERS = [
  {
    id: "google",
    label: "Google로 계속하기",
    icon: <FcGoogle className="w-5 h-7" />,
    className:
      "border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] text-[var(--color-text-main)]",
  },
  {
    id: "kakao",
    label: "Kakao로 계속하기",
    icon: <RiKakaoTalkFill className="w-5 h-7 text-[#3A1D1D]" />,
    className: "bg-[#FEE500] hover:bg-[#FDD835] text-[#3A1D1D]",
  },
  {
    id: "naver",
    label: "Naver로 계속하기",
    icon: <SiNaver className="w-5 h-7 text-white" />,
    className: "bg-[#03C75A] hover:bg-[#02B754] text-white",
  },
] as const;

export default function LoginButtons() {
  const { loginWithProvider } = useAuth();

  return (
    <div className="flex flex-col gap-2.5">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.id}
          onClick={() => loginWithProvider(provider.id)}
          className={`flex items-center justify-center gap-3 py-2.5 rounded-md transition ${provider.className}`}
        >
          {provider.icon}
          <span className="text-sm font-medium">{provider.label}</span>
        </button>
      ))}
    </div>
  );
}
