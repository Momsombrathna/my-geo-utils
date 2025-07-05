const { getTravelEstimate } = require("../src/geo/distance");

describe("getTravelEstimate()", () => {
  test("returns correct distance and time from Phnom Penh to Bangkok", () => {
    const result = getTravelEstimate(11.5564, 104.9282, 13.7563, 100.5018, 60);

    expect(parseFloat(result.distanceKm)).toBeGreaterThan(500);
    expect(parseFloat(result.distanceKm)).toBeLessThan(600);
    expect(result.estimatedTime).toMatch(/\d+h \d+m/);
    expect(result.averageSpeed).toBe(60);
  });

  test("returns different time for different speed", () => {
    const fast = getTravelEstimate(11.5564, 104.9282, 13.7563, 100.5018, 120); // fast car
    const slow = getTravelEstimate(11.5564, 104.9282, 13.7563, 100.5018, 30); // slow bus

    expect(parseFloat(fast.estimatedTime)).not.toEqual(
      parseFloat(slow.estimatedTime)
    );
    expect(parseFloat(fast.distanceKm)).toBeCloseTo(
      parseFloat(slow.distanceKm)
    );
  });
});
