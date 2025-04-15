
import styles from "./App.module.css";
import { TreeBuilder } from "./Components/Tree-builder/Tree-builder";
// import { testData } from "./Data/testData";
// import { data } from "./Data/Data";

const App = () => {
  
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>JSON Дерево</h1>  
          <TreeBuilder  />      
    </div>
  );
};

export default App;
