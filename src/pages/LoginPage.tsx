import logo from "@/assets/brand/pventure_logo.png";
import LoginButtons from "@/features/auth/components/LoginButtons";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 bg-[var(--color-bg)] text-center">

      <div className="flex flex-col items-center mb-8">
        <img
          src={logo}
          alt="Pventure 로고"
          className="w-28 mb-3 select-none drop-shadow-sm"
          draggable="false"
        />
        <h1 className="text-2xl font-bold text-[var(--color-primary)] tracking-tight">
          Pventure
        </h1>
      </div>

      <div className="w-full max-w-sm bg-[var(--color-bg)] rounded-2xl shadow-sm p-6 border border-[var(--color-border)]">
        <LoginButtons />
      </div>

      <p className="text-[11px] text-[var(--color-text-sub)] mt-3 leading-relaxed">
        로그인 시{" "}
        <span className="text-[var(--color-primary)] font-medium">
          이용약관
        </span>{" "}
        및{" "}
        <span className="text-[var(--color-primary)] font-medium">
          개인정보 처리방침
        </span>
        에 동의하게 됩니다.
      </p>
    </div>
  );
}
