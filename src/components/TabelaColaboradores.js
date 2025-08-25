import React, { useState, useEffect } from 'react';
import './TabelaColaboradores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Para usar ícones Font Awesome
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Importa a biblioteca Axios
import { formatDate, formatPhone } from '../utils/FormatData'; // Importa as duas funções de formatação

function TabelaColaboradores() {
    const [funcionarios, setFuncionarios] = useState([]); // 1. Estado para armazenar os dados
    const [loading, setLoading] = useState(true); // 2. Estado para indicar carregamento
    const [error, setError] = useState(null); // 3. Estado para lidar com erros
    const [searchTerm, setSearchTerm] = useState(''); // 1. Novo estado para o termo de pesquisa
    const [expandedRowId, setExpandedRowId] = useState(null); // Estado para controlar a linha expandida

    // O useEffect executa a função quando o componente é montado
    useEffect(() => {
        // Função assíncrona para buscar os dados
        const fetchFuncionarios = async () => {
            try {
                setLoading(true); // Inicia o estado de carregamento
                const response = await axios.get('http://localhost:3000/employees');
                setFuncionarios(response.data); // Armazena os dados no estado
            } catch (err) {
                setError("Não foi possível carregar os dados dos funcionários.");
                console.error("Erro ao buscar dados:", err);
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchFuncionarios();
    }, []); // O array vazio [] garante que a função só roda uma vez, ao montar o componente

    // 2. Lógica de filtragem
    const filteredFuncionarios = funcionarios.filter((funcionario) => {
        // Converte todos os campos para minúsculas para uma pesquisa case-insensitive
        const name = funcionario.name.toLowerCase();
        const job = funcionario.job.toLowerCase();
        const phone = formatPhone(funcionario.phone).toLowerCase();
        const term = searchTerm.toLowerCase();

        // Retorna true se o termo de pesquisa for encontrado em qualquer um dos campos
        return (
            name.includes(term) ||
            job.includes(term) ||
            phone.includes(term)
        );
    });

    // Função para alternar a visibilidade de uma linha
    const toggleRow = (id) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    // Condicionais para renderizar o estado atual
    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="lista-funcionarios-container">
            <div className="beTalent"><h3><b>Be</b>Talent</h3></div>
            <div className="tabelaFuncionarios">
                <div className="header">
                    <h3>Funcionários</h3>
                    <div className="search-input-wrapper">
                        <input type="text" placeholder="Pesquisar" className="search-input-field" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    </div>
                </div>

                {searchTerm && filteredFuncionarios.length === 0 ? (
                    <div className="no-results-message">
                        Nenhum funcionário encontrado com o termo "{searchTerm}".
                    </div>
                ) : (

                    <table className="tabela-arredondada">
                        <thead>
                            <tr>
                                <th className="cabecalho">FOTO</th>
                                <th className="cabecalho">NOME</th>
                                <th className="column-desktop">CARGO</th>
                                <th className="column-desktop">DATA DE ADMISSÃO</th>
                                <th className="column-desktop">TELEFONE</th>
                                <th className="column-mobile-arrow"></th>{/* Coluna para a seta */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeia o array 'funcionarios' para criar uma linha da tabela para cada um */}
                            {filteredFuncionarios.map((funcionario) => (
                                <React.Fragment key={funcionario.id}>
                                    <tr onClick={() => toggleRow(funcionario.id)} className="employee-row">{/* 'key' é essencial para o React */}
                                        <td><img src={funcionario.image} alt={`Foto de ${funcionario.nome}`} /></td>
                                        <td className="column-name">{funcionario.name}</td>
                                        <td className="column-desktop">{funcionario.job}</td>
                                        <td className="column-desktop">{formatDate(funcionario.admission_date)}</td>{/* Data formatada */}
                                        <td className="column-desktop">{formatPhone(funcionario.phone)}</td>{/* Telefone formatado */}
                                        <td className="column-mobile-arrow">
                                            <FontAwesomeIcon
                                                icon={expandedRowId === funcionario.id ? faChevronDown : faChevronRight}
                                            />
                                        </td>
                                    </tr>
                                    {expandedRowId === funcionario.id && (
                                        <tr className="expanded-details">
                                            <td colSpan="6">
                                                <div className="details-container">
                                                    <div className="detail-item"><strong>Cargo:</strong><br />{funcionario.job}</div>
                                                    <div className="detail-item"><strong>Data de Admissão:</strong><br />{formatDate(funcionario.admission_date)}</div>{/* Data formatada */}
                                                    <div className="detail-item"><strong>Telefone:</strong><br />{formatPhone(funcionario.phone)}</div>{/* Telefone formatado */}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// Exporta o componente para que ele possa ser usado em outros arquivos
export default TabelaColaboradores;