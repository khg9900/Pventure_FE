import type { PlaceResponseDto } from "@/features/place/types/place";
import ItemForm from "./ItemForm";
import { usePlaceScheduleForm } from "./hooks/usePlaceScheduleForm";

interface Props {
  initialPlace?: PlaceResponseDto | null;
  initialScheduleMemo?: string;
  selectedDay?: number;
  slot?: string;
  form: ReturnType<typeof usePlaceScheduleForm>;
}

export default function PlaceItemModal({ form }: Props) {
  const mergedForm = {
    name: form.place.name,
    setName: form.place.setName,
    address: form.place.address,
    setAddress: form.place.setAddress,
    links: form.place.links,
    setLinks: form.place.setLinks,
    placeType: form.place.placeType,
    setPlaceType: form.place.setPlaceType,
    memo: form.schedule.memo,
    setMemo: form.schedule.setMemo,
  };

  return <ItemForm form={mergedForm} />;
}
