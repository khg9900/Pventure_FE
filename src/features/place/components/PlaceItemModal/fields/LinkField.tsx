import { useState } from "react";
import { Plus, X, Link2 } from "lucide-react";

interface Props {
  value: string[];
  onChange: (links: string[]) => void;
}

export default function LinkField({ value, onChange }: Props) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = () => {
    if (input.trim()) {
      onChange([...value, input.trim()]);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
        <Link2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
        링크
      </label>

      {/* Input Area */}
      <div className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.01]' : ''}`}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="링크를 입력하세요"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800
                       placeholder-gray-400 
                       focus:outline-none focus:border-[var(--color-primary)] focus:shadow-lg focus:shadow-[var(--color-primary)]/10
                       transition-all"
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!input.trim()}
            className="px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 disabled:bg-gray-200 
                     disabled:cursor-not-allowed text-white rounded-xl 
                     transition-all duration-200 hover:scale-105 active:scale-95
                     disabled:hover:scale-100 shadow-sm hover:shadow-md
                     flex items-center gap-1.5 font-medium"
          >
            <Plus size={18} />
            <span>추가</span>
          </button>
        </div>
      </div>

      {/* Links List */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((link, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between gap-3 
                       bg-gray-50 hover:bg-gray-100
                       border-2 border-gray-200 rounded-xl px-4 py-3
                       transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-lg 
                              flex items-center justify-center
                              border-2 border-gray-200
                              transition-colors">
                  <Link2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                </div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-800 hover:text-[var(--color-primary)]
                           truncate font-medium transition-colors"
                >
                  {link}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="flex-shrink-0 w-7 h-7 rounded-lg
                         bg-white hover:bg-red-50 
                         border-2 border-gray-200 hover:border-red-200
                         flex items-center justify-center
                         transition-all hover:scale-110 active:scale-95
                         group/btn"
              >
                <X size={14} className="text-gray-400 group-hover/btn:text-red-500 transition-colors" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && (
        <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-xl">
          <Link2 className="w-8 h-8 mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">아직 추가된 링크가 없습니다</p>
        </div>
      )}
    </div>
  );
}