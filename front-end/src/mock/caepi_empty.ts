import ICaepi from "../interface/ICaepi";

export const caepiEmpty : ICaepi = {
    number: 0,
    status: '',
    update: '',
    validity: '',
    equipment: {
        name: '',
        description: '',
        brand: '',
        color: '', 
        origin: '',
        manufacturer: {
            name: '',
            cnpj: '',
        }
    },
    report: {
        standard: '',
        reportNumber: '',
        process: '', 
        restriction: '',
        reference: '',
        approvedFor: '',
        observation: '',
        laboratory: {
            name: '',
            cnpj: '',
        }
    }
}