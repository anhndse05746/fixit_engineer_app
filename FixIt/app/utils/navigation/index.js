export const getActiveRoute = (state) => {
  const route = state?.routes[state?.index];

  if (route?.state) {
    return getActiveRoute(route.state);
  }

  return route;
};

export const getActiveRouteName = (state) => getActiveRoute(state)?.name;
