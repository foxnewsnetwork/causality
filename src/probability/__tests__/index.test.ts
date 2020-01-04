import { sample, Probability } from "..";

enum SmokingGene {
  YES = "YES",
  NO = "NO"
}

describe("probability/index.ts", () => {
  describe("function sample", () => {
    const RUN_COUNT = 5000;
    const distribution = new Set<[SmokingGene, Probability]>([
      [SmokingGene.YES, 0.25],
      [SmokingGene.NO, 0.75]
    ]);

    const countMap = new Map<SmokingGene, number>([
      [SmokingGene.YES, 0],
      [SmokingGene.NO, 0]
    ]);
    
    for (let i = 0; i < RUN_COUNT; i++) {
      const variable = sample(distribution);
      countMap.set(variable, countMap.get(variable) + 1);
    }

    const yesRatio = countMap.get(SmokingGene.YES) / RUN_COUNT;
    const noRatio = countMap.get(SmokingGene.NO) / RUN_COUNT;
    test("the generated ratio should approx match the distribution", () => {
      expect(yesRatio).toBeCloseTo(0.25);
      expect(noRatio).toBeCloseTo(0.75);
    });
  });
});
