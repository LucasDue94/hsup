

export class Setor {
    id: number;

    nome: string;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.Setor : ' + (this.id ? this.id : '(unsaved)');
    }
}
