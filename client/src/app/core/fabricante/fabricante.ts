

export class Fabricante {
  id: number;

  nome: string;
  ativo: boolean;

  constructor (object?: any) {
    if (this.ativo == null) this.ativo = false;

    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.hsup.Fabricante : ' + (this.id ? this.id : '(unsaved)');
  }
}