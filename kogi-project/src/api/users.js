import RepositoryApp from '@/utils/RepositoryApp'

const resource = '/users'
export default {

	activeUser(params) {
		return RepositoryApp.post(`${resource}/activeUser`,params)
    },
	updateUser(params) {
		return RepositoryApp.post(`${resource}/updateUser`,params)
    },
	sendEmailVerify(params) {
		return RepositoryApp.post(`email/sendEmailVerify`,params)
    },

}