import RepositoryApp from '@/utils/RepositoryApp'

const resource = '/assets'
export default {

	get() {
		return RepositoryApp.get(`${resource}`)
    },
	getHome() {
		return RepositoryApp.get(`${resource}/home?page=1`)
    },
	getTopRate(page) {
		return RepositoryApp.get(`${resource}/toprated?page=`+page)
    },
	getTopNew(page) {
		return RepositoryApp.get(`${resource}/topnew?page=`+page)
    },
	getTopUpcoming(page) {
		return RepositoryApp.get(`${resource}/upcoming?page=`+page)
    },
	getTopPopular(page) {
		return RepositoryApp.get(`${resource}/popular?page=`+page)
    },
	findAssetById(id) {
		return RepositoryApp.get(`${resource}/findAssetById?asset_id=`+id)
    },
	findAssetByGenres(genres) {
		return RepositoryApp.get(`${resource}/bygenres?code=`+genres)
    },
	findRatingComments(id) {
		return RepositoryApp.get(`users/ratingComments?asset_id=`+id)
    },
}
