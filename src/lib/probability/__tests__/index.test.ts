import { sample, Probability } from "..";
import { mutOver, get } from '../../utils/map';

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
      mutOver(countMap, variable, (n = 0) => n + 1)
    }

    const yesRatio = get(countMap, SmokingGene.YES) / RUN_COUNT;
    const noRatio = get(countMap, SmokingGene.NO) / RUN_COUNT;
    test("the generated ratio should approx match the distribution", () => {
      expect(yesRatio).toBeCloseTo(0.25);
      expect(noRatio).toBeCloseTo(0.75);
    });
  });
});
