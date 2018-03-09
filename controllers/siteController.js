const { MongoClient } = require('mongodb');
const config = require('config');

module.exports = {
  getSites: (req, res) => {
    const output = {};
    const errors = [];

    MongoClient.connect(config.db.connectString, (err, client) => {
      if (err) {
        errors.push(err);
        output.errors = errors;
        res.status(400).json(output);
        client.close();
      } else {
        client.db(config.db.dbName)
          .collection(config.db.collection)
          .find()
          .toArray((queryErr, docs) => {
            if (queryErr) {
              errors.push(queryErr);
              output.errors = errors;
              res.status(400).json(output);
            } else {
              output.sites = docs;
              res.status(200).json(output);
            }
            client.close();
          });
      }
    });
  },
  createSite: (req, res) => {
    const output = {};
    const errors = [];
    const currentDate = new Date();

    MongoClient.connect(config.db.connectString, (err, client) => {
      if (err) {
        errors.push(err);
        output.errors = errors;
        res.status(400).json(output);
        client.close();
      } else {
        const site = {};
        site.Name = req.body.name;
        site.URL = req.body.url;
        site.Created_On = new Date(currentDate.toLocaleString());

        client.db(config.db.dbName).collection(config.db.collection).insertOne(
          site,
          (error, result) => {
            if (error) {
              errors.push(error);
              output.errors = errors;
              res.status(500).json(output);
            } else {
              output.message = 'site created successfully';
              output.result = result;
              res.status(200).json(output);
            }
            client.close();
          },
        );
      }
    });
  },
};
