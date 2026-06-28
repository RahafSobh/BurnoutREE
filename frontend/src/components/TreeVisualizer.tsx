import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { convertTreeToFlow, type SerializedTreeNode } from '../utils/treeToFlow';

interface TreeVisualizerProps {
  tree: SerializedTreeNode | null;
}

export default function TreeVisualizer({ tree }: TreeVisualizerProps) {
  if (!tree) {
    return (
      <section>
        <h2>Decision Tree</h2>
        <p>No tree loaded yet.</p>
      </section>
    );
  }

  const { nodes, edges } = convertTreeToFlow(tree);

  return (
    <section>
      <h2>Decision Tree Visualization</h2>

      <div style={{ height: 520, borderRadius: 16, overflow: 'hidden' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </section>
  );
}