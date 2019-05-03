import {
  CausalModel
} from './causal-model'

const enum Bonus {
  High,
  Medium,
  Low
}
const enum Review {
  Excellent,
  Good,
  Okay,
  Bad
}
const enum Rank {
  Principle,
  Staff,
  Senior,
  Standard,
  Junior
}
const enum Performance {
  Great,
  Good,
  Okay,
  Bad
}
const enum Skill {
  Rockstar,
  Normal,
  Subpar
}
const enum MarketCondition {
  Bubble,
  Bull,
  Bear,
  Depression
}
type WorkParametrization = {
  bonus: (p: {
    review: Review,
    rank: Rank,
    market: MarketCondition
  }) => Bonus,
  review: (p: {
    performance: Performance,
    market: MarketCondition
  }) => Review,
  rank: () => Rank,
  performance: (p: {
    skill: Skill
  }) => Performance,
  skill: () => Skill,
  MarketCondition: () => MarketCondition
};


describe('utils/causal-model.ts', () => {
})