// components/ScheduleItemModal/ItemForm.tsx
import MemoField from "./fields/MemoField";
import type { ReturnTypeOfUseScheduleForm } from "./hooks/useScheduleForm";

interface Props {
  form: ReturnTypeOfUseScheduleForm;
}

export default function ScheduleForm({ form }: Props) {
  return (
    <div className="space-y-4">
      {/* Memo Field */}
      <MemoField
        value={form.memo}
        onChange={(v) => form.setMemo(v)}
      />
    </div>
  );
}
