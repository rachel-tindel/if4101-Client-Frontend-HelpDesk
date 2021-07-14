export class Issue{

    id: number=0;
    reportnumber: string;
    address:string;
    contactphone:string;
    contactemail:string;
    status:string;
    description:string;
    service:string;
    iduser:number;
    creationdate: Date;
    creationuser: Date;
    supportuserasigned?:string;
    updatedate?: Date;
    updateuser?: string;
}
