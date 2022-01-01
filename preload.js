const exec = require('child_process');
const iconv = require('iconv-lite')
var adbCommand = "/Users/lanshifu/Library/Android/sdk/platform-tools/adb";
//var adbCommand = "adb"
var apksignerCommand = "/Users/lanshifu/Library/Android/sdk/build-tools/25.0.2/apksigner";
var encoding = 'GBK';
var binaryEncoding = 'binary';

window.getRootPath = function(){
    let url = document.location.toString();
    url = url.replace("file:///","")
    if(url.indexOf("/") !== -1){
        url = url.substring(0,  url.lastIndexOf("/")) ;
    }
    return url;
}

window.adb = function (ext,fun) {
	ext = ext.replace('adb',window.getRootPath() + "/tools/adb")
	ext = ext.replace('apksigner',window.getRootPath() + "/tools/apksigner")
	ext = ext.replace('findstr',"grep")
	ext = ext.replace('aapt',window.getRootPath() + "/tools/aapt")
	ext = ext.replace('keytool',window.getRootPath() + "/tools/keytool")
  exec.exec(ext,{ encoding: 'binary',env: {'adb': window.getRootPath() + "/tools/adb"}}, (err, stdout, stderr)=>{
    console.log("err=" + err + ",stdout="+stdout + ",stderr="+stderr)
    if(stderr!==''){
      fun(iconv.decode(new Buffer(stderr, binaryEncoding), encoding),true)
    }else if(stdout!==''){
      fun(iconv.decode(new Buffer(stdout, binaryEncoding), encoding),false)
    }else if(err!=='' && err!=null){
      fun(iconv.decode(new Buffer(err, binaryEncoding), encoding),true)
    }else{
      fun("异常错误")
    }
    
  })
}

