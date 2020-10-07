import firebase from 'firebase';
import RepositoryFactory from "@/utils/RepositoryFactory";
const UsersRepository = RepositoryFactory.get("users");

const user = {
    state: {
        displayName: '',
        photoUrl: '',
        phoneNumber: '',
        token: '',

    },
    getters: {
        displayName: (state) => state.displayName,
        photoUrl: (state) => state.photoUrl,
        phoneNumber: (state) => state.phoneNumber,
        token: (state) => state.token,
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
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },

    actions: {

        getInfoUser: async ({ commit, state }) => {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
                        // Send token to your backend via HTTPS
                        // ...
              
                        await commit('SET_TOKEN', user.refreshToken);
                        let params = {
                            id_token: idToken,
                            uid: user.uid,
                
                        }
                        let data = await UsersRepository.activeUser(params);
                        let userCurrent = data.data.userInfo;
                        await commit('SET_DISPLAY_NAME', userCurrent.displayName)
                        await commit('SET_PHOTO', userCurrent.photoURL || '')
                        await commit('SET_PHONE_NUMBER', userCurrent.phoneNumber)

                    }).catch(function (error) {
                        // Handle error
                        console.log(error);
                    })
                }
                else return
            })
        },

        signUpWithEmail: async ({ commit }, payload) => {
         let result=   await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return {success:false, message:errorMessage};
                // ...
            });
            await firebase.auth().signOut().then(async () => {
                await commit('SET_DISPLAY_NAME', '')
                await commit('SET_PHOTO', '')
                await commit('SET_PHONE_NUMBER', '')
                await commit('SET_TOKEN', '')
            }).catch(function (error) {
       
            });

            return result;

        },

        loginWithEmail: async ({ commit }, payload) => {
            let result = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return {success:false, message:errorMessage};
                // ...
            });
         return result;
        },





        logOut: async ({ commit }) => {
            firebase.auth().signOut().then(async () => {
                await commit('SET_DISPLAY_NAME', '')
                await commit('SET_PHOTO', '')
                await commit('SET_PHONE_NUMBER', '')
                await commit('SET_TOKEN', '')
                alert("Logout thành công")
            }).catch(function (error) {
                alert("Đã có lỗi xảy ra trong quá trình logout. Xin thử lại")
            });

        },

    }
}

export default user;