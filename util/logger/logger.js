var debugLevel ='error';

/** 
* Get current time when someone is writing to the log
*/
var currentTime = function(){
  // Get the information for the time&date logger
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth()+1; 
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds(); 
  // Modify the format
  if(month.toString().length == 1)
    var month = '0'+month;
  if(day.toString().length == 1)
    var day = '0'+day;
  if(hour.toString().length == 1)
    var hour = '0'+hour;
  if(minute.toString().length == 1)
    var minute = '0'+minute;
  if(second.toString().length == 1)
    var second = '0'+second; 
  var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
  return dateTime;
};  

exports.out = function(level, file , functionName, message) {
  var levels = ['error', 'warn', 'info'];
  if (levels.indexOf(level) >= levels.indexOf(debugLevel) ) {
    if (typeof message !== 'string') {
    message = JSON.stringify(message);
  };
	console.log(currentTime() + ': ['+level+'] - ' + '[' + file + '] - ' + '[' + 
							functionName + ']' + ' : ' + message);
  }
}