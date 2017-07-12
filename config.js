/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = '********.qcloud.la';

var config = {

  // 下面的地址配合云端工作
  service: {
    host,
    listURL: `https://${host}/list?`,
    searchidUrl: `https://${host}/searchid?id=`,
    searchnameUrl: `https://${host}/searchname?name=`,
    searchuserUrl: `https://${host}/searchuser?psnid=`

  }
};

module.exports = config;