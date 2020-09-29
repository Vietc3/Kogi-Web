import RepositoryApp from '@/utils/RepositoryApp'

const resource = '/assets'
export default {

	get() {
		return RepositoryApp.get(`${resource}`)
    },
	getHome() {
		return RepositoryApp.get(`${resource}/home?page=1`)
    },
	getTopRate() {
		return RepositoryApp.get(`${resource}/toprated?page=1`)
    },
}
