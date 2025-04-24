import { useEffect, useRef, useState } from 'react';
import styles from './graph-builder.module.css';
import { newTestData } from '../../Data/test_ajur_tree';

const randomColors = [
  '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6',
  '#E74C3C', '#1ABC9C', '#3498DB', '#8E44AD', '#F39C12'
];

interface IGraphData {
  name: string;
  items: {
    id: number;
    companyNameId: number;
    study: {
      name: string;
      description: string;
    };
    reagents: {
      id: number;
      table: string;
      name: string;
      reagentPurity: string;
      volume: number;
      reagentUnit: string;
    }[];  
  }[];
}

const TableType: { [key: string]: string } = {
  reagents: 'Реагент',
  gso: 'ГСО',
  precursors: 'Прекурсор',
};

export const GraphBuilder: React.FC = () => {
  const [graphData, setGraphData] = useState<IGraphData>({ name: '', items: [] });
  const [selectedGraph, setSelectedGraph] = useState('Выберите исследование');
  const [graphDisplay, setGraphDisplay] = useState<IGraphData['items']>([]);
  const [positions, setPositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<{ parentIndex: number, reagentIndex: number } | null>(null); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const svgRef = useRef<SVGSVGElement | null>(null);


  useEffect(() => {
    const data = newTestData;
    setGraphData(data);
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 768);
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      drawConnections();
    }
  }, [graphDisplay, positions, isMobile, hoveredElement, windowWidth]);  // Перерисовываем стрелки при изменении ховера

  const handleOptionClick = (name: string) => {
    setSelectedGraph(name);
    const filtered = graphData.items.filter((item) => item.study.name === name);
    setGraphDisplay(filtered);
  };

  const randomColor = () => randomColors[Math.floor(Math.random() * randomColors.length)];

  const drawConnections = () => {
    if (!svgRef.current) return;
  
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }
  
    const svg = svgRef.current;
  
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="end-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(68, 68, 68)" />
      </marker>
    `;
    svg.appendChild(defs);
  
    const container = document.querySelector(`.${styles.graph_container}`);
    const containerRect = container?.getBoundingClientRect();
  
    graphDisplay.forEach((item, index) => {
      const parentId = `parent-${index}`;
      const parentEl = document.getElementById(parentId);
      if (!parentEl || !containerRect) return;
  
      const parentRect = parentEl.getBoundingClientRect();
      let startX: number, startY: number, endX, endY: number;
  
      if (isMobile) {
        startX = parentRect.left + parentRect.width / 2 - containerRect.left;
        startY = parentRect.bottom - containerRect.top; 
        item.reagents.forEach((_, rIdx) => {
          const childId = `child-${index}-${rIdx}`;
          const childEl = document.getElementById(childId);
          if (!childEl) return;
  
          const childRect = childEl.getBoundingClientRect();
          endX = childRect.left + childRect.width / 2 - containerRect.left;
          endY = childRect.top - containerRect.top;
  
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const pathData = `M${startX},${startY} C${startX},${startY + 50} ${endX},${endY - 50} ${endX},${endY}`;
          path.setAttribute('d', pathData);
          path.setAttribute('stroke', hoveredElement && hoveredElement.parentIndex === index && hoveredElement.reagentIndex === rIdx ? randomColor() : 'rgb(68, 68, 68)');  // Подсветка стрелки
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          path.setAttribute('marker-end', 'url(#end-arrow)');
          svg.appendChild(path);
        });
      } else {
        startX = parentRect.right - containerRect.left;
        startY = parentRect.top + parentRect.height / 2 - containerRect.top;
        item.reagents.forEach((_, rIdx) => {
          const childId = `child-${index}-${rIdx}`;
          const childEl = document.getElementById(childId);
          if (!childEl) return;
  
          const childRect = childEl.getBoundingClientRect();
          endX = childRect.left - containerRect.left;
          endY = childRect.top + childRect.height / 2 - containerRect.top;
  
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const pathData = `M${startX},${startY} C${startX + 100},${startY} ${endX - 100},${endY} ${endX},${endY}`;
          path.setAttribute('d', pathData);
          path.setAttribute('stroke', hoveredElement && hoveredElement.parentIndex === index && hoveredElement.reagentIndex === rIdx ? randomColor() : 'rgb(68, 68, 68)');  // Подсветка стрелки
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          path.setAttribute('marker-end', 'url(#end-arrow)');
          svg.appendChild(path);
        });
      }
    });
  };

 

  const handleMouseEnterChild = (parentIndex: number, reagentIndex: number) => {
    setHoveredElement({ parentIndex, reagentIndex });  // Устанавливаем ховер на дочерний элемент
  };

  const handleMouseLeaveChild = () => {
    setHoveredElement(null); 
  };



  const handleDragStart = (itemIndex: number, clientX: number, clientY: number) => {
    const prevPos = positions[itemIndex] || { x: 150, y: itemIndex * 200 + 40 };
  
    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : (moveEvent as MouseEvent).clientX;
      const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : (moveEvent as MouseEvent).clientY;
  
      const dx = moveX - clientX;
      const dy = moveY - clientY;
  
      setPositions((prev) => ({
        ...prev,
        [itemIndex]: { x: prevPos.x + dx, y: prevPos.y + dy },
      }));
    };
  
    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove as any);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove as any);
      document.removeEventListener('touchend', handleEnd);
    };
  
    document.addEventListener('mousemove', handleMove as any);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove as any);
    document.addEventListener('touchend', handleEnd);
  };
  
  const handlePointerDown = (itemIndex: number, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as React.MouseEvent).clientY;
    handleDragStart(itemIndex, clientX, clientY);
  };
  

  console.log("windowWidth", windowWidth);
  

  return (
    <div className={styles.graph_builder_container}>
      <h1 className={styles.title}>JSON Graph</h1>

      <div className={styles.custom_select}>
        <div className={styles.selected}>{selectedGraph}</div>
        <ul className={styles.options}>
          {graphData.items.map((item, index) => (
            <li key={index} className={styles.option} onClick={() => handleOptionClick(item.study.name)}>
              {item.study.name}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.graph_container} style={{ position: 'relative', minHeight: '600px' }}>
        <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></svg>

        {graphDisplay.length === 0 && <p>Для загрузки данных, пожалуйста, выберите исследование</p>}

        {graphDisplay.map((item, index) => {
          const pos = positions[index] || { x: 150, y: index * 200 + 40 };

          return (
            <div
              key={index}
              onMouseDown={(e) => handlePointerDown(index, e)}
              onTouchStart={(e) => handlePointerDown(index, e)}
              className={styles.graph_list_container}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                cursor: 'move',
              }}
            >
              <div className={styles.graph_list_item} id={`parent-${index}`}>
                <p className={styles.graph_list_item_text}>
                  <span>Название исследования:</span> {item.study.name}
                </p>
                <p className={styles.graph_list_item_text}>
                  <span>Описание исследования:</span> {item.study.description}
                </p>
              </div>

              <ul className={styles.reagents_list} style={{ marginLeft: '260px', marginTop: '10px' }}>
                {item.reagents.map((reagent, rIdx) => (
                  <li
                    key={reagent.id}
                    className={styles.graph_list_child_item}
                    id={`child-${index}-${rIdx}`}
                    onMouseEnter={() => handleMouseEnterChild(index, rIdx)}
                    onMouseLeave={handleMouseLeaveChild}
                  >
                    <p className={styles.graph_list_item_text}>
                      <span>{TableType[reagent.table] || 'Компонент'}:</span> {reagent.name}
                    </p>
                    <p className={styles.graph_list_item_text}>
                      <span>Чистота:</span> {reagent.reagentPurity || '"нет данных"'}
                    </p>
                    <p className={styles.graph_list_item_text}>
                      <span>Объем:</span> {reagent.volume} {reagent.reagentUnit}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
