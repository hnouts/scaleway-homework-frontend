import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../Loading/Loading";
const ServerDetails = React.lazy(() => import('../ServerDetails/ServerDetails'));
const ServerList = React.lazy(() => import('../ServerList/ServerList'));

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
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
