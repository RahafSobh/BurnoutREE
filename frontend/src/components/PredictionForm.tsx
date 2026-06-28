import { useState } from 'react';
import type { PredictionInput } from '../types/prediction';

interface PredictionFormProps {
  onPredict: (input: PredictionInput) => void;
}

export default function PredictionForm({
  onPredict,
}: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionInput>({
    sleep: 7,
    meetings: 5,
    stress: 5,
    weekends: 'Yes',
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === 'weekends'
          ? value
          : Number(value),
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onPredict(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Burnout Prediction</h2>

      <label>
        Sleep
        <input
          type="number"
          name="sleep"
          value={formData.sleep}
          onChange={handleChange}
        />
      </label>

      <label>
        Meetings
        <input
          type="number"
          name="meetings"
          value={formData.meetings}
          onChange={handleChange}
        />
      </label>

      <label>
        Stress
        <input
          type="number"
          name="stress"
          value={formData.stress}
          onChange={handleChange}
        />
      </label>

      <label>
        Weekends
        <select
          name="weekends"
          value={formData.weekends}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>

      <button type="submit">
        Predict
      </button>
    </form>
  );
}