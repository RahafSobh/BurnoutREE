const API_URL = 'http://localhost:3000/api';

export async function trainModel(records: unknown[]) {
  const response = await fetch(`${API_URL}/train`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(records),
  });

  if (!response.ok) {
    throw new Error('Failed to train model.');
  }

  return response.json();
}

export async function predict(input: {
  sleep: number;
  meetings: number;
  weekends: 'Yes' | 'No';
  stress: number;
}) {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Prediction failed.');
  }

  return response.json();
}

export async function getTree() {
  const response = await fetch(`${API_URL}/tree`);

  if (!response.ok) {
    throw new Error('Failed to load tree.');
  }

  return response.json();
}