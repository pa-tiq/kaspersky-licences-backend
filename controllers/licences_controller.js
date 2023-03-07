const sql = require('mssql');
const keys = require('../keys.json');
const fs = require('fs');

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
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const tryGetLicenceCount = (res,config, server) => {
  sql
    .connect(config)
    .then(() => {
      return new sql.Request().query(licencesQuery);
    })
    .then((err, result) => {
      if (err) {
        if (err.recordset) {
          let data = JSON.stringify(err.recordset);
          fs.writeFileSync(`${server}.json`, data);
          res.send(err.recordset);
        }
        else {
          throw new Error(err.message);
        }
      } else {
        let data = JSON.stringify(result.recordset);
        fs.writeFileSync(`${server}.json`, data);
        res.send(result.recordset);
      }
    })
    .catch((error) => {
      let rawdata = fs.readFileSync(`${server}.json`);
      let data = {};
      if (rawdata) {
        data = JSON.parse(rawdata);
      }
      console.log(error);
      res.send({ data, error });
    });
}

exports.get183Licences = (req, res, next) => {
  const config = {
    password: keys.mssql_password183,
    server: keys.mssql_server183,
    port: keys.mssql_port183,
    ...configCommon,
  };

  tryGetLicenceCount(res,config,'183');
};

exports.get184Licences = (req, res, next) => {
  const config = {
    password: keys.mssql_password184,
    server: keys.mssql_server184,
    port: keys.mssql_port184,
    ...configCommon,
  };

  tryGetLicenceCount(res,config,'184');
};
