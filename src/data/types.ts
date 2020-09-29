export type About = {
  name: string;
  surname: string;
  city: string;
  country: string;
  email: string;
  githubUrl: string;
  introduction: string;
};

export type ResumeListElement = {
  id: number;
  description: string;
  iconComponentName?: string;
  iconClassName?: string;
};

export type ResumeList = {
  elements: ResumeListElement[];
  id?: number;
  title?: string;
  listClassName?: string;
  numColumns?: number;
};

export type ResumeItem = {
  id: number;
  headings: string[];
  subheading: string;
  extraInfos: string[];
  description?: string;
};

export type SocialMedia = {
  id: number;
  link: string;
  iconComponentName: string;
  title: string;
};

export type Concert = {
  id: number;
  date: string;
  title: string;
  location: string;
  description: string;
};
