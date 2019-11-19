import { ResumeListElementData } from "./ResumeListElementData";

export class ResumeListData {
  readonly elements: ResumeListElementData[];
  readonly id?: number;
  readonly title?: string;
  readonly listClassName?: string;
  readonly numColumns?: number;

  constructor(data: any) {
    this.elements = data.elements.map(
      (elementData: any) => new ResumeListElementData(elementData)
    );
    this.id = data.id;
    this.title = data.title;
    this.listClassName = data.listClassName;
    this.numColumns = data.numColumns;
  }
}
