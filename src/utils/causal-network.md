# Causal Network

Here I document in more detail various tests and stuff

Here is the flowchart of the causal diagram used in the tests

```mermaid
graph TD
  OVEREATING --> BEING_FAT
  LOW_METABOLISM --> BEING_FAT
  EXERCISING --> BEING_FAT
  FAT_GENE --> LOW_METABOLISM
  STRESSED --> OVEREATING
  OVEREATING --> UPSET_STOMACH
  AWFUL_BOSS --> STRESSED
  POVERTY --> STRESSED
```

## Testing d-Separation

- Given OVEREATING, I would like to test that BEING_FAT is d-separated from UPSET_STOMACH