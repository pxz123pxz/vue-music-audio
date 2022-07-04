// 当前这个模块：API统一管理
import requests from './aiax'

// 搜索音乐
export const reqSongMsg = (keyword) => requests({url:`/search?key=${keyword}`,method: 'get'})

// 获取歌曲链接
export const reqGetSongPlayLink = (songmid) => requests({url:`/song/urls?id=${songmid}`,method: 'get'})

// 获取用户Cookie
export const reqGetUserCookie = (id) => requests({url:`/user/getCookie?id=${id}`,method: 'get'})

// 设置用户Cookie
export const reqSetUserCookie = (data) => requests({url:'/user/setCookie',method: 'post',data: data})

// 查看当前Cookie
export const reqCurrentCookie = () => requests({url:"/user/cookie",method: 'get'})

//获取歌词
export const reqGetMusicLyric = (songmid) => requests({url:`/lyric?songmid=${songmid}`,method: 'get'})

// 获取歌曲信息，包括歌手、专辑、语种、曲风等
export const reqGetMusicMessage = (songmid) => requests({url: `/song?songmid=${songmid}`,method: 'get'})

// 获取用户主页信息
export const reqGetUserHomePage = (qq) =>requests({url:`/user/detail?id=${qq}`,method:'get'})

// 获取歌单详情
export const reqGetMusicListInfo = (id) =>requests({url:`/songlist?id=${id}`,method:'get'});