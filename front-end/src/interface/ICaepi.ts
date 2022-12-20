interface ILaboratory {
    name: string;
    cnpj: string;
}

interface IManufacturer {
    name: string;
    cnpj: string;
}

interface IEquipment {
    name: string;
    description: string;
    brand: string;
    color: string;
    origin: string;
    manufacturer: IManufacturer;
}

interface IReport {
    standard: string;
    reportNumber: string;
    process: string;
    restriction: string;
    reference: string;
    approvedFor: string;
    observation: string;
    laboratory: ILaboratory;
}

export default interface ICaepi {
    number: number;
    status: string;
    update: string;
    validity: string;
    equipment: IEquipment;
    report: IReport;
}