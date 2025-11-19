// components/ScheduleItemModal/ScheduleItemModal.tsx
import { AnimatePresence, motion } from "framer-motion";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import PlaceItemModal from "@/features/place/components/PlaceItemModal/PlaceItemModal";
import { usePlaceScheduleForm } from "@/features/place/components/PlaceItemModal/hooks/usePlaceScheduleForm";
import type { ScheduleResponseDto } from "@/features/schedule/types/schedule";
import type { PlaceResponseDto } from "@/features/place/types/place";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (schedule: ScheduleResponseDto, place: PlaceResponseDto) => void;
    Schedule?: ScheduleResponseDto | null;
    place?: PlaceResponseDto | null;
    selectedDay: number;
    slot: ScheduleResponseDto["timeSlot"];
}

export default function ScheduleItemModal({ open, onClose, onSave, Schedule, place, selectedDay, slot }: Props) {
    const form = usePlaceScheduleForm(place ?? null, Schedule ?? null, selectedDay, slot ?? "아침식사");
    if (!open) return null;

    const handleSubmit = () => {
        const messages = form.validateFields();
        if (messages.length > 0) {
            messages.forEach(msg => alert(msg));
            return;
        }
        onSave(form.buildScheduleData(), form.buildPlaceData());
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg overflow-hidden"
                    >
                        <ModalHeader slot={slot} selectedDay={selectedDay} Schedule={Schedule} onClose={onClose} />

                        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                            <PlaceItemModal initialPlace={place} initialScheduleMemo={Schedule?.memo} selectedDay={selectedDay} slot={slot} form={form} />
                        </div>

                        <ModalFooter onClose={onClose} onSubmit={handleSubmit} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
