
//切图素材
export default {
    dummy_image: (w = 600, h = 400, bc = 'ff66a5', fc = 'fff', txt, f = 'jpg') => `https://dummyimage.com/${w}x${h}/${bc}/${fc}.${f}${txt ? `&text=${txt}` : ''}`,
    // startup: require('./images/startup.png'),

};
