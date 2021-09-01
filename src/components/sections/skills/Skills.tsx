import { ResumeList, ResumeListElement } from "../../../data/types";
import { ResumeListView } from "../../resume/ResumeListView";

type SkillsChunk = {
  id: number;
  elements: ResumeListElement[];
  listClassName: string;
};

export const Skills = (props: { skills: ResumeList }) => {
  const splitToChunks = function (
    elements: ResumeListElement[],
    numColumns: number
  ): SkillsChunk[] {
    const perChunk = Math.ceil(elements.length / numColumns);

    return elements.reduce((resultArray: SkillsChunk[], item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = {
          elements: [],
          listClassName: skills.listClassName || "",
          id: index,
        };
      }

      resultArray[chunkIndex].elements.push(item);

      return resultArray;
    }, []);
  };

  const skills = props.skills;
  const numColumns = skills.numColumns || 1;
  const skillsChunked = splitToChunks(skills.elements, numColumns);
  return (
    <>
      <div className="subheading mb-3 mt-2">{skills.title}</div>
      <div className="d-flex">
        {skillsChunked.map((skillChunk) => (
          <div
            key={skillChunk.id}
            className={"col-" + Math.floor(12 / numColumns)}
          >
            <ResumeListView key={skillChunk.id} {...skillChunk} />
          </div>
        ))}
      </div>
    </>
  );
};
