// 对axios进行二次封装
import axios from 'axios';

// 利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    // 基础路径，发请求的时候，路径中会出现api
    // 代表请求超时的时间为5s
    timeout: 5000,
})
// requests.defaults.withCredentials = true
// 对外暴露
export default requests;