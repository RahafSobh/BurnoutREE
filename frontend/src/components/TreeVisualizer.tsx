import { useEffect, useMemo } from 'react';
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

function FlowContent({ tree, result }: TreeVisualizerProps) {
  const { fitView } = useReactFlow();

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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      fitViewOptions={{ padding: 0.25 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
      <Background />
      <Controls />
    </ReactFlow>
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