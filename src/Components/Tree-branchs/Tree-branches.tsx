import React from "react";
import styles from "./tree-branches.module.css";
import leftBranch from "../../assets/tree2/left-branch.png";
import rightBranch from "../../assets/tree2/right-branch.png";

interface TreeNodeProps {
  data: any;
}

export const TreeBranches: React.FC<TreeNodeProps> = ({ data }) => {
  const hasChildren = typeof data === "object" && data !== null;

  console.log("hasChildren", hasChildren);

  console.log("some data object:", data);

  if (data.length <= 2) {
    console.log("да массив длинной меньше 2");

    return (
      <div className={styles.tree_branches_container}>
        <div
          // className={styles.tree_branches_left}
          style={{
            display: "flex",
            background: `url(${leftBranch}) no-repeat center`,
            backgroundSize: "contain",
            width: "100%",
            // height: "100%",
            alignItems: "center",
            justifyContent: "center",
            // boxSizing: "border-box",
          }}
        >
          Левая ветка
        </div>
        {/* <div className={styles.tree_branches_trunk}>Ствол</div> */}
        <div
          // className={styles.tree_branches_right}
          style={{
            display: "flex",
            background: `url(${rightBranch}) no-repeat center`,
            backgroundSize: "contain",
            width: "100%",
            // height: "100%",
            alignItems: "center",
            justifyContent: "center",
            // boxSizing: "border-box",
          }}
        >
          Правая ветка
        </div>
      </div>
    );
  }

  const brunchFinder = (data: any) => {
    if (typeof data === "object" && data !== null) {
      return (
        <div className={styles.tree_branches_level_block}>

        <div className={styles.tree_branches_container}>
          {/* {Object.entries(data).map(([key, value]) => (
            <TreeBranches key={key} data={value} />
          ))} */}
          <div className={styles.tree_branches_left}>
            <p className={styles.tree_branches_up}>ветка вверх</p>
            <p className={styles.tree_branches_main}>основная-левая-ветка</p>
            <p className={styles.tree_branches_down}>ветка вниз</p>          
          </div>

          <div className={styles.tree_branches_trunk}>Ствол</div>

          <div className={styles.tree_branches_right}>
            <p className={styles.tree_branches_up}>ветка вверх</p>
            <p className={styles.tree_branches_main}>основная-правая-ветка</p>
            <p className={styles.tree_branches_down}>ветка вниз</p>
          </div>
        </div>
        </div>
      );
    }
  };

  // const brunchFinder = (data: any) => {
  //   if (Array.isArray(data)) {
  //     return data.map((item, index) => {
  //       const [title, branches] = item;
  
  //       return (
  //         <div key={index} className={styles.tree_branches_container}>
  //           <div className={styles.tree_branches_left}>
  //             {/* Отобразим ветки, если они есть */}
  //             {typeof branches === 'object' && branches !== null ? (
  //               Object.entries(branches).map(([branchTitle, subBranches]) => {
  //                 console.log("subBranches", subBranches);
                  
  //                 return (
  //                   <div key={branchTitle}>
  //                     <p className={styles.tree_branches_up}>ветка вверх</p>
  //                     <p className={styles.tree_branches_main}>{branchTitle}</p>
  //                     {/* Если есть подветви, отображаем их */}
  //                     {typeof subBranches === 'object' && subBranches !== null ? (
  //                       <div>
  //                         {Object.entries(subBranches).map(([subBranchTitle, subBranchValue]) => (
  //                           <p key={subBranchTitle} className={styles.tree_branches_down}>
  //                             {subBranchTitle}
  //                           </p>
  //                         ))}
  //                       </div>
  //                     ) : (
  //                       <p className={styles.tree_branches_down}>{subBranches}</p>
  //                     )}
  //                   </div>
  //                 );
  //               })
  //             ) : null}
  //           </div>
  
  //           <div className={styles.tree_branches_trunk}>{title}</div>
  
  //           <div className={styles.tree_branches_right}>
  //             {/* Здесь вы можете добавить еще каких-либо веток, если они есть */}
  //           </div>
  //         </div>
  //       );
  //     });
  //   }
  
  //   return null;
  // };

  return (
    <div className={styles.tree_branches_container}>
      {hasChildren && brunchFinder(data)}
    </div>
  );
};
