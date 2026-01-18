import { Folder } from "lucide-react";
import SectionField from "@/features/trip/components/TripForm/SectionField";
import FolderSelect from "@/features/folder/components/FolderSelect";

interface Props {
  selected: string;
  onChange: (folderName: string) => void;
}

export default function TripFolderSelect({ selected, onChange }: Props) {
  return (
    <SectionField icon={<Folder />} label="폴더 선택">
      <FolderSelect selected={selected} onChange={onChange} />
    </SectionField>
  );
}
