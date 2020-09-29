import AssetRepository from '@/api/assets'
import GenresRepository from '@/api/genres'

const repositories = {
    assets: AssetRepository,
    genres: GenresRepository,
}

const RepositoryFactory = {
    get: name => repositories[name]
}


export default RepositoryFactory