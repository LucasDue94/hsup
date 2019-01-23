

export class UnidadeMedida {
    id: string;
    descricao: string;

    constructor (object?: any) {
      if (object) {

          for (const prop of Object.keys(object)) {
              this[prop] = object[prop];
          }
      }
    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.UnidadeMedida : ' + (this.id ? this.id : '(unsaved)');
    }
}
