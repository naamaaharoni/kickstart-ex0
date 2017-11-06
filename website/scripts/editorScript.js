var appToken;
var sdk;

var membersAppDefId = '14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9';

function addOrders() {
    var membersAPI = sdk.application.getPublicAPI(appToken, {appDefinitionId: membersAppDefId});
    return membersAPI.addSection({
        appDefinitionId: '1380b703-ce81-ff05-f115-39571d94dfcd',
        pageId: 'order_history',
        social: false,
        showInLoginMenu: true
    });
}

module.exports = {
    editorReady: function (_editorSDK, _appToken, options) {
        return new Promise(function (resolve, reject) {
            console.log('STORE PLATFORM APP IS UP');
            appToken = _appToken;
            sdk = _editorSDK;
            if (options && options.firstInstall) {
                debugger
                sdk.application.install(appToken, {appDefinitionId: membersAppDefId, origin: '1380b703-ce81-ff05-f115-39571d94dfcd'})
                    .then(resolve, reject);
            }
            resolve();
        });
    },
    handleOtherAppInstalled: function (options) {
        return new Promise(function (resolve, reject) {
            switch(options.appDefinitionId) {
                case membersAppDefId: {
                    addOrders().then(resolve, reject);
                    break;
                }
                default:
                    resolve();
            }
        });
    },
    getAppManifest: function () { return ({}); },
    onEvent: function (_a) {
        var eventType = _a.eventType, eventPayload = _a.eventPayload;
        try {
            switch (eventType) {
                default:
                    window.console.log(eventType, eventPayload);
            }
        }
        catch (e) {
            throw e;
        }
    },
    getControllerPresets: function () { return Promise.resolve([]); }
};
