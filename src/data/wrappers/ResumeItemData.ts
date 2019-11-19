export class ResumeItemData {
  readonly id: number;
  readonly headings: string[];
  readonly subheading: string;
  readonly extraInfos: string[];
  readonly description?: string;

  constructor(data: any) {
    this.id = data.id;
    this.headings = data.headings;
    this.subheading = data.subheading;
    this.extraInfos = data.extraInfos;
    this.description = data.description;
  }
}
