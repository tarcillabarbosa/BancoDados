import { IPessoa } from "./script";
import { bd } from "./script";

declare let require: any;
var userPrompt = require('prompt-sync')();

export class Menu {
    
    static _programaEmFuncionamento: boolean = true;
    static _entradaUsuario:string;
    _id:number = 0;

    rodarPrograma () {
        do {
            console.log(`
            Digite a opção desejada: 
            1 - Listar
            2 - Adicionar
            3 - Atualizar 
            4 - Buscar
            5 - Deletar
            0 - Sair
            `);
            Menu._entradaUsuario = userPrompt("");
            switch(Menu._entradaUsuario) {
                case '0':
                    Menu._programaEmFuncionamento = false;
                    break;
                case '1':
                    bd.listar();
                    break;
                case '2':
                    const nome = userPrompt ("Digite o nome do usuário a ser adicionado: ");
                    const idade = userPrompt ("Digite a idade do usuário a ser adicionado: ");
                    const email = userPrompt ("Digite o e-mail do usuário a ser adicionado: ");
                    const dadosUsuario:IPessoa = {
                        _id: bd.ultimoId() + 1,
                        _nome: nome || '',
                        _idade: Number(idade),
                        _email: email || ''
                    }
                    bd.adicionar(dadosUsuario);
                    break;
                case '3':
                    bd.listar();
                    const idAtualiza = userPrompt ("Digite o id do usuário: ");
                    const nomeAtualiza = userPrompt ("Digite o nome atualizado do usuário: ");
                    const idadeAtualiza = userPrompt ("Digite a idade atualizada do usuário: ");
                    const emailAtualiza = userPrompt ("Digite o e-mail atualizado do usuário: ");
                    bd.atualizar(parseInt(idAtualiza), nomeAtualiza, parseInt(idadeAtualiza), emailAtualiza);
                    break;
                case '4':
                    const nomeBusca = userPrompt ("Digite o nome do usuário: ");
                    bd.buscarNome(nomeBusca);
                    break;
                case '5':
                    const idDeleta = userPrompt ("Digite o id do usuário: ");
                    bd.deletar(parseInt(idDeleta));
                    break;
                default:
                    console.log('Opção inválida');
                    Menu._programaEmFuncionamento = false;
            }
        } while(Menu._programaEmFuncionamento);
    }
}
