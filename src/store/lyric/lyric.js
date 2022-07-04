import {reqGetMusicMessage,reqGetSongPlayLink} from '@/api/index';
const state = {
    musicLyric: "",
    currentTime: '',
    totalTime: '00:00',
    updateTotalTime:'00:00',
    audio: null,
    width:'0%',
    link: '',
    duration: 0,
    isPlay: false,
    songmid: '',
    albummid: '',
    songname: '',
    singername: '',
};
const actions = {
    getMusicLyric(context,musicLyric){
        context.commit('GETMUSICLYRIC',musicLyric);
    },
    getMusicCurrentTime(context,{currentTime,totalTime,updateTotalTime,audio,width,duration,isPlay}){
        context.commit('GETMUSICCURRENTTIME',{currentTime,totalTime,updateTotalTime,audio,width,duration,isPlay});
    },
    updateData(context,{width,currentTime}){
        context.commit('UPDATEDATA',{width,currentTime});
    },
    updateAudioStatus(context,isPlay){
        context.commit('UPDATEAUDIOSTATUS',isPlay);
    },
    async getLinkAndAlbum(context,{songmid,songname,singername}){
        let resultMsg = await reqGetMusicMessage(songmid);
        let albummid = resultMsg.data.data.track_info.album.mid;
        // console.log(albummid);
        let playlink = await reqGetSongPlayLink(songmid);
        if(playlink.data.result === 200) {
            alert("该音乐无法播放");
        }else{
            // 登录信息过期
            if(!playlink.data.data[songmid]){
                alert("登录信息过期，请重新登录")
            }else{
                context.commit('GETLINKANDALBUM',{songmid,albummid,link:playlink.data.data[songmid],songname,singername});
            }
        }
    }
};
const mutations = {
    GETMUSICLYRIC(state,musicLyric) {
        state.musicLyric = musicLyric;
    },
    GETMUSICCURRENTTIME(state,{currentTime,totalTime,updateTotalTime,audio,width,duration,isPlay}) {
        state.currentTime = currentTime.toFixed(3);
        state.totalTime = totalTime;
        state.updateTotalTime = updateTotalTime;
        state.audio = audio;
        state.width = width;
        state.duration = duration;
        state.isPlay = isPlay;
    },
    UPDATEDATA(state,{width,currentTime}){
        state.width = width;
        state.currentTime = currentTime;
    },
    UPDATEAUDIOSTATUS(state,isPlay){
        state.isPlay = isPlay;
    },
    GETLINKANDALBUM(state,{songmid,albummid,link,songname,singername}) {
        state.albummid = albummid;
        state.link = link;
        state.songname = songname;
        state.singername = singername;
        state.songmid = songmid;
    }
};
const getters = {
    newLyricList(state){
        let lyrics = state.musicLyric.split("\n").slice(5);//用换行符拆分获取到的歌词
        let ArrayLyric = new Array();//定义一个新数组
        lyrics.forEach((item)=>{
            // if(item.substring(item.indexOf("]")+1,item.length)=== "") return;
            let t = item.substring(item.indexOf("[")+1,item.indexOf("]"));
            ArrayLyric.push({
                time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
                words: item.substring(item.indexOf("]")+1,item.length)
            });
        })
        return ArrayLyric ;
    },
    musicTitle(state){
        let title = state.musicLyric.split("\n").slice(0,3);
        let ArrayTitle = new Array();
        title.forEach((item)=>{
            let name = item.substring(item.indexOf("[")+1,item.indexOf("]"));
            ArrayTitle.push(name.split(":")[1])
        })
        return ArrayTitle;
    },
    albumImage(state){
        if(state.albummid){
            return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${state.albummid}.jpg`
        }else{
            return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003vyvvf2kbfel.jpg'
        }
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
}