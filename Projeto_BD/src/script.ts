import { Pessoa } from "./pessoa";
import { Menu } from "./menu";

export interface IPessoa{
    id: number,
    nome: string,
    idade: number,
    email: string
}

export class BancoDeDados{
    static _listaDePessoas: Array<IPessoa> = []

    static verificarRepeticao(nome: string): boolean{
        for(const pessoa of BancoDeDados._listaDePessoas){
            if (this._listaDePessoas.some(p => nome.toLowerCase() === p.nome.toLowerCase())){
                return false
            }
        }
        return true
    }
    adicionar(pessoa: IPessoa): void{
        if(!BancoDeDados.verificarRepeticao(pessoa.nome)){
            throw new Error("O usuário já existe")
        }
        BancoDeDados._listaDePessoas.push(pessoa)
    }
    listar(): void{
        for(const pessoa of BancoDeDados._listaDePessoas){
            console.log(pessoa)
        }
    }
    buscarNome(nome: string): void | IPessoa{
        for(const pessoa of BancoDeDados._listaDePessoas){
            if (pessoa.nome.toLowerCase() === nome.toLowerCase()){
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

        pessoa.nome = nome;
        pessoa.idade = idade;
        pessoa.email = email;
        
        BancoDeDados._listaDePessoas.splice(id, 1, pessoa);
        console.log(`Usuário editado com sucesso!`);
    }
    buscarId(id: number) {
        for(const pessoa of BancoDeDados._listaDePessoas){
            if (pessoa.id === id){
                return pessoa;
            }
        }
        console.log("Pessoa não encontrada");
        return;
    }
    ultimoId() {
        return BancoDeDados._listaDePessoas.map((pessoa) => pessoa.id).sort((a, b) => a - b).pop() || -1;
    }
}

let pessoa1: IPessoa = {
    id: 0,
    nome: "Kauã",
    idade: 19,
    email: "teste"
}
let pessoa2: IPessoa = {
    id: 1,
    nome: "Tarcilla",
    idade: 21,
    email: "teste"
}
let pessoa3: IPessoa = {
    id: 2,
    nome: "Jean",
    idade: 20,
    email: "teste"
}
let pessoa4: IPessoa = {
    id: 3,
    nome: "Lia",
    idade: 36,
    email: "teste"
}

const obj1 = new BancoDeDados()
obj1.adicionar(pessoa1)
obj1.adicionar(pessoa2)
obj1.adicionar(pessoa3)
obj1.adicionar(pessoa4)
obj1.atualizar(0, "Vitor", 22, "Teste@gmail")
obj1.listar();

const pessoa: IPessoa = {
    id: 0,
    nome: "Vitor",
    idade: 25,
    email: "vitor@gmail.com"
}

export let bd = new BancoDeDados();


let menu = new Menu();
menu.rodarPrograma();
