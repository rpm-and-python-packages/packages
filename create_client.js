const ES = require('elasticsearch');
const logger=require('./winstone');
//to create client for elasticsearch
function createClient() {
        var elastic = new ES.Client({
	        host: "10.5.98.200:9200",
        	log: 'trace'
	});
	elastic.ping({
		requestTimeout: 3000,
	}, function(error) {
		if (error) {
        logger.info('elasticsearch cluster is down!');
    } else {
        logger.info('Adding connection to http://localhost:9200/');
    }
	});
        return elastic;
}

module.exports.createClient = createClient;
