export enum Routes {
  SANDBOX_TENSORFLOW = "/sandbox-tensorflow",
  SANDBOX_VIDEO = "/sandbox-video",
  MODEL_HUB = "/model-hub",
}

function* _routeMap(): Generator<[Routes, string]> {
  yield [Routes.SANDBOX_TENSORFLOW, 'sandbox tensorflow']
  yield [Routes.SANDBOX_VIDEO, 'sandbox video']
  yield [Routes.MODEL_HUB, 'model hub']
}

export const RouteMap: Map<Routes, string> = new Map(_routeMap())
