import AssetRepository from '@/api/assets'

const repositories = {
    assets: AssetRepository,
}

const RepositoryFactory = {
    get: name => repositories[name]
}


export default RepositoryFactory