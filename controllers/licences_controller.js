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
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 200,
    destroyTimeoutMillis: 200,
    reapIntervalMillis: 200,
    acquireTimeoutMillis: 3000,
    createTimeoutMillis: 3000,
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const tryGetLicenceCount = async (res, config, server) => {
  try {
    const conn = await sql.connect(config);
    console.log(`Buscando licenças no ${server}...`);
    return new sql.Request()
      .query(licencesQuery)
      .then((result, err) => {
        if (err) {
          if (err.recordset) {
            console.log(`Licenças do ${server} obtidas, mas com erro:`);
            console.dir(err);
            let data = JSON.stringify(err.recordset);
            fs.writeFileSync(`${server}.json`, data);
            res.send(err.recordset);
          } else {
          }
        } else {
          console.log(`Licenças do ${server} obtidas!`);
          let data = JSON.stringify(result.recordset);
          data = data.filter((item)=>
            item['OM'] !== "pqrmnt12.intranet"
          );
          fs.writeFileSync(`${server}.json`, data);
          res.send(result.recordset);
        }
      })
      .finally(() => {
        conn.close();
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    let rawdata = fs.readFileSync(`${server}.json`);
    let data = {};
    if (rawdata) {
      data = JSON.parse(rawdata);
    }
    console.log('Erro!');
    console.log(error);
    res.send({ data, error });
  }

  //sql
  //  .connect(config)
  //  .then(() => {
  //    console.log(`Buscando licenças no ${server}...`);
  //    return new sql.Request().query(licencesQuery);
  //  })
  //  .then((result, err) => {
  //    if (err) {
  //      if (err.recordset) {
  //        console.log(`Licenças do ${server} obtidas, mas com erro:`);
  //        console.dir(err);
  //        let data = JSON.stringify(err.recordset);
  //        fs.writeFileSync(`${server}.json`, data);
  //        res.send(err.recordset);
  //      } else {
  //        throw new Error(err.message);
  //      }
  //    } else {
  //      console.log(`Licenças do ${server} obtidas!`);
  //      let data = JSON.stringify(result.recordset);
  //      fs.writeFileSync(`${server}.json`, data);
  //      res.send(result.recordset);
  //    }
  //  })
  //  .catch((error) => {
  //    let rawdata = fs.readFileSync(`${server}.json`);
  //    let data = {};
  //    if (rawdata) {
  //      data = JSON.parse(rawdata);
  //    }
  //    console.log('Erro!');
  //    console.log(error);
  //    res.send({ data, error });
  //  });
  //conn.close();
};

exports.get183Licences = async (req, res, next) => {
  const config183 = {
    password: keys.mssql_password183,
    server: keys.mssql_server183,
    port: keys.mssql_port183,
    ...configCommon,
  };

  await tryGetLicenceCount(res, config183, '183');
};

exports.get184Licences = async (req, res, next) => {
  const config184 = {
    password: keys.mssql_password184,
    server: keys.mssql_server184,
    port: keys.mssql_port184,
    ...configCommon,
  };

  await tryGetLicenceCount(res, config184, '184');
};
