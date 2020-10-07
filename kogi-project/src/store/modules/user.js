import firebase from 'firebase';

const user = {
    state: {
        displayName: '',
        photoUrl: '',
        phoneNumber: '',

    },
    getters: {
        displayName: (state) => state.displayName,
        photoUrl: (state) => state.photoUrl,
        phoneNumber: (state) => state.phoneNumber,
    },

    mutations: {

        SET_DISPLAY_NAME: (state, displayName) => {
            state.displayName = displayName
        },
        SET_PHOTO: (state, photoUrl) => {
            state.photoUrl = photoUrl
        },
        SET_PHONE_NUMBER: (state, phoneNumber) => {
            state.phoneNumber = phoneNumber
        },
    },

    actions: {
        getInfoUser: async ({ commit, state }) => {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    await commit('SET_DISPLAY_NAME', user.displayName)
                    await commit('SET_PHOTO', user.photoUrl)
                    await commit('SET_PHONE_NUMBER', user.phoneNumber)
                }
                else return
            })
        },

        logOut: async ({ commit }) => {
            firebase.auth().signOut().then(async () =>{
                await commit('SET_DISPLAY_NAME', '')
                await commit('SET_PHOTO', '')
                await commit('SET_PHONE_NUMBER','')
                alert("Logout thành công")
            }).catch(function (error) {
                alert("Đã có lỗi xảy ra trong quá trình logout. Xin thử lại")
            });

        },

    }
}

export default user;