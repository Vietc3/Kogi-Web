import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Kogi Store'

export default function getPageTitle(pageTitle) {
  	if (pageTitle) {
    	return `${pageTitle} - ${title}`
  	}
  	return `${title}`
}
