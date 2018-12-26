

export class UnidadeMedida {
    id: string;
    descricao: string;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.UnidadeMedida : ' + (this.id ? this.id : '(unsaved)');
    }
}
