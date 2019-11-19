export const fakeRoutes = {
    getAds: 'ads',
};

export const routes = {
    getAds: 'https://serado.ch/wp-json/wp/v2/job-listings',
    getOneAd: (id: number) => `https://serado.ch/wp-json/wp/v2/job-listings/${id}`,
};
