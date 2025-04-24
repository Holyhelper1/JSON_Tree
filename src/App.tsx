import styles from "./App.module.css";
import { GraphBuilder } from "./Components/JSON-Graphs/Graph-builder";
// import { TreeBuilder } from "./Components/Tree/Tree-builder/Tree-builder";
// import { testData } from "./Data/testData";
// import { data } from "./Data/Data";

const App = () => {
  return (
    <>
    
    <div className={styles.app}>
      {/* <h1 className={styles.title}>JSON Дерево</h1> */}
      {/* <TreeBuilder  />       */}
      <GraphBuilder />

    </div>
    </>
  );
};

export default App;
