/// <reference path="components/first-component.component.ts" />

namespace CustomSeed {

    var customSeed = angular.module("customSeed", [
        "pascalprecht.translate"
    ]);

    customSeed.config(($translateProvider: ng.translate.ITranslateProvider) => {
        $translateProvider
            .useSanitizeValueStrategy("escape")
            .preferredLanguage("en")
            .translations("en", {
                home: {
                    TRANSLATED: "translated"
                }
            });
    });

    customSeed.component(FirstComponent.name, FirstComponent);

}