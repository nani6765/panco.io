import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import NavBar from "./content/NavBar";
import DocHead from "./content/DocHead";
import faviconLinks from "./content/faviconLinks";

export const links: LinksFunction = () => [...faviconLinks];

export default function App() {
  return (
    <html lang="en">
      <DocHead />
      <body>
        <NavBar />

        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html>
      <head>
        <title>404</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
