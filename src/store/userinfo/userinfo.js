const state = {
    user: {},
    LoveMusicList: [],
};
const actions = {
    getUserInfo(context,user) {
        context.commit('GETUSERINFO',user);
    },
    getMyLoveMusicList(context,LoveMusicList){
        context.commit('GETMYLOVEMUSICLIST',LoveMusicList);
    }
};
const mutations = {
    GETUSERINFO(state,user) {
        state.user = user;
    },
    GETMYLOVEMUSICLIST(state,LoveMusicList) {
        state.LoveMusicList = LoveMusicList;
    }
};
const getters = {
    Creator(state) {
        if(Object.keys(state.user).length !== 0){
            return { 
                headpicurl: state.user.creator.headpic || '',
                nick: state.user.creator.nick || '',
                nums: state.user.creator.nums.follownum || 0,
                myloveid: state.user.mymusic[0].id || '',
                boughtUrl: state.user.mymusic[1].jumpurl || ''
            }
        }else{
            return {}
        }
        
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
}