import { useEffect, useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import TreeVisualizer from '../components/TreeVisualizer';
import { getTree, predict, trainModel } from '../services/api';
import type { SerializedTreeNode } from '../utils/treeToFlow';
import type {
  PredictionInput,
  PredictionResult as PredictionResultType,
} from '../types/prediction';

const SAMPLE_DATASET = [
  { sleep: 9, meetings: 1, weekends: 'No', stress: 1, target: 'Healthy' },
  { sleep: 8, meetings: 2, weekends: 'No', stress: 2, target: 'Healthy' },
  { sleep: 8, meetings: 3, weekends: 'No', stress: 3, target: 'Healthy' },
  { sleep: 7, meetings: 2, weekends: 'No', stress: 2, target: 'Healthy' },
  { sleep: 7, meetings: 4, weekends: 'No', stress: 4, target: 'Healthy' },
  { sleep: 6, meetings: 3, weekends: 'No', stress: 5, target: 'Healthy' },

  { sleep: 7, meetings: 6, weekends: 'Yes', stress: 6, target: 'Vacation required' },
  { sleep: 6, meetings: 5, weekends: 'Yes', stress: 6, target: 'Vacation required' },
  { sleep: 6, meetings: 7, weekends: 'No', stress: 6, target: 'Vacation required' },
  { sleep: 5, meetings: 5, weekends: 'Yes', stress: 7, target: 'Vacation required' },
  { sleep: 7, meetings: 8, weekends: 'Yes', stress: 5, target: 'Vacation required' },
  { sleep: 6, meetings: 6, weekends: 'Yes', stress: 7, target: 'Vacation required' },

  { sleep: 5, meetings: 7, weekends: 'Yes', stress: 8, target: 'Risk of burnout' },
  { sleep: 5, meetings: 8, weekends: 'No', stress: 8, target: 'Risk of burnout' },
  { sleep: 4, meetings: 6, weekends: 'Yes', stress: 8, target: 'Risk of burnout' },
  { sleep: 5, meetings: 9, weekends: 'Yes', stress: 7, target: 'Risk of burnout' },
  { sleep: 6, meetings: 9, weekends: 'Yes', stress: 8, target: 'Risk of burnout' },
  { sleep: 4, meetings: 7, weekends: 'No', stress: 9, target: 'Risk of burnout' },

  { sleep: 4, meetings: 9, weekends: 'Yes', stress: 10, target: 'Critical condition' },
  { sleep: 3, meetings: 10, weekends: 'Yes', stress: 10, target: 'Critical condition' },
  { sleep: 2, meetings: 9, weekends: 'Yes', stress: 10, target: 'Critical condition' },
  { sleep: 3, meetings: 8, weekends: 'Yes', stress: 9, target: 'Critical condition' },
  { sleep: 4, meetings: 10, weekends: 'No', stress: 10, target: 'Critical condition' },
  { sleep: 2, meetings: 8, weekends: 'Yes', stress: 9, target: 'Critical condition' },

  // Borderline cases
  { sleep: 8, meetings: 7, weekends: 'Yes', stress: 6, target: 'Vacation required' },
  { sleep: 7, meetings: 7, weekends: 'No', stress: 7, target: 'Vacation required' },
  { sleep: 6, meetings: 8, weekends: 'No', stress: 8, target: 'Risk of burnout' },
  { sleep: 5, meetings: 6, weekends: 'No', stress: 7, target: 'Vacation required' },
  { sleep: 8, meetings: 5, weekends: 'Yes', stress: 7, target: 'Vacation required' },
  { sleep: 6, meetings: 9, weekends: 'No', stress: 9, target: 'Risk of burnout' },
  
] as const;

export default function Home() {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [tree, setTree] = useState<SerializedTreeNode | null>(null);
  const [status, setStatus] = useState('Training sample model...');

  useEffect(() => {
    async function initializeModel() {
      try {
        const trainingResponse = await trainModel([...SAMPLE_DATASET]);
        setTree(trainingResponse.tree);
        setStatus('Model trained successfully.');
      } catch {
        setStatus('Failed to train model.');
      }
    }

    initializeModel();
  }, []);

  async function handlePredict(input: PredictionInput) {
    try {
      setStatus('Predicting...');

      const predictionResult = await predict(input);
      setResult(predictionResult);

      const latestTree = await getTree();
      setTree(latestTree);

      setStatus('Prediction completed.');
    } catch {
      setStatus('Prediction failed.');
    }
  }

  return (
    <main>
      <h1>BurnoutREE 🌳</h1>
      <p>Explainable developer burnout prediction using a custom Decision Tree.</p>

      <p>Status: {status}</p>

      <section className="top-section">
    <PredictionForm onPredict={handlePredict} />

    <PredictionResult result={result} />
</section>

<TreeVisualizer
 tree={tree}
 result={result}
 />
    </main>
  );
} 