

export class Perfil {
    id: number;

    tipo: string;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.Perfil : ' + (this.id ? this.id : '(unsaved)');
    }
}
