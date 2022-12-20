
import validateCPF from '../util/validations/cpf';
import validateCNPJ from '../util/validations/cnpj';
import CPFformat from '../util/validations/cpf_format';
import CNPJformat from '../util/validations/cnpj_format';

export default class Validator {
  public static isCPF(cpf: unknown): boolean {
    return validateCPF(cpf);
  }

  public static isFormattedCPF(cpf: unknown): boolean {
    return CPFformat(cpf);
  }

  public static isCNPJ(cnpj: unknown): boolean {
    return validateCNPJ(cnpj);
  }

  public static isFormattedCNPJ(cnpj: unknown): boolean {
    return CNPJformat(cnpj);
  }

  public static getNumbers(cnpj: string): string {
    var numbers = "";
    try{ 
      numbers = cnpj.replace(/\D/g,'');
    } catch(e){
    }
    return numbers;
  }
}