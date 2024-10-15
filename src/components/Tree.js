import React, { useState } from 'react';
import './Tree.css'; // Asegúrate de incluir el archivo CSS

const DecisionTreeNode = ({ node, onToggle, depth = 0 }) => {
  return (
    <div className="node-container">
      {/* Línea que conecta el nodo padre con sus hijos */}
      {depth > 0 && <div className="node-line-vertical"></div>}
      
      <button
        onClick={() => onToggle(node.id)}
        className={`node-button ${node.isLeaf ? 'leaf' : ''}`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <span className="mb-1">{node.isLeaf ? '🍃' : '🌳'}</span>
          <span className="font-semibold text-sm break-words">{node.label}</span>
        </div>
      </button>
      
      {/* Nodos hijos */}
      {node.expanded && !node.isLeaf && (
        <div className="node-children-container">
          {node.children.map((child) => (
            <DecisionTreeNode key={child.id} node={child} onToggle={onToggle} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const DecisionTreeInteractive = () => {
  const [treeData, setTreeData] = useState({
    id: 1,
    label: '¿Comprar una casa?',
    expanded: true,
    children: [
      {
        id: 2,
        label: 'Sí',
        expanded: false,
        children: [
          {
            id: 4,
            label: '¿Ubicación?',
            expanded: false,
            children: [
              { id: 8, label: 'Ciudad', isLeaf: true },
              { id: 9, label: 'Suburbio', isLeaf: true },
              { id: 10, label: 'Rural', isLeaf: true }
            ]
          },
          {
            id: 5,
            label: '¿Presupuesto?',
            expanded: false,
            children: [
              { id: 11, label: 'Bajo', isLeaf: true },
              { id: 12, label: 'Medio', isLeaf: true },
              { id: 13, label: 'Alto', isLeaf: true }
            ]
          }
        ]
      },
      {
        id: 3,
        label: 'No',
        expanded: false,
        children: [
          {
            id: 6,
            label: '¿Alquilar?',
            expanded: false,
            children: [
              { id: 14, label: 'Apartamento', isLeaf: true },
              { id: 15, label: 'Casa', isLeaf: true }
            ]
          },
          {
            id: 7,
            label: '¿Otras opciones?',
            expanded: false,
            children: [
              { id: 16, label: 'Vivir con familia', isLeaf: true },
              { id: 17, label: 'Compartir piso', isLeaf: true }
            ]
          }
        ]
      }
    ]
  });

  const [explanation, setExplanation] = useState('');

  const toggleNode = (id) => {
    const updateNode = (node) => {
      if (node.id === id) {
        const newNode = { ...node, expanded: !node.expanded };
        setExplanation(getExplanation(newNode));
        return newNode;
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }
      return node;
    };
    setTreeData(updateNode(treeData));
  };

  const getExplanation = (node) => {
    const explanations = {
      1: "Este árbol de decisión te ayudará a decidir si comprar una casa es la mejor opción para ti.",
      2: "Has decidido comprar una casa. Ahora debes considerar la ubicación y el presupuesto.",
      3: "Has decidido no comprar una casa. Veamos otras opciones de vivienda.",
      4: "La ubicación es crucial. Considera el estilo de vida que deseas y la cercanía a tu trabajo.",
      5: "El presupuesto determinará tus opciones. Asegúrate de incluir todos los costos asociados.",
      6: "Alquilar puede ser una buena opción si no estás listo para comprar o si necesitas flexibilidad.",
      7: "Existen otras opciones que pueden ayudarte a ahorrar dinero o tener compañía.",
      8: "Vivir en la ciudad ofrece comodidades y una vida cultural activa, pero puede ser más costoso.",
      9: "Los suburbios ofrecen un equilibrio entre espacio y acceso a la ciudad.",
      10: "La vida rural ofrece más espacio y tranquilidad, pero puede estar lejos de servicios y trabajo.",
      11: "Un presupuesto bajo limitará tus opciones, pero aún puedes encontrar buenas oportunidades.",
      12: "Un presupuesto medio te da más opciones y flexibilidad en tu búsqueda.",
      13: "Un presupuesto alto te permite considerar propiedades de lujo o en ubicaciones premium.",
      14: "Alquilar un apartamento suele ser más económico y requiere menos mantenimiento.",
      15: "Alquilar una casa te da más espacio, pero puede ser más costoso y requerir más mantenimiento.",
      16: "Vivir con la familia puede ayudarte a ahorrar dinero y fortalecer lazos familiares.",
      17: "Compartir piso reduce costos y puede ser una buena opción social, especialmente para jóvenes."
    };
    return explanations[node.id] || "Haz clic en los nodos para explorar más opciones y obtener explicaciones.";
  };

  return (
    <div className="decision-tree-container">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="border p-4 rounded-lg mb-4 md:mb-0 md:mr-4 flex-grow max-w-xl overflow-x-auto">
          <DecisionTreeNode node={treeData} onToggle={toggleNode} />
        </div>
        <div className="border p-4 rounded-lg w-full md:w-1/3 max-w-xs">
          <h3 className="text-lg font-semibold mb-2">Explicación</h3>
          <p>{explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeInteractive;