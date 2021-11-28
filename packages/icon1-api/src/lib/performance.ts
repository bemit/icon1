// converted from `second + nanosecond` to `ms`
export const getPerformanceInMs = (elapsedTime: [number, number]): number => parseInt((((elapsedTime[0] * 1e9) + elapsedTime[1]) / 1e6).toFixed(0))
