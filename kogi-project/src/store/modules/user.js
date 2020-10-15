import firebase from 'firebase';
import RepositoryFactory from "@/utils/RepositoryFactory";
const UsersRepository = RepositoryFactory.get("users");

const user = {
    state: {
        displayName: '',
        photoUrl: '',
        phoneNumber: '',
        token: '',
        point: 0,
        email: '',
        id: '',
        sex: '',
        dayOfBirth: '',
    },
    getters: {
        displayName: (state) => state.displayName,
        id: (state) => state.id,
        photoUrl: (state) => state.photoUrl,
        phoneNumber: (state) => state.phoneNumber,
        email: (state) => state.email,
        sex: (state) => state.sex,
        point: (state) => state.point,
        token: (state) => state.token,
        dayOfBirth: (state) => state.dayOfBirth,
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
        SET_POINT: (state, point) => {
            state.point = point
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_SEX: (state, sex) => {
            state.sex = sex
        },
        SET_BIRTHDAY: (state, dayOfBirth) => {
            state.dayOfBirth = dayOfBirth
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
                        await commit('SET_POINT', userCurrent.points.total)
                        await commit('SET_EMAIL', userCurrent.email)
                        await commit('SET_SEX', userCurrent.sex ? userCurrent.sex : '')
                        await commit('SET_ID', userCurrent.id)
                        await commit('SET_BIRTHDAY', userCurrent.dayOfBirth ? userCurrent.dayOfBirth : '')

                    }).catch(function (error) {
                        // Handle error
                        console.log(error);
                    })
                }
                else return
            })
        },

        signUpWithEmail: async ({ commit }, payload) => {

            let result = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return { success: false, message: errorMessage };
                // ...
            });
            return result;

        },

        loginWithEmail: async ({ commit }, payload) => {
            let result = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return { success: false, message: errorMessage };
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
                await commit('SET_POINT', '')
                await commit('SET_EMAIL', '')
                await commit('SET_SEX', '')
                await commit('SET_ID', '')
                await commit('SET_BIRTHDAY','')

            }).catch(function (error) {

            });

        },

    }
}

export default user;