import { useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import type { PredictionResult } from '../types/prediction';
import { convertTreeToFlow, type SerializedTreeNode } from '../utils/treeToFlow';

interface TreeVisualizerProps {
  tree: SerializedTreeNode | null;
  result: PredictionResult | null;
}

interface HoveredNodeData {
  label: string;
  samples: number;
  entropy: number;
  informationGain?: number;
  prediction?: string;
  type: 'decision' | 'leaf';
}

function FlowContent({ tree, result }: TreeVisualizerProps) {
  const { fitView } = useReactFlow();
  const [hoveredNode, setHoveredNode] = useState<HoveredNodeData | null>(null);

  const { nodes, edges } = useMemo(() => {
    if (!tree) {
      return { nodes: [], edges: [] };
    }

    return convertTreeToFlow(tree, result?.path ?? []);
  }, [tree, result]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.25, duration: 300 });
    }, 50);

    return () => clearTimeout(timer);
  }, [nodes, edges, fitView]);

  return (
    <div className="tree-flow-inner">
      {hoveredNode && (
        <div className="node-tooltip">
          <strong>{hoveredNode.label}</strong>
          <span>Type: {hoveredNode.type}</span>
          <span>Samples: {hoveredNode.samples}</span>
          <span>Entropy: {hoveredNode.entropy.toFixed(3)}</span>
          <span>
            Information Gain:{' '}
            {hoveredNode.informationGain !== undefined
              ? hoveredNode.informationGain.toFixed(3)
              : 'N/A'}
          </span>
          {hoveredNode.prediction && (
            <span>Prediction: {hoveredNode.prediction}</span>
          )}
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        onNodeMouseEnter={(_, node) =>
          setHoveredNode(node.data as HoveredNodeData)
        }
        onNodeMouseLeave={() => setHoveredNode(null)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function TreeVisualizer({ tree, result }: TreeVisualizerProps) {
  if (!tree) {
    return (
      <section>
        <h2>Decision Tree Visualization</h2>
        <p>No tree loaded yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Decision Tree Visualization</h2>

      <div className="tree-flow-wrapper">
        <ReactFlowProvider>
          <FlowContent tree={tree} result={result} />
        </ReactFlowProvider>
      </div>
    </section>
  );
}