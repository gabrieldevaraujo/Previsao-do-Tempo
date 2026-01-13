# Previsão-do-Tempo
Este projeto foi desenvolvido como um desafio pessoal para consolidar e expandir meus conhecimentos em desenvolvimento web front-end. O objetivo principal foi criar uma aplicação funcional de previsão do tempo que consome dados reais, tratando a complexidade de APIs externas e oferecendo uma experiência de usuário (UX) moderna e adaptável.

 - Propósito do Projeto
Diferente de tutoriais prontos, este projeto focou no desenvolvimento de habilidades críticas e na resolução de problemas reais de lógica, como:

Tratamento de Dados Assíncronos: Gerenciar requisições fetch para obter coordenadas geográficas e, em seguida, os dados climáticos.

Lógica de Negócio: A API utilizada retorna previsões a cada 3 horas. Desenvolvi uma lógica personalizada para filtrar e comparar esses dados, exibindo apenas as temperaturas máxima e mínima reais de cada dia.

Persistência de Dados: Uso do localStorage para manter uma lista de cidades favoritas salva no navegador do usuário.

 - Tecnologias e Conceitos Utilizados
Core Técnico
JavaScript (ES6+): Uso intensivo de módulos (import/export), manipulação de DOM, e métodos de array de alta ordem como .map(), .filter(), .forEach() e .slice().

Consumo de API: Integração com a OpenWeatherMap API (Geocoding e 5 Day Forecast).

Web Storage: Implementação de cache local para evitar requisições desnecessárias e melhorar a performance.

 - Interface e UX
CSS Dinâmico (Variáveis CSS): O sistema de cores do aplicativo muda automaticamente (Manhã, Tarde e Noite) baseando-se no horário local do computador do usuário.

Design Responsivo: Layout adaptável utilizando Flexbox e CSS Grid para garantir uma boa experiência em dispositivos móveis e desktop.

Glassmorphism: Estética moderna com uso de backdrop-filter: blur e transparências.
