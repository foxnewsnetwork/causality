export enum Routes {
  SANDBOX_TENSORFLOW = "/",
  SANDBOX_VIDEO = "/sandbox-video"
}

function* _routeMap(): Generator<[Routes, string]> {
  yield [Routes.SANDBOX_TENSORFLOW, 'sandbox tensorflow']
  yield [Routes.SANDBOX_VIDEO, 'sandbox video']
}

export const RouteMap: Map<Routes, string> = new Map(_routeMap())
