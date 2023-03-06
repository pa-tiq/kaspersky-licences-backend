const sql = require('mssql');
const keys = require('../keys.json');

const licencesQuery = ` SELECT
  G.wstrName as 'OM',
  count(G.wstrName)  as 'qtd_licencas' 
  FROM dbo.apphostskeys AHK 
  INNER JOIN dbo.v_hosts H ON AHK.nIdHost=H.nId
  INNER JOIN dbo.v_adm_group G ON H.nGroup = G.nId
  group by G.wstrName
  `;
const configCommon = {
  database: keys.mssql_database,
  user: keys.mssql_username,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

exports.getLicences183 = (req, res, next) => {
  let result_object_183 = {};
  const config = {
    password: keys.mssql_password183,
    server: keys.mssql_server183,
    port: keys.mssql_port183,
    ...configCommon,
  };

  const sendQuery = async () => {
    try {
      await sql.connect(config);
      new sql.Request().query(licencesQuery, (err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          result_object_183 = result.recordset;
          res.send(result.recordset);
        }
      });
    } catch (err) {
      console.log(err);
      res.send({ result_object_183, err });
    }
  };

  sendQuery();
};

exports.getLicences184 = (req, res, next) => {
  let result_object_184 = {};
  const config = {
    password: keys.mssql_password184,
    server: keys.mssql_server184,
    port: keys.mssql_port184,
    ...configCommon,
  };

  const sendQuery = async () => {
    try {
      await sql.connect(config);
      new sql.Request().query(licencesQuery, (err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          result_object_184 = result.recordset;
          res.send(result.recordset);
        }
      });
    } catch (err) {
      console.log(err);
      res.send({ result_object_184, err });
    }
  };

  sendQuery();
};
