

export class Perfil {
    id: number;

    name: string;

    constructor (object?: any) {
      if (object) {
        
        for (const prop of Object.keys(object)) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.Perfil : ' + (this.id ? this.id : '(unsaved)');
    }
}
