# Sistema de Gerenciamento e Agendamento de Viagens

Este projeto é um sistema web desenvolvido para modernizar e otimizar o processo de agendamento de viagens e gerenciamento de horas dos técnicos implantadores em uma empresa. Ele substitui métodos manuais por uma solução automatizada que abrange desde a importação de agendamentos até o acompanhamento das horas dos técnicos e a comunicação via WhatsApp.

## Propósito do Projeto

O objetivo principal deste sistema é atualizar o método de agendamento de viagens e gerenciamento de horas dos técnicos implantadores da empresa. Ele permite que o gerente importe planilhas Excel com agendamentos, visualize, edite e confirme esses dados. O sistema então processa essas informações, agendando-as no banco de dados e enviando mensagens automáticas de WhatsApp para os técnicos com os detalhes de suas viagens semanais. Ao final do mês, os técnicos podem acompanhar suas horas, enviar seus registros por e-mail e acessar seus históricos de viagens, com a possibilidade de configurar o e-mail de envio por usuário.

## Tecnologias Utilizadas

* [cite_start]**Backend:** Node.js  [cite_start]com Express 
* [cite_start]**Frontend:** EJS (com renderização do servidor backend) 
* [cite_start]**Banco de Dados:** MySQL 
* **Integração WhatsApp:** `whatsapp-web.js` com Puppeteer
* [cite_start]**Hospedagem:** Máquina Virtual (VM) na Oracle Cloud 

## Funcionalidades Principais

* **Importação de Planilha Excel:** Gerente pode importar planilhas com dados de agendamento.
* **Gerenciamento de Agendamentos:** Visualização, edição e confirmação de agendamentos de viagens.
* [cite_start]**Notificações Automáticas via WhatsApp:** Disparo de mensagens para técnicos com os detalhes de suas viagens semanais (para até 5 técnicos e 2 vendedores simultaneamente).
* **Controle de Horas dos Técnicos:** Acompanhamento das horas trabalhadas pelos técnicos.
* **Envio de Relatórios:** Técnicos podem enviar suas horas e viagens por e-mail, com configuração de e-mail por usuário.
* [cite_start]**Autenticação de Usuários:** Controle de acesso com autenticação por hash e rotas autenticadas.
* [cite_start]**Cálculo de Horas Extras:** Funcionalidade para calcular horas extras.

## Como Acessar o Projeto

Este é um projeto para utilização interna da empresa. Para acessá-lo, é necessário ter a URL do sistema e as credenciais de usuário e senha fornecidas pela administração.

## Desafios Enfrentados

Durante o desenvolvimento, foram superados diversos desafios, incluindo:

* Implementação da importação e leitura de arquivos Excel.
* Desenvolvimento da integração com WhatsApp, gerenciando dois serviços ativos: um para o envio de mensagens e outro para monitorar a confirmação de recebimento das mensagens e retornar o status para o frontend.

## Status do Projeto

O projeto está atualmente **em produção** e em fase de transição para se tornar a única plataforma utilizada para agendamentos na empresa.

## Objetivo Pessoal

O principal objetivo pessoal com o desenvolvimento deste projeto foi alavancar a carreira profissional.

## Autor

[cite_start]Mateus Chichera de Sousa 
[cite_start]GitHub: [https://github.com/MateusChichera](https://github.com/MateusChichera)
