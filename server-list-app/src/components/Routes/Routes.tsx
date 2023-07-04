import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ServerDetails from "../ServerDetails/ServerDetails";
import ServerList from "../ServerList/ServerList";
import Loading from "../Loading/Loading";

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/server/:id" element={<ServerDetails />} />
        <Route path="/" element={<ServerList />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
