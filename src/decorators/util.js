import { getProperty, setProperty } from '../core/descriptor';

const findRoute = (routes, key) => routes.find(routeMeta => routeMeta.key === key);

export const getRoute = (target, key) => {
  const routes = getProperty(target, 'routes');

  if (!routes) {
    return null;
  }

  return findRoute(routes, key);
};

export const setRoute = (target, route) => {
  const routes = getProperty(target, 'routes') || [];
  let isNewRoute = true;

  const newRoutes = routes.map(routeMeta => {
    if (route.key === routeMeta.key) {
      isNewRoute = false;
      return {
        ...routeMeta,
        ...route,
      };
    }

    return routeMeta;
  });

  if (isNewRoute) {
    newRoutes.push(route);
  }

  setProperty(target, 'routes', newRoutes);
};
