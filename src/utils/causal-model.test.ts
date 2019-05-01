import {
  CausalModel
} from './causal-model'

enum Bonus {
  High,
  Medium,
  Low
}
enum Review {
  Excellent,
  Good,
  Okay,
  Bad
}
enum Rank {
  Principle,
  Staff,
  Senior,
  Standard,
  Junior
}
enum Performance {
  Great,
  Good,
  Okay,
  Bad
}
enum MarketCondition {
  Bubble,
  Bull,
  Bear,
  Depression
}
type WorkModel = {
  bonus: (p: {
    review: Review,
    rank: Rank,
    market: MarketCondition
  }) => Bonus,
  review: (p: {
    performance: Performance,
    market: MarketCondition
  }) => Review,
}
describe('utils/causal-model.ts', () => {
})