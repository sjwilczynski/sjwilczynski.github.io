export class SocialMediaData {
    readonly id: number;
    readonly link: string;
    readonly iconComponentName: string;


    constructor(data: any) {
        this.id = data.id;
        this.link = data.link;
        this.iconComponentName = data.iconComponentName;
    }
}
