const sql = require('mssql/msnodesqlv8');
const keys = require('../keys.json');

exports.getLicences = (req, res, next) => {
  // config for your database
  const config = {
    user: keys.mssql_username,
    password: keys.mssql_password184,
    server: 'localhost',
    driver: 'msnodesqlv8',
    port: keys.mssql_port,
    database: keys.mssql_database,
    options: {
      trustedConnection: true,
    },
  };

  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
    pool.request().query(
      `
      SELECT
      G.wstrName as 'OM',
      count(G.wstrName)  as 'qtd_licencas' 
      FROM dbo.apphostskeys AHK 
      INNER JOIN dbo.v_hosts H ON AHK.nIdHost=H.nId
      INNER JOIN dbo.v_adm_group G ON H.nGroup = G.nId
      group by G.wstrName
      `,
      (err, result) => {
        res.send(result);
      }
    );
  });

};
