import type { PlaceType } from "../constants";

export interface PlaceBase {
  name: string;
  address: string;
  hash?: string;
  links?: string[];
  latitude?: number;
  longitude?: number;
  placeType?: PlaceType;
}

export interface PlaceResponseDto extends PlaceBase {
    id: number;
}