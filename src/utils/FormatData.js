// Função para formatar a data de YYYY-MM-DDTHH:mm:ss.sssZ para DD/MM/YYYY
export const formatDate = (dateString) => {
    if (!dateString) return ''; // Retorna vazio se a data for nula ou indefinida

    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    // Precisa somar +1 pois os meses começam vão do 0 ao 11
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
};

// Função para formatar o telefone de 5551234567890 para +55 (51) 23456-7890
export const formatPhone = (phoneString) => {
    if (!phoneString) return ''; // Retorna vazio se o telefone for nulo ou indefinido

    // Remove caracteres não numéricos, se houver
    const cleaned = ('' + phoneString).replace(/\D/g, '');

    const countryCode = cleaned.substring(0, 2);
    const areaCode = cleaned.substring(2, 4);
    const firstPart = cleaned.substring(4, 9);
    const secondPart = cleaned.substring(9, 13);

    return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
};