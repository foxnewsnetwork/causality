export enum Routes {
  HOME = "/",
  SANDBOX_TENSORFLOW = "/sandbox-tensorflow",
  SANDBOX_VIDEO = "/sandbox-video",
  MODEL_HUB = "/model-hub",
  SANDBOX_APOLLO = "/sandbox-apollo",
  TRAINING_HUB = "/training-hub",
}

function* _routeMap(): Generator<[Routes, string]> {
  yield [Routes.HOME, 'home']
  yield [Routes.SANDBOX_TENSORFLOW, 'sandbox tensorflow']
  yield [Routes.SANDBOX_VIDEO, 'sandbox video']
  yield [Routes.MODEL_HUB, 'model hub']
  yield [Routes.SANDBOX_APOLLO, 'sandbox apollo']
  yield [Routes.TRAINING_HUB, 'training hub']
}

export const RouteMap: Map<Routes, string> = new Map(_routeMap())
