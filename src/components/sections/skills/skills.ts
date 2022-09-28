import type { ResumeListElement, ResumeList } from "@data/types";

type SkillsChunk = {
  id: number;
  elements: ResumeListElement[];
};

export const splitToChunks = (skills: ResumeList): SkillsChunk[] => {
  const { elements, numColumns = 1 } = skills;
  const perChunk = Math.ceil(elements.length / numColumns);

  return elements.reduce((resultArray: SkillsChunk[], item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = {
        elements: [],
        id: index,
      };
    }

    resultArray[chunkIndex].elements.push(item);

    return resultArray;
  }, []);
};
