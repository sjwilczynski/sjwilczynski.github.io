import type { ResumeListElement, ResumeList } from "@data/types";

type SkillsChunk = {
  id: number;
  elements: ResumeListElement[];
  listClassName: string;
};

export const splitToChunks = (skills: ResumeList): SkillsChunk[] => {
  const { elements, listClassName, numColumns = 1 } = skills;
  const perChunk = Math.ceil(elements.length / numColumns);

  return elements.reduce((resultArray: SkillsChunk[], item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = {
        elements: [],
        listClassName: listClassName || "",
        id: index,
      };
    }

    resultArray[chunkIndex].elements.push(item);

    return resultArray;
  }, []);
};
