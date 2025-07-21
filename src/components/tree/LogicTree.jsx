// components/LogicTree.jsx
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import './LogicTree.css';

function LogicTree({ nodes, edges }) {
  return (
    <div className='tree-container'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      />
    </div>
  );
}

export default LogicTree;
