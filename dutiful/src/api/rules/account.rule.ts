import { Activation, Login, SignUp } from "../models/account.model";

export default interface IAccountRule {
    Login(login: Login): any;
    LogOut(): any;
    SignUp(signUp: SignUp): any;
    Acivation(active: Activation): any;
}