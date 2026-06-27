export type Weekends = 'Yes' | 'No';

export type TargetClass =
  | 'Healthy'
  | 'Risk of burnout'
  | 'Vacation required'
  | 'Critical condition';

export type TrainingRecord = {
  sleep: number;
  meetings: number;
  weekends: Weekends;
  stress: number;
  target: TargetClass;
};

export type FeatureName = 'sleep' | 'meetings' | 'weekends' | 'stress';

export type NumericFeatureName = Exclude<FeatureName, 'weekends'>;

export type NumericOperator = '<=' | '>';

export type CategoricalOperator = '=';

export type ClassCounts = Record<TargetClass, number>;

interface DecisionNodeBase {
  type: 'decision';
  left: TreeNode;
  right: TreeNode;
  samples: number;
  entropy: number;
  informationGain: number;
}

export interface NumericDecisionNode extends DecisionNodeBase {
  feature: NumericFeatureName;
  threshold: number;
  operator: NumericOperator;
}

export interface CategoricalDecisionNode extends DecisionNodeBase {
  feature: 'weekends';
  categoryValue: Weekends;
  operator: CategoricalOperator;
}

export type DecisionNode = NumericDecisionNode | CategoricalDecisionNode;

export interface LeafNode {
  type: 'leaf';
  prediction: TargetClass;
  samples: number;
  classCounts: ClassCounts;
  entropy: number;
}

export type TreeNode = DecisionNode | LeafNode;
