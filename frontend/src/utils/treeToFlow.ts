import type { Edge, Node } from 'reactflow';

export interface SerializedTreeNode {
  id: string;
  label: string;
  type: 'decision' | 'leaf';
  samples: number;
  entropy: number;
  informationGain?: number;
  prediction?: string;
  children: SerializedTreeNode[];
}

interface FlowResult {
  nodes: Node[];
  edges: Edge[];
}

function getNodeColors(node: SerializedTreeNode) {
  if (node.type === 'decision') {
    return {
      background: '#eff6ff',
      border: '#2476a8',
    };
  }

  switch (node.prediction) {
    case 'Healthy':
      return {
        background: '#ecfdf5',
        border: '#16a34a',
      };

    case 'Vacation required':
      return {
        background: '#fef9c3',
        border: '#eab308',
      };

    case 'Risk of burnout':
      return {
        background: '#ffedd5',
        border: '#f97316',
      };

    case 'Critical condition':
      return {
        background: '#fee2e2',
        border: '#dc2626',
      };

    default:
      return {
        background: '#ffffff',
        border: '#94a3b8',
      };
  }
}

export function convertTreeToFlow(tree: SerializedTreeNode): FlowResult {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  function walk(
    node: SerializedTreeNode,
    depth: number,
    index: number,
    parentId?: string,
    edgeLabel?: string
  ) {
    const x = index * 260;
    const y = depth * 150;

    const colors = getNodeColors(node);

    nodes.push({
      id: node.id,
      position: { x, y },
      data: {
        label: node.label,
        samples: node.samples,
        entropy: node.entropy,
        informationGain: node.informationGain,
        prediction: node.prediction,
        type: node.type,
      },
      type: 'default',
      style: {
        borderRadius: 14,
        padding: 12,
        border: `2px solid ${colors.border}`,
        background: colors.background,
        minWidth: 170,
        textAlign: 'center',
      },
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        label: edgeLabel,
        animated: false,
        style: {
          strokeWidth: 2,
        },
        labelStyle: {
          fontWeight: 700,
          fill: '#334155',
        },
      });
    }

    node.children.forEach((child, childIndex) => {
      const childGlobalIndex = index * 2 + childIndex;
      const label = childIndex === 0 ? 'Yes' : 'No';

      walk(child, depth + 1, childGlobalIndex, node.id, label);
    });
  }

  walk(tree, 0, 0);

  return { nodes, edges };
}