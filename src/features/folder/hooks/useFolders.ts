import { useEffect, useState } from "react";
import { MOCK_FOLDERS } from "../mocks/folders.mock";
import { getFolders, createFolder } from "../api/folder.api";
import type { Folder } from "../types/folder.type";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const normalizeFolders = (list: Partial<Folder>[]): Folder[] =>
  list.map((f) => ({
    id: f.id ?? Math.floor(Math.random() * 100000),
    name: f.name ?? "이름없음",
    tripCount: f.tripCount ?? 0,
    createdAt: f.createdAt,
  }));

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (USE_MOCK) {
          if (!mounted) return;
          setFolders(normalizeFolders(MOCK_FOLDERS));
        } else {
          const data = await getFolders();
          if (!mounted) return;
          setFolders(normalizeFolders(data));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const getFolderById = (id: number) => folders.find((f) => f.id === id);

  const addFolder = async (name: string) => {
    if (USE_MOCK) {
      const newFolder: Folder = {
        id: Math.floor(Math.random() * 100000),
        name,
        tripCount: 0,
        createdAt: new Date().toISOString(),
      };
      setFolders((prev) => [...prev, newFolder]);
      return newFolder;
    } else {
      const newFolder = await createFolder(name);
      const normalized = normalizeFolders([newFolder])[0];
      setFolders((prev) => [...prev, normalized]);
      return normalized;
    }
  };

  return { folders, getFolderById, addFolder, loading };
}
