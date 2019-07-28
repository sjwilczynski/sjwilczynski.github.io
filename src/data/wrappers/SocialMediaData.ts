export class SocialMediaData {
    readonly id: number;
    readonly link: string;
    readonly iconName: string;


    constructor(data: any) {
        this.id = data.id;
        this.link = data.link;
        this.iconName = data.iconName;
    }
}
