import React from 'react';
import './TabelaColaboradores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// O nome do componente deve começar com letra maiúscula
function TabelaColaboradores() {
    return (
        <div className="lista-funcionarios-container">

            <div className="beTalent"><h3><b>Be</b>Talent</h3></div>
            
            <div className="tabelaFuncionarios">
            <div className="header">
                <h3>Funcionários</h3>
                
                <div className="search-input-wrapper">
                    <input type="text" placeholder="Pesquisar..." className="search-input-field" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                </div>

            </div>

            <table className="tabela-arredondada">
                <thead>
                    <tr>
                        <th className="cabecalho">FOTO</th>
                        <th className="cabecalho">NOME</th>
                        <th className="cabecalho">CARGO</th>
                        <th className="cabecalho">DATA DE ADMISSÃO</th>
                        <th className="cabecalho">TELEFONE</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Linhas de exemplo. Em um projeto real, você faria um .map() */}
                    <tr>
                        <td><img src="https://via.placeholder.com/50" alt="Foto do funcionário" /></td>
                        <td>Maria Silva</td>
                        <td>Desenvolvedora Front-end</td>
                        <td>01/01/2023</td>
                        <td>(11) 98765-4321</td>
                    </tr>
                    <tr>
                        <td><img src="https://via.placeholder.com/50" alt="Foto do funcionário" /></td>
                        <td>João Santos</td>
                        <td>Gerente de Projetos</td>
                        <td>15/03/2022</td>
                        <td>(11) 91234-5678</td>
                    </tr>
                </tbody>
            </table>

            </div>

        </div>


    );
}

// Exporta o componente para que ele possa ser usado em outros arquivos
export default TabelaColaboradores;