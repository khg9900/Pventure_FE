export interface PageUIConfig {
  header: boolean;
  floatingButton: boolean;
  floatingIcon?: "plus";
  floatingAction?: string;
  sidebar?: boolean;
  bgColor?: string;
}

export const PAGE_UI_CONFIG: Record<string, PageUIConfig> = {
  "/": {
    header: false,
    floatingButton: false,
    bgColor: "#fefaf7ff",
  },
  "/login": {
    header: false,
    floatingButton: false,
    bgColor: "#FFFFFF",
  },
  "/calendar": {
    header: true,
    floatingButton: true,
    floatingIcon: "plus",
    floatingAction: "/trips/new",
    bgColor: "#FFFFFF",
  },
  "/folders": {
    header: true,
    floatingButton: false,
    bgColor: "#FFFFFF",
  },
  "/folders/:id": {
    header: true,
    floatingButton: true,
    floatingIcon: "plus",
    floatingAction: "/trips/new",
    bgColor: "#FFFFFF",
  },
    "/trips/new": {
    header: false,
    floatingButton: false,
    bgColor: "#FFFFFF",
  },
    "/trips/:tripId": {
    header: false,
    floatingButton: false,
    bgColor: "#FFFFFF",
  },
  "/trips/:tripId/edit": {
    header: false,
    floatingButton: false,
    bgColor: "#FFFFFF",
  },
};

export const PAGE_TITLE_CONFIG: Record<string, string> = {
  "/": "Pventure",
  "/login": "로그인",
  "/calendar": "캘린더",
  "/folders": "여행 폴더",
  "/folders/:id": "폴더 상세",
  "/trips/new": "여행 생성",
  "/trips/:tripId": "일정 상세",
  "/trips/:tripId/edit": "일정 수정",
};