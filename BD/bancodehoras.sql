-- Tabela de usuários (caso não exista ainda)
CREATE TABLE IF NOT EXISTS Usuario (
    usuid INT PRIMARY KEY AUTO_INCREMENT,
    usunome VARCHAR(100) NOT NULL,
    ususenha VARCHAR(100) NOT NULL
);

-- Tabela de controle de horas
CREATE TABLE IF NOT EXISTS Horas (
    idhora INT PRIMARY KEY AUTO_INCREMENT,
    usuid INT NOT NULL,
    dia DATE NOT NULL,
    entrada TIME,
    cafe1 TIME,
    cafe2 TIME,
    almoco1 TIME,
    almoco2 TIME,
    cafe3 TIME,
    cafe4 TIME,
    saida TIME,
    extra TIME,
    FOREIGN KEY (usuid) REFERENCES Usuarios(usuid)
);

-- Tabela de implantações
CREATE TABLE IF NOT EXISTS implantacoes (
    idimplantacao INT PRIMARY KEY AUTO_INCREMENT,
    usuid INT NOT NULL,
    imp_nome VARCHAR(100),           -- Nome do cliente
    imp_cidade VARCHAR(100),
    imp_estado VARCHAR(50),
    imp_dia DATE,                    -- Data da implantação
    imp_tipo VARCHAR(50),
    imp_obs TEXT,
    FOREIGN KEY (usuid) REFERENCES Usuarios(usuid)
);


//* APOS INSERIR FAÇA AS ALTERAÇÕES*/
ALTER TABLE implantacoes  
ADD COLUMN imp_contato VARCHAR(255),  
ADD COLUMN imp_tel VARCHAR(255),  
ADD COLUMN imp_tel1 VARCHAR(255),  
ADD COLUMN imp_sis VARCHAR(255),  
ADD COLUMN imp_dtvenc DATE,  
ADD COLUMN imp_mensalidade DECIMAL(10,2);
ADD COLUMN imp_tel2 VARCHAR(255),
ADD COLUMN imp_tel3 VARCHAR(255)


alter table Usuario
ADD COLUMN usu_tel VARCHAR(255)