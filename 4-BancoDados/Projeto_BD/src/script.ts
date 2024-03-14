import { Menu } from "./menu";
import { Pessoa } from "./pessoa";

export interface IPessoa{
    _id: number,
    _nome: string,
    _idade: number,
    _email: string
}

export class BancoDeDados{
    static _listaDePessoas: Array<IPessoa> = []

    static verificarRepeticao(nome: string): boolean{
        for(const pessoa of BancoDeDados._listaDePessoas){
            if (this._listaDePessoas.some(p => nome.toLowerCase() === p._nome.toLowerCase())){
                return false
            }
        }
        return true
    }
    adicionar(pessoa: IPessoa): void{
        const novoUsuario = new Pessoa(pessoa);
        if(!BancoDeDados.verificarRepeticao(pessoa._nome)){
            throw new Error("O usuário já existe")
        }
        BancoDeDados._listaDePessoas.push(pessoa);
        console.log("Usuário adicionado com sucesso!")
    }
    listar(): void{
        for(const pessoa of BancoDeDados._listaDePessoas){
            console.log(pessoa)
        }
    }
    buscarNome(nome: string): void | IPessoa{
        for(const pessoa of BancoDeDados._listaDePessoas){
            if (pessoa._nome.toLowerCase() === nome.toLowerCase()){
                console.log(pessoa);
                return pessoa;
            }
        }
        console.log("Pessoa não encontrada");
    }
    deletar(id: number){
        if(id < 0 || id > BancoDeDados._listaDePessoas.length){
            throw new Error("Índice inválido")
        } 
        BancoDeDados._listaDePessoas.splice(id, 1) 
        console.log("Usuário deletado com sucesso");
             
    }
    atualizar(id: number , nome: string , idade: number , email: string){
        const pessoa = this.buscarId(id);

        if (!pessoa) throw new Error("Usuário não encontrado");

        pessoa._nome = nome;
        pessoa._idade = idade;
        pessoa._email = email;
        
        BancoDeDados._listaDePessoas.splice(id, 1, pessoa);
        console.log(`Usuário editado com sucesso!`);
    }
    buscarId(id: number) {
        for(const pessoa of BancoDeDados._listaDePessoas){
            if (pessoa._id === id){
                return pessoa;
            }
        }
        console.log("Pessoa não encontrada");
        return;
    }
    ultimoId() {
        return BancoDeDados._listaDePessoas.map((pessoa) => pessoa._id).sort((a, b) => a - b).pop() || -1;
    }
}

let pessoa1: IPessoa = {
    _id: 0,
    _nome: "Kauã",
    _idade: 19,
    _email: "teste@gmail"
}
let pessoa2: IPessoa = {
    _id: 1,
    _nome: "Tarcilla",
    _idade: 21,
    _email: "teste@gmail"
}
let pessoa3: IPessoa = {
    _id: 2,
    _nome: "Jean",
    _idade: 20,
    _email: "teste@gmail"
}
let pessoa4: IPessoa = {
    _id: 3,
    _nome: "Liandra",
    _idade: 36,
    _email: "teste@gmail"
}

const obj1 = new BancoDeDados()
obj1.adicionar(pessoa1)
obj1.adicionar(pessoa2)
obj1.adicionar(pessoa3)
obj1.adicionar(pessoa4)

export let bd = new BancoDeDados();
let menu = new Menu();
menu.rodarPrograma();
