import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { RoutePath } from "./route-paths";

const ComponentLoader = (name: string) => lazy(() => import(`pages/${name}`));

const routes = [
  { name: "index", path: RoutePath.Index, exact: true },
  { name: "basic-usage", path: RoutePath.BasicUsage, exact: false },
];

const Routes = (
  <Suspense fallback={null}>
    <Switch>
      {routes.map((item) => (
        <Route
          key={item.name}
          path={item.path}
          exact={item.exact}
          component={ComponentLoader(item.name)}
        />
      ))}
    </Switch>
  </Suspense>
);

export default Routes;
