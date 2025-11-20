// utils/validateFields.ts
export function validateLinks(links: string[]): string[] {
  return links
    .map((link, idx) =>
      link && !/^https?:\/\/.+/.test(link)
        ? `링크 ${idx + 1}번이 올바른 URL 형식이 아닙니다`
        : null
    )
    .filter(Boolean) as string[];

}

export function validateName(name: string): string[] {
  if (!name.trim()) return ["장소 이름을 입력해주세요"];
  return [];
}

export function validateAddress(address: string): string[] {
  if (!address.trim()) return ["주소를 입력해주세요"];
  return [];
}
