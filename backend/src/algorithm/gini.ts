import type { TargetClass, TrainingRecord } from '../models/tree.js';

/**
 * Computes Gini impurity for a set of training records.
 *
 * Gini impurity measures how often a randomly chosen record would be
 * misclassified if labels were assigned according to class distribution:
 *   G(S) = 1 - Σ p(c)²
 *
 * A value of 0 means every record belongs to the same class.
 * Higher values mean the classes are more evenly mixed.
 */
export function calculateGini(records: TrainingRecord[]): number {
  // Step 1: Handle the empty set — no labels means no impurity.
  if (records.length === 0) {
    return 0;
  }

  // Step 2: Count how many records belong to each target class.
  const classCounts = new Map<TargetClass, number>();

  for (const record of records) {
    const currentCount = classCounts.get(record.target) ?? 0;
    classCounts.set(record.target, currentCount + 1);
  }

  const totalRecords = records.length;

  // Step 3: Convert counts into probabilities and sum their squared values.
  // Formula: G = 1 - Σ(p²)
  let sumOfSquaredProbabilities = 0;

  for (const count of classCounts.values()) {
    const probability = count / totalRecords;
    sumOfSquaredProbabilities += probability * probability;
  }

  // Step 4: Return Gini impurity as a single number.
  return 1 - sumOfSquaredProbabilities;
}
