export class AboutData {
  readonly name: string;
  readonly surname: string;
  readonly city: string;
  readonly country: string;
  readonly email: string;
  readonly githubUrl: string;
  readonly introduction: string;

  constructor(data: any) {
    this.name = data.name;
    this.surname = data.surname;
    this.city = data.city;
    this.country = data.country;
    this.email = data.email;
    this.githubUrl = data.githubUrl;
    this.introduction = data.introduction;
  }

  getFullName(): string {
    return this.name + " " + this.surname;
  }
}
