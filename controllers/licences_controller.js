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

exports.get183Licences = (req, res, next) => {
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
          let data = JSON.stringify(result.recordset);
          fs.writeFileSync('183.json',data);
          res.send(result.recordset);
        }
      });
    } catch (err) {
      let rawdata = fs.readFileSync('183.json');
      let data = {};
      if(rawdata) {
        data = JSON.parse(rawdata);
      }      
      console.log(err);
      res.send({ data, err });
    }
  };

  sendQuery();
};

exports.get184Licences = (req, res, next) => {
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
          let data = JSON.stringify(result.recordset);
          fs.writeFileSync('184.json',data);
          res.send(result.recordset);
        }
      });
    } catch (err) {
      let rawdata = fs.readFileSync('184.json');
      let data = {};
      if(rawdata) {
        data = JSON.parse(rawdata);
      }
      console.log(err);
      res.send({ data, err });
    }
  };

  sendQuery();
};
