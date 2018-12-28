

export class Usuario {
    id: number;

    name: string;
  password: string;
  username: string;
  passwordExpired: boolean;
  accountLocked: boolean;
  accountExpired: boolean;
  enabled: boolean;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.hsup.Usuario : ' + (this.id ? this.id : '(unsaved)');
    }
}
