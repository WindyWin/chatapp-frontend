import { Skeleton } from "@mui/material";
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import ErrorFallback from "./component/ui/ErrorFallback";
import router from "./modules/router";
import "./_reset.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>


    <ErrorBoundary
      //when error, show ErrorFallback component
      fallback={<ErrorFallback />}
      onReset={() => window.location.reload()}
    >
      <Suspense
        //when loading show Skeleton component
        fallback={<Skeleton />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
