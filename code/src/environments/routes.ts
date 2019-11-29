export const fakeRoutes = {
    getAds: 'ads',
};

export const routes = {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    getAds: 'https://serado.ch/wp-json/wp/v2/job-listings?per_page=50',
    getOneAd: (id: number) => `https://serado.ch/wp-json/wp/v2/job-listings/${id}`,
    infos: 'https://serado.ch/info-appli/',
};
