const sql = require('mssql');
const keys = require('../keys.json');

exports.getLicences = (req, res, next) => {
  // config for your database
  const config = {
    user: keys.mssql_username,
    password: keys.mssql_password184,
    server: 'localhost',
    database: keys.mssql_database,
  };

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    const request = new sql.Request();

    // query to the database and get the records
    request.query(
      `
      SELECT
      G.wstrName as 'OM',
      count(G.wstrName)  as 'qtd licencas' 
      FROM KAV.dbo.apphostskeys AHK 
      INNER JOIN KAV.dbo.v_hosts H ON AHK.nIdHost=H.nId
      INNER JOIN KAV.dbo.v_adm_group G ON H.nGroup = G.nId
      group by G.wstrName
      `,
      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.send(recordset);
      }
    );
  });

  //res.status(200).json({
  //  // 200 = success
  //  posts: [{ title: 'oieeeee', content: 'diaaaaaaaaaaaaaaaaaaaaaaaaaaa' }],
  //});
};
