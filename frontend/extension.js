module.exports = {
    name: 'Frontend',
    publisher: 'Sample',
    cards: [{
        type: 'FrontendCard',
        source: './src/cards/FrontendCard',
        title: 'Frontend Card',
        displayCardType: 'Frontend Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};