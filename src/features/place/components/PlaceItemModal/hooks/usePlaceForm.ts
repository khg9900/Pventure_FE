import { useState, useEffect } from "react";
import type { PlaceResponseDto } from "@/features/place/types/place";
import type { PlaceType } from "@/features/place/constants";
import { validateLinks, validateName, validateAddress } from "@/features/place/utils/validateFields";

export function usePlaceForm(initialPlace: PlaceResponseDto | null) {
  const [name, setName] = useState(initialPlace?.name ?? "");
  const [address, setAddress] = useState(initialPlace?.address ?? "");
  const [links, setLinks] = useState<string[]>(initialPlace?.links ?? []);
  const [placeType, setPlaceType] = useState<PlaceType | undefined>(
    initialPlace?.placeType
  );

  useEffect(() => {
    setName(initialPlace?.name ?? "");
    setAddress(initialPlace?.address ?? "");
    setLinks(initialPlace?.links ?? []);
    setPlaceType(initialPlace?.placeType);
  }, [initialPlace]);

  const buildPlaceData = (): PlaceResponseDto => ({
    id: initialPlace?.id ?? Date.now(),
    name,
    address,
    links,
    placeType,
  });

  const validateFields = (): string[] => [
    ...validateName(name),
    ...validateAddress(address),
    ...validateLinks(links),
  ];

  return {
    name,
    setName,
    address,
    setAddress,
    links,
    setLinks,
    placeType,
    setPlaceType,
    buildPlaceData,
    validateFields,
  };
}
