import { IPessoa } from "./script";

export class Pessoa {
    private _id: number;
    private _nome: string;
    private _idade: number;
    private _email: string;

    get id():number {
        return this._id;
    }
    get nome():string {
        return this._nome;
    }
    get idade():number {
        return this._idade;
    }
    get email():string {
        return this._email;
    }

    set id(id:number) {
        this._id = id;
    }
    set nome(nome: string) {
        this._nome = nome;
    }
    set idade(idade: number) {
        this._idade = idade;
    }
    set email(email: string) {
        this._email = email;
    }

    contemNumero(usuario: string) {
        let arrayNome = usuario.split('');
        let validacao = arrayNome.filter(el => !isNaN(Number(el)));
        return validacao.length !== 0;
    }
    validaEmail(email: string) {
        let arrayNome = email.split('');
        let validacao = arrayNome.filter(el => el === "@");
        return validacao.length !== 0;
    }

    constructor (pessoa: IPessoa) {
        this._id = pessoa.id;
        this._nome = pessoa.nome;
        this._idade = pessoa.idade;
        this._email = pessoa.email;

        if (this._nome.length < 4) throw new Error("O nome deve conter pelo menos 6 caracteres!");
        if (this.contemNumero(this._nome)) throw new Error("O nome de usuário não pode conter números!");
        if (this._idade < 0 || this._idade > 120) throw new Error("Valor de idade inválido!");
        if (!this.validaEmail(this._email)) throw new Error("E-mail inválido!");
    }
}



