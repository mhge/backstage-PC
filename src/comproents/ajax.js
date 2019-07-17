import $ from "jquery"

function ajax(headers,type,url,params,callback){
   $.ajax({
    headers:headers,
       type:type,
       url:url,
       data:params,
       dataType:"json",
       async:true,
       success:function(data){
        callback(data)
       }
   })
}


export default ajax;