// src/features/folder/api/folder.api.ts
import type { Folder } from "../types/folder.type";

// 📂 폴더 목록 조회 (실제 API 붙일 때 아래 axios 주석 해제)
export const getFolders = async (): Promise<Folder[]> => {
  // const res = await axios.get("/api/folders");
  // return res.data as Folder[];

  // mock 샘플(필드 일관성: tripCount 기본 0)
  return [
    { id: 1, name: "국내 여행", createdAt: "2025-10-30", tripCount: 4 },
    { id: 2, name: "해외 여행", createdAt: "2025-10-30", tripCount: 0 },
  ];
};

// ➕ 새 폴더 생성
export const createFolder = async (name: string): Promise<Folder> => {
  // const res = await axios.post("/api/folders", { name });
  // return res.data as Folder;

  // mock: 필드 일관성 유지
  return {
    id: Math.floor(Math.random() * 100000),
    name,
    tripCount: 0,
    createdAt: new Date().toISOString(),
  };
};
