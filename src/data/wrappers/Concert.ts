export class Concert {
    readonly id: number;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly title: string;
    readonly location: string;
    readonly description: string;

    constructor(data: any) {
        this.id = data.id;
        this.startDate = this.readDate(data.startDate);
        this.endDate = this.readDate(data.endDate);
        this.title = data.title;
        this.location = data.location;
        this.description = data.description;
    }

    public getDate(): string {
        return this.startDate.getTime() === this.endDate.getTime() ? Concert.dateToString(this.startDate) : Concert.dateToString(this.startDate) + ' - ' + Concert.dateToString(this.endDate);
    }

    private readDate(date: string) {
        let dateParts = date.split('.').map(part => parseInt(part));
        return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
    }

    private static dateToString(date: Date) {
        return date.toLocaleDateString("pl-PL")
    }
}
