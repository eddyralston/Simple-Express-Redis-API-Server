function db(url,method,data){
   var config = {
      method: method,
      headers:{ 
         'Accept': 'application/json', 
         'Content-Type': 'application/json'
      }
   }
   if(method=='post'||'put')config.body=JSON.stringify(data)
   return {then:function(callback){
      var host = window.location
      fetch('http://'+host.hostname+':'+host.port+'/api/'+url,config).then(json=>json.json()).then(callback)
   }}
   
}
const html = string => {
   var wrap = document.createElement('div')
   wrap.innerHTML=string
   return wrap.firstElementChild
}

