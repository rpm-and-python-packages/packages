//to check index exists or not in elasticsearch
function existIndex(client,index,callback) {
     

	client.indices.exists({
                index: index,
               
        }).then(function(response){
               
                //console.log("<<< Took seconds: ", response);
				callback(response);
			
                return(response);
        }, function(error_response){
               
                //console.log("<<< Took seconds: ", error_response);
				callback(error_response);
                return(error_response);
        });
}

module.exports.existIndex = existIndex;
//to create index in elasticsearch
function createIndex(client,index,callback) {
     

	client.indices.create({
                index: index,
               
        }).then(function(response){
               
                
				callback(response);
				
                return(response);
        }, function(error_response){
               
               
				callback(error_response);
                return(error_response);
        });
}

module.exports.createIndex = createIndex;
//to insert data in elasticsearch
/*function insertData(client,index,data,callback) {
     

	client.index({
               index: index,
               body: data
               
        }).then(function(response){
               
                
				callback(response);
                return(response);
        }, function(error_response){
               
                
				callback(error_response);
                return(error_response);
        });
}

module.exports.insertData = insertData;*/

var bulk=[];
var madebulk=function(index,type,result,callback){
 console.log(index);
  if(bulk!=null)
    {
     bulk=[];
}
 var datetime = new Date();
var indexbody=0;
var time=0;
indexbody.tstamp = datetime;
  for(var current in result){
     bulk.push(
          {index:{_index:index,_type:type}},
           {
             'url':result[current].url,
              'servicename':result[current].servicename,
              'host':result[current].host,
              'component':result[current].component,
              'Incomplete_requests':result[current].Incomplete_requests,
              'service_module_queue':result[current].service_module_queue,
              'task_queuing_for_TE':result[current].task_queuing_for_TE,
              'undelivered_task_responses':result[current].undelivered_task_responses,
              'finished_requests':result[current].finished_requests,
              'Avg_request_execution_time':result[current].Avg_request_execution_time,
              'time':datetime

             }
           );
        }
  callback(bulk);
}
module.exports.madebulk=madebulk;
var indexall=function(client,index,type,madebulk,callback){
          client.bulk({
          maxRetries:5,
          index:index,
          type:type,
          body:madebulk
     }).then(function(response){
       callback(response);
        return(response);
       },function(error_response){
            callback(error_response);
             return(error_response);
      });
    

}
module.exports.indexall=indexall;

