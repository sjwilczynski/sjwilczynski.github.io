export class ResumeListElementData {
    readonly id: number;
    readonly description: string;
    readonly iconComponentName?: string;
    readonly iconClassName?: string;


    constructor(data: any) {
        this.id = data.id;
        this.description = data.description;
        this.iconComponentName = data.iconComponentName;
        this.iconClassName = data.iconClassName;
    }
}
