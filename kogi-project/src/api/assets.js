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
