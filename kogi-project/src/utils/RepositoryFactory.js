import AssetRepository from '@/api/assets'
import GenresRepository from '@/api/genres'
import UsersRepository from '@/api/users'

const repositories = {
    assets: AssetRepository,
    genres: GenresRepository,
    users: UsersRepository,
}

const RepositoryFactory = {
    get: name => repositories[name]
}


export default RepositoryFactory