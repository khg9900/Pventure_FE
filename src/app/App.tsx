import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/shared/layout/AppLayout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import FolderListPage from "@/pages/FolderListPage";
import FolderDetailPage from "@/pages/FolderDetailPage";
import CalendarPage from "@/pages/CalendarPage";
import SchedulePage from "@/pages/SchedulePage";
import ScheduleEditPage from "@/pages/ScheduleEditPage";
import CreateTripPage from "@/pages/CreateTripPage";
import EditTripPage from "@/pages/EditTripPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/folders" element={<FolderListPage />} />
          <Route path="/folders/:id" element={<FolderDetailPage />} />
          <Route path="/trips/new" element={<CreateTripPage />} />
          <Route path="/trips/:tripId/edit" element={<EditTripPage />} />
          <Route path="/trips/:tripId/schedule" element={<SchedulePage />} />
          <Route path="/trips/:tripId/schedule/edit" element={<ScheduleEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};