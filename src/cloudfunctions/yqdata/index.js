// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk');
const axios = require('axios');
const iconv = require('iconv-lite');
const url = "https://lspengine.map.sogou.com/coronavirus/epidemic/search/area/info";

const http = axios.create({
    baseURL: url,
    responseType: "arraybuffer"
})

http.interceptors.response.use(res => {
    res.data = iconv.decode(res.data, 'gbk')
    return res
})

// 初始化 cloud
cloud.init();

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */

exports.main = async(event, context) => {
    const res = await http.get("/")
    return res.data;
}