import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import CreateGift from "../pages/CreateGift";
import Viewer from "../pages/Viewer";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateGift />} />
        <Route path="/view/:id" element={<Viewer />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}