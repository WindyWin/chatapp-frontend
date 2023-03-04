import { Skeleton } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import ErrorFallback from "./component/ui/ErrorFallback";
import LoadingFallback from "./component/ui/LoadingFallback";
import "./config/axios";
import "./config/firebase";
import router from "./modules/router";
import "./_reset.css";




ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <ErrorBoundary
        //when error, show ErrorFallback component
        fallback={<ErrorFallback />}
        onReset={() => window.location.reload()}
      >
        <Suspense
          //when loading show Skeleton component
          fallback={<LoadingFallback />}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </ErrorBoundary>
    </SnackbarProvider>
  </StrictMode>
);
