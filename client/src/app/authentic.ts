import { AuthService } from "./signin/auth.service";

export abstract class Authentic {

    private authService = new AuthService();

    abstract checkPermission = (permission: string) => this.authService.hasPermission(permission);
}
