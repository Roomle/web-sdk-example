import RoomleSdk from 'roomle-web-sdk';

((async function () {
    const element = document.getElementById('roomle-canvas-container');
    if (window.location.href.includes('useConfigurator=true')) {
        const roomleConfigurator = await RoomleSdk.getConfigurator();
        roomleConfigurator.boot();

        let didSetParameter = false;
        roomleConfigurator.getApi().callbacks.onUpdateParameters = (params) => {
            if (!didSetParameter) {
                setTimeout(async () => {
                    didSetParameter = true;
                    await roomleConfigurator.getApi().setParameter(params[0], 'usm:red');
                    console.log('Change material to red');

                }, 3000);
            }
        };

        await roomleConfigurator.getApi().init(element);
        await roomleConfigurator.getApi().loadConfigurableItemById('usm:frame');
        console.log('Loaded USM');

    } else if (window.location.href.includes('usePlanner=true')) {
        const roomlePlanner = await RoomleSdk.getPlanner();
        roomlePlanner.boot();
        await roomlePlanner.getApi().init(element);
        await roomlePlanner.getApi().loadPlan('8a7080835a17a313015a22d290924436');
        console.log('Loaded Plan');
    }
}()));