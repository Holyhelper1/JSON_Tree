import React, { useEffect, useState } from "react";
import fullTree from "../../assets/tree2/Full-tree.png";
import treeTrunk from "../../assets/tree2/tree-trunk.png";
// import middleTrunk from "../../assets/tree2/middle-trunk.png";
// import leftBranch from "../../assets/tree2/left-branch.png";
// import rightBranch from "../../assets/tree2/right-branch.png";
import treeTop from "../../assets/tree2/tree-top.png";
import styles from "./tree-builder.module.css";
import { testData } from "../../../Data/testData";
import { TreeBranches } from "../Tree-branchs/Tree-branches";

interface TreeData {
  [key: string]: string | TreeData;
}

export const TreeBuilder: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState(Object.keys(testData)[0]);
  const [treeDisplay, setTreeDisplay] = useState<React.ReactNode | null>(null);

  // console.log("selectedKey start", selectedKey);

  const trunkFinder = (data: TreeData) => {
    if (
      Object.entries(data).length === 0 ||
      Object.entries(data[selectedKey]).length === 0
    ) {
      return (
        <div className={styles.empty_tree}>
          <h2>К сожалению, JSON дерево пустое</h2>
          <img src={fullTree} alt="Tree" width={500} />
        </div>
      );
    }

    if (data[selectedKey]) {
      const JSONTreeData: [string, any][] = Object.entries(data[selectedKey]);

      // console.log("JSONdata", JSONTreeData);

      return (
        <div className={styles.tree_container}>
          <div
            className={styles.tree_top}
            style={{
              background: `url(${treeTop}) no-repeat center`,
              backgroundSize: "contain",
              width: "100%",
              height: "150px",
            }}
          >
            {JSONTreeData[JSONTreeData.length - 1][1]}
          </div>

          <TreeBranches data={JSONTreeData} />
          {/* <TreeBranches data={JSONTreeData} /> */}

          <div
            className={styles.trunk}
            style={{
              background: `url(${treeTrunk}) no-repeat center`,
              backgroundSize: "contain",
              width: "100%",
              height: "30%",
            }}
          >
            {/* {JSONTreeData[0][0]} */}
          </div>
          <pre>{JSON.stringify(JSONTreeData, null, 2)}</pre>
        </div>
      );
    } else {
      console.log(`Ключ ${selectedKey} не найден в данных.`);
      return null;
    }
  };

  useEffect(() => {
    setTreeDisplay(trunkFinder(testData)); // Обновляем состояние для отображения
  }, [selectedKey]);

  return (
    <div className={styles.tree_builder_container}>
      <div className={styles.tree_name}>
        <div>Вид реактива: {selectedKey}</div>
      </div>
      <select
        onChange={(e) => setSelectedKey(e.target.value)}
        className={styles.selector}
      >
        {Object.keys(testData).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {treeDisplay} {/* Отображаем текущее состояние дерева */}
    </div>
  );
};
