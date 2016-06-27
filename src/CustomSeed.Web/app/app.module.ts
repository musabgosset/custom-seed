/// <reference path="layouts/administration-layout.component.ts" />
/// <reference path="layouts/modal-layout.component.ts" />

/// <reference path="components/first-component.component.ts" />

/// <reference path="pages/home-page.component.ts" />
/// <reference path="pages/login-page.component.ts" />

namespace CustomSeed {

    var customSeed = angular.module("customSeed", [
        "ngRoute",
        "pascalprecht.translate"
    ]);

    customSeed.config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider.when("/", { template: '<home-page></home-page>' });
        $routeProvider.when("/login", { template: '<login-page></login-page>' });
    });

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

    customSeed.component(AdministrationLayout.name, AdministrationLayout);
    customSeed.component(ModalLayout.name, ModalLayout);

    customSeed.component(HomePage.name, HomePage);
    customSeed.component(LoginPage.name, LoginPage);

    customSeed.component(FirstComponent.name, FirstComponent);

}