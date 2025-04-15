export type TreeData = {
    [key: string]: {
      [key: string]: TreeData | string; 
    };
  };