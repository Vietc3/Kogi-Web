import RepositoryApp from '@/utils/RepositoryApp'

const resource = '/genres'
export default {

	get() {
		return RepositoryApp.get(`${resource}`)
    },

}
