import { useEffect, useState } from "react";
import styles from "./graph-builder.module.css";

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
  reagents: "Реагент",
  gso: "ГСО",
  precursors: "Прекурсор",
};

export const GraphBuilder: React.FC = () => {
  const [graphData, setGraphData] = useState<IGraphData>({
    name: "",
    items: [], // Инициализация пустым массивом
  });
  const [selectedGraph, setSelectedGraph] = useState("Выберите исследование");
  const [graphDisplay, setGraphDisplay] = useState<
    {
      study: { name: string; description: string };
    }[]
  >([]);

  const fetchData = async () => {
    const response = await fetch("/src/Data/test_ajur_tree.json");
    const data = await response.json();
    setGraphData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("graphData", graphData);

  console.log("selectedGraph", selectedGraph);

  const handleOptionClick = (name: string) => {
    setSelectedGraph(name);
    if (graphData !== null) {
      setGraphDisplay(
        graphData.items.filter((item) => item.study.name === name)
      );
    } else {
      setGraphDisplay([]);
    }
  };

  // console.log("graphDisplay", graphDisplay);


  return (
    <div className={styles.graph_builder_container}>
       <h1 className={styles.title}>JSON Graph</h1>
      {/* <div> */}
        <div className={styles.custom_select}>
          <div className={styles.selected} onClick={() => {}}>
            {selectedGraph}
          </div>
          <ul className={styles.options}>
            {graphData.items.map((item, index) => (
              <li
                className={styles.option}
                key={index}
                onClick={() => handleOptionClick(item.study.name)}
              >
                {item.study.name}
              </li>
            ))}
          </ul>
        </div>
      {/* </div> */}
      <div className={styles.graph_container}>
        {graphDisplay.length === 0 && (
          <p>Для загрузки данных, пожалуйста,выберите исследование</p>
        )}
        {/* {graphDisplay.map((item, id, index) => (<>
        
          <ul key={id} className={styles.graph_list_container}>
            <li className={styles.graph_list_item}>
              <h2 className={styles.graph_list_item_title}>
                <span>Название исследования:</span>{item.study.name}
              </h2>
              <p className={styles.graph_list_item_description}>
                <span>Описание исследования:</span>{item.study.description}
              </p>
            </li>
          </ul> 
          {index > 0 &&
          <ul key={id} className={styles.graph_list_container}>
            <li className={styles.graph_list_item}>
              <h2 className={styles.graph_list_item_title}>
                <span>Название исследования:</span>{item.study.name}
              </h2>
              <p className={styles.graph_list_item_description}>
                <span>Описание исследования:</span>{item.study.description}
              </p>
            </li>
          </ul>}
        </>
        ))} */}

        {graphDisplay.map((item, index) => (
          <div key={index} 
          className={styles.graph_list_container}
          >
            <ul className={styles.graph_list_container}>
              <li className={styles.graph_list_item}>
                <p className={styles.graph_list_item_text}>
                  <span>Название исследования:</span> {item.study.name}
                </p>
                <p className={styles.graph_list_item_text}>
                  <span>Описание исследования:</span> {item.study.description}
                </p>
              </li>
            </ul>

            {/* Отображение реагентов */}
            <ul 
            className={styles.reagents_list}
            // className={styles.graph_list_container}
            >
              {item.reagents.map((reagent) => (
                <li key={reagent.id} className={styles.graph_list_item}>
                  <p className={styles.graph_list_item_text}>
                    <span>{TableType[reagent.table]}:</span> {reagent.name}
                  </p>
                  <p className={styles.graph_list_item_text}>
                    <span>Чистота:</span>{reagent.reagentPurity ==='' ? '"нет данных"' : `${reagent.reagentPurity}` }
                  </p>
                  <p className={styles.graph_list_item_text}>
                    <span>Объем:</span> {reagent.volume} {reagent.reagentUnit}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
