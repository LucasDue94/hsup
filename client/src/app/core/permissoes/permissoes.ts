

export class Permissoes {
    id: number;

    authority: string;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.Permissoes : ' + (this.id ? this.id : '(unsaved)');
    }
}
