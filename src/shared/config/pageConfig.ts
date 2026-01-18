export interface PageUIConfig {
  header: boolean;
  floatingButton: boolean;
  floatingIcon?: "plus";
  floatingAction?: string;
  sidebar?: boolean;
}

export const PAGE_UI_CONFIG: Record<string, PageUIConfig> = {
  "/": {
    header: false,
    floatingButton: false,
  },
  "/login": {
    header: false,
    floatingButton: false,
  },
  "/calendar": {
    header: true,
    floatingButton: true,
    floatingIcon: "plus",
    floatingAction: "/trips/new",
  },
  "/folders": {
    header: true,
    floatingButton: false,
  },
  "/folders/:id": {
    header: true,
    floatingButton: true,
    floatingIcon: "plus",
    floatingAction: "/trips/new",
  },
  "/trips/new": {
    header: false,
    floatingButton: false,
  },
  "/trips/:tripId/edit": {
    header: false,
    floatingButton: false,
  },
  "/trips/:tripId/schedule": {
    header: false,
    floatingButton: false,
  },
  "/trips/:tripId/schedule/edit": {
    header: false,
    floatingButton: false,
  },
};

export const PAGE_TITLE_CONFIG: Record<string, string> = {
  "/": "Pventure",
  "/login": "로그인",
  "/calendar": "캘린더",
  "/folders": "여행 폴더",
  "/folders/:id": "폴더 상세",
  "/trips/new": "여행 생성",
  "/trips/:tripId/edit": "여행 정보 수정",
  "/trips/:tripId/schedule": "일정 상세",
  "/trips/:tripId/schedule/edit": "일정 수정",
};