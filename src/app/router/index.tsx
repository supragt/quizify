import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/app/constants/router";
import { lazy, Suspense } from "react";
import { Layout } from "@/components/layout";
import { Loader } from "@/shared/ui/loader";

const HomePage = lazy(() => import("@/pages/home"));
const SciencePage = lazy(() => import("@/pages/science"));
const SportPage = lazy(() => import("@/pages/sport"));
const ArtPage = lazy(() => import("@/pages/art"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.home,
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.science,
        element: (
          <Suspense fallback={<Loader />}>
            <SciencePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.sport,
        element: (
          <Suspense fallback={<Loader />}>
            <SportPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.art,
        element: (
          <Suspense fallback={<Loader />}>
            <ArtPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { router };
