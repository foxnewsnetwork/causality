export enum Routes {
  HOME = "/",
}

function* _routeMap(): Generator<[Routes, string]> {
  yield [Routes.HOME, 'home']
}

export const RouteMap: Map<Routes, string> = new Map(_routeMap())
