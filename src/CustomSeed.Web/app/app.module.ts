
import { AdministrationLayout } from "./layouts/administration-layout.component";
import { ModalLayout } from "./layouts/modal-layout.component";

import { HomePage } from "./pages/home-page.component";
import { LoginPage } from "./pages/login-page.component";

import { FirstComponent } from "./components/first-component.component";

var customSeed: ng.IModule = angular.module("customSeed", [
    "ngRoute",
    "pascalprecht.translate"
]);

customSeed.config(($routeProvider: ng.route.IRouteProvider) => {
    $routeProvider.when("/", { template: "<home-page></home-page>" });
    $routeProvider.when("/login", { template: "<login-page></login-page>" });
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