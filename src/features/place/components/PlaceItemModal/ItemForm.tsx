// ItemForm.tsx
import PlaceNameField from "./fields/PlaceNameField";
import AddressField from "./fields/AddressField";
import LinkField from "./fields/LinkField";
import PlaceTypeSelector from "./fields/PlaceTypeSelector";
import MemoField from "@/features/schedule/components/ScheduleItemModal/fields/MemoField";
import type { PlaceType } from "@/features/place/constants";

interface Props {
  form: {
    name: string;
    setName: (v: string) => void;
    address: string;
    setAddress: (v: string) => void;
    links: string[];
    setLinks: (v: string[]) => void;
    placeType?: PlaceType;
    setPlaceType: (v?: PlaceType) => void;
    memo: string;
    setMemo: (v: string) => void;
  };
}

export default function ItemForm({ form }: Props) {
  return (
    <div className="space-y-4">
      <PlaceNameField value={form.name} onChange={form.setName} />
      <AddressField value={form.address} onChange={form.setAddress} />
      <PlaceTypeSelector value={form.placeType} onChange={form.setPlaceType} />
      <MemoField value={form.memo} onChange={form.setMemo} />
      <LinkField value={form.links} onChange={form.setLinks} />
    </div>
  );
}
