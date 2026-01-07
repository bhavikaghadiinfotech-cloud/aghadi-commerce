import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesConfig } from "./routes/routesConfig.jsx";

function renderRoutes(routes) {
  return routes.map((r, i) => {
    const Element = r.element;

    // index route
    if (r.index) {
      return <Route key={i} index element={<Element />} />;
    }

    return (
      <Route key={i} path={r.path} element={Element ? <Element /> : undefined}>
        {r.children ? renderRoutes(r.children) : null}
      </Route>
    );
  });
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routesConfig)}</Routes>
    </BrowserRouter>
  );
}
