import React from "react";
import styles from "./tree-branches.module.css";
import leftBranch from "../../assets/tree2/left-branch.png";
import rightBranch from "../../assets/tree2/right-branch.png";

interface TreeNodeProps {
  data: any;
}

export const TreeBranches: React.FC<TreeNodeProps> = ({ data }) => {
  const hasChildren = typeof data === "object" && data !== null;

  const extractValues = (obj: any, values: string[] = []): string[] => {
    if (Array.isArray(obj)) {
      // Если это массив, то рекурсивно ищем внутри элементов
      obj.forEach((item) => {
        if (typeof item === "object") {
          values = extractValues(item, values);

          // console.log("item first if", item);
        }
      });
    } else if (typeof obj === "object") {
      // Если это объект, то ищем в нем ключи и значения
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === "string") {
          // Если это строка, добавляем в массив значений
          values.push(value);

          // console.log("value11", value);
        } else if (typeof value === "object") {
          // Если значение — это объект, рекурсивно извлекаем его значения
          values = extractValues(value, values);
        }
      });
    }
    return values;
  };

  // console.log("hasChildren", hasChildren);

  // Если массив длиной меньше 2
  if (Array.isArray(data) && data.length <= 2) {
    const allBranchValues = extractValues(data);
    // console.log("Извлеченные значения:", allBranchValues);

    // console.log("да массив длиной меньше 2");

    return (
      <div className={styles.tree_branches_container}>
        {allBranchValues.map((value, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                display: "flex",
                background: `url(${
                  index % 2 === 0 ? leftBranch : rightBranch
                }) no-repeat center`,
                backgroundSize: "contain",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {value}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  const brunchFinder = (data: any, level: number = 0) => {
    if (Array.isArray(data)) {
      return data.map((item: any, index: number) => {
        const [title, branches] = item;

        // console.log("index", index);
        // console.log("item", item);
        // console.log("title", title);
        // console.log("branches", branches);

        const isEven = index % 2 === 0 ;

        // Получаем ключи и значения из вложенных веток
        const branchKey = Object.keys(branches)[0]; // Ключ первой ветки
        const branchValue = branches[branchKey]; // Значение этой ветки

        console.log("branchValue", branchValue);
        console.log("branches", branches);

        // Извлекаем данные из branchValue (может быть объектом, массивом или строкой)
        const branchText =
          typeof branchValue === "object"
            ? Object.values(branchValue).join(", ")
            : branchValue;

        // console.log("branchValue", branchValue);

        return (
          <div key={index} className={styles.tree_branches_level_block}>
            {index < data.length - 1 && ( 
              <>
            
              <div className={styles.tree_branches_container}>

                       {isEven  && (
                    <div className={styles.tree_branches_left}>
                      <div className={styles.tree_branches_up}>{branchText} бла бла</div>
                      <div className={styles.tree_branches_main}>{branchKey}</div>
                      <div className={styles.tree_branches_down}>{branchText} дудуд</div>
                    </div>
                  )}

                <div className={styles.tree_branches_trunk}>{title}</div>
                       {!isEven && (
                        
                    <div className={styles.tree_branches_left}>
                    
                      <div className={styles.tree_branches_up}>{branchText}тртр</div>
                      <div className={styles.tree_branches_main}>{branchKey}</div>
                      <div className={styles.tree_branches_down}>{branchText}жжж</div>
                    </div>
                  )}


              </div>

              
            </>
            )}
          </div>

          // <div key={index} className={styles.tree_branches_level_block}>
          //   <div className={styles.tree_branches_container}>
          //     {/* Проверка, что это не первый и не последний элемент */}
          //     {(index !== 0 && index < data.length -1) ? (
          //       <div
          //         className={styles.tree_branches_container}
          //         style={{
          //           backgroundColor: "red",
          //         }}
          //       >
          //         {/* Если индекс чётный, рендерим левую ветку */}
          //         {isEven && (
          //           <div className={styles.tree_branches_left}>
          //             <div className={styles.tree_branches_up}>{branchText}</div>
          //             <div className={styles.tree_branches_down}>{branchText}</div>
          //             <div className={styles.tree_branches_main}>{branchKey}</div>
          //           </div>
          //         )}

          //         {/* Ствол */}
          //         <div className={styles.tree_branches_trunk}>{title}111</div>

          //         {/* Если индекс нечётный, рендерим правую ветку */}
          //         {!isEven && (
          //           <div className={styles.tree_branches_right}>
          //             <div className={styles.tree_branches_up}>{branchText}</div>
          //             <div className={styles.tree_branches_main}>{branchKey}</div>
          //             <div className={styles.tree_branches_down}>{branchText}</div>
          //           </div>
          //         )}
          //       </div>
          //     ) : (
          //       <React.Fragment key={index}>
          //         {/* Если индекс чётный, рендерим левую ветку */}
          //         {isEven && (
          //           <div className={styles.tree_branches_left}>
          //             <div className={styles.tree_branches_up}>{branchText}</div>
          //             <div className={styles.tree_branches_main}>{branchKey}</div>
          //             <div className={styles.tree_branches_down}>{branchText}</div>
          //           </div>
          //         )}

          //         {/* Ствол */}

          // <div className={styles.tree_branches_trunk}>{title}</div>

          //         {/* Если индекс нечётный, рендерим правую ветку */}
          //         {!isEven && (
          //           <div className={styles.tree_branches_right}>
          //             <div className={styles.tree_branches_up}>{branchText}</div>
          //             <div className={styles.tree_branches_main}>{branchKey}</div>
          //             <div className={styles.tree_branches_down}>{branchText}</div>
          //           </div>
          //         )}
          //       </React.Fragment>
          //     )}

          //     {/* Рекурсивный вызов для вложенных веток */}
          //     {branches && typeof branches === "object" && (
          //       <div className={styles.tree_branches_sub}>
          //         {brunchFinder(branches, level + 1)}
          //       </div>
          //     )}
          //   </div>
          // </div>

          // хардкод вариант!!!!!
          // <div className={styles.tree_branches_level_block}>
          //   <div className={styles.tree_branches_container}>
          //     {/* {Object.entries(data).map(([key, value]) => (
          //   <TreeBranches key={key} data={value} />
          //     ))} */}
          //     <div className={styles.tree_branches_left}>
          //       <div className={styles.tree_branches_up}>ветка вверх</div>
          //       <div className={styles.tree_branches_main}>
          //         основная-левая-ветка
          //       </div>
          //       <div className={styles.tree_branches_down}>ветка вниз</div>
          //     </div>

          //     <div className={styles.tree_branches_trunk}>Ствол</div>

          //     <div className={styles.tree_branches_right}>
          //       <div className={styles.tree_branches_up}>ветка вверх</div>
          //       <div className={styles.tree_branches_main}>
          //         основная-правая-ветка
          //       </div>
          //       <div className={styles.tree_branches_down}>ветка вниз</div>
          //     </div>
          //   </div>
          // </div>
        );
      });
    }

    return null;
  };

  return (
    <div className={styles.tree_branches}>
      {hasChildren && brunchFinder(data)}
    </div>
  );
};

// import React from "react";
// import styles from "./tree-branches.module.css";
// import leftBranch from "../../assets/tree2/left-branch.png";
// import rightBranch from "../../assets/tree2/right-branch.png";

// interface TreeNodeProps {
//   data: any;
// }

// export const TreeBranches: React.FC<TreeNodeProps> = ({ data }) => {
//   const hasChildren = typeof data === "object" && data !== null;

//   console.log("hasChildren", hasChildren);

//   console.log("some data object:", data);

//   if (data.length <= 2) {
//     console.log("да массив длинной меньше 2");

//     return (
//       <div className={styles.tree_branches_container}>
//         <div
//           // className={styles.tree_branches_left}
//           style={{
//             display: "flex",
//             background: `url(${leftBranch}) no-repeat center`,
//             backgroundSize: "contain",
//             width: "100%",
//             alignItems: "center",
//             justifyContent: "center",
//             // boxSizing: "border-box",
//           }}
//         >
//           Левая ветка
//         </div>
//         {/* <div className={styles.tree_branches_trunk}>Ствол</div> */}
//         <div
//           // className={styles.tree_branches_right}
//           style={{
//             display: "flex",
//             background: `url(${rightBranch}) no-repeat center`,
//             backgroundSize: "contain",
//             width: "100%",
//             alignItems: "center",
//             justifyContent: "center",
//             // boxSizing: "border-box",
//           }}
//         >
//           Правая ветка
//         </div>
//       </div>
//     );
//   }

//   const brunchFinder = (data: any) => {
//     if (Array.isArray(data)) {
//       return data.map((item: any, index: number) => {
//         const [title, branches] = item;

//         console.log("index", index);
//         console.log("item", item);
//         console.log("title", title);
//         console.log("branches", branches);

//         console.log("even", index > 0 && index % 2 === 0);

//         return (
//           <div key={index} className={styles.tree_branches_level_block}>
//             <div className={styles.tree_branches_container}>
//               {/* проверка на элементы, которые не первые и не последние */}
//               {index !== 0 && index !== data.length - 1 && (
//                 <>
//                   {index > 0 && index % 2 === 0 && (
//                     <div className={styles.tree_branches_left}>
//                       <p className={styles.tree_branches_up}>ветка вверх</p>
//                       <p className={styles.tree_branches_main}>
//                         {Object.keys(branches)[0]}
//                       </p>
//                       <p className={styles.tree_branches_down}>ветка вниз</p>
//                     </div>
//                   )}
//                   <div className={styles.tree_branches_trunk}>{title}</div>
//                   {index > 0 && index % 2 !== 0 && (
//                     <div className={styles.tree_branches_right}>
//                       <p className={styles.tree_branches_up}>ветка вверх</p>
//                       <p className={styles.tree_branches_main}>
//                         основная-правая-ветка
//                       </p>
//                       <p className={styles.tree_branches_down}>ветка вниз</p>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           // : null

//           // if (index !== 0 && index !== data.length - 1) {
//           //   console.log("item actual", item);
//           // }
//         );
//       });
//     }

//     return null;

//     // if (typeof data === "object" && data !== null) {
//     //   return (
//     // <div className={styles.tree_branches_level_block}>
//     //   <div className={styles.tree_branches_container}>
//     //     {/* {Object.entries(data).map(([key, value]) => (
//     //         <TreeBranches key={key} data={value} />
//     //       ))} */}
//     //     <div className={styles.tree_branches_left}>
//     //       <p className={styles.tree_branches_up}>ветка вверх</p>
//     //       <p className={styles.tree_branches_main}>основная-левая-ветка</p>
//     //       <p className={styles.tree_branches_down}>ветка вниз</p>
//     //     </div>

//     //     <div className={styles.tree_branches_trunk}>Ствол</div>

//     //     <div className={styles.tree_branches_right}>
//     //       <p className={styles.tree_branches_up}>ветка вверх</p>
//     //       <p className={styles.tree_branches_main}>основная-правая-ветка</p>
//     //       <p className={styles.tree_branches_down}>ветка вниз</p>
//     //     </div>
//     //   </div>
//     // </div>;
//     //   );
//     // }
//   };

//   return (
//     <div className={styles.tree_branches_container}>
//       {hasChildren && brunchFinder(data)}
//     </div>
//   );
// };
