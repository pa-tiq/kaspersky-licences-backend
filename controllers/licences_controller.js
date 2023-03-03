const sql = require('mssql/msnodesqlv8');
const keys = require('../keys.json');

const licencesQuery = `
  SELECT
  G.wstrName as 'OM',
  count(G.wstrName)  as 'qtd_licencas' 
  FROM dbo.apphostskeys AHK 
  INNER JOIN dbo.v_hosts H ON AHK.nIdHost=H.nId
  INNER JOIN dbo.v_adm_group G ON H.nGroup = G.nId
  group by G.wstrName
  `;

exports.getLicences183 = (req, res, next) => {
  // config for your database
  let result_object;
  const config = {
    user: keys.mssql_username183,
    password: keys.mssql_password183,
    server: keys.mssql_server183,
    driver: 'msnodesqlv8',
    port: keys.mssql_port,
    database: keys.mssql_database,
    options: {
      trustedConnection: true,
    },
  };

  try {
    const pool = new sql.ConnectionPool(config);
    pool.connect().then(() => {
      pool.request().query(licencesQuery, (err, result) => {
        result_object = result;
        res.send(result);
      });
    });
  } catch (error) {
    console.log(error);
    res.send(result_object);
  }
};

exports.getLicences184 = (req, res, next) => {
  // config for your database
  let result_object;
  const config = {
    user: keys.mssql_username184,
    password: keys.mssql_password184,
    server: keys.mssql_server184,
    driver: 'msnodesqlv8',
    port: keys.mssql_port,
    database: keys.mssql_database,
    options: {
      trustedConnection: true,
    },
  };

  try {
    const pool = new sql.ConnectionPool(config);
    pool.connect().then(() => {
      pool.request().query(licencesQuery, (err, result) => {
        result_object = result;
        res.send(result);
      });
    });
  } catch (error) {
    console.log(error);
    res.send(result_object);
  }
};
