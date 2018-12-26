CREATE EXTENSION oracle_fdw;
CREATE SERVER wpd FOREIGN DATA WRAPPER oracle_fdw OPTIONS (dbserver '//HCOR-BD01.HCOR.LOCAL/PROD');
GRANT USAGE ON FOREIGN SERVER wpd TO cc;
CREATE USER MAPPING FOR cc SERVER wpd OPTIONS (user 'financeiro', password 'financeiro');

DROP FOREIGN TABLE IF EXISTS produto;
CREATE FOREIGN TABLE produto (
  setor VARCHAR(70) NOT NULL,
  id CHAR(7) OPTIONS (key 'true') NOT NULL,
  descricao VARCHAR(70) NOT NULL,
  estoque number
) SERVER wpd
OPTIONS (table '(SELECT SETOR.DESCRICAO AS SETOR, PRODUTO.CODIGO, PRODUTO.DESCRICAO, ESTOQUE.EST_ATU AS ESTOQUE FROM ESESTCAD ESTOQUE
                   INNER JOIN FASETCAD SETOR ON ESTOQUE.COD_SET = SETOR.COD_SET
                   INNER JOIN FAPRDCAD PRODUTO ON ESTOQUE.COD_PRD = PRODUTO.CODIGO)', readonly 'true');

