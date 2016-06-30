
import { AdministrationLayout } from "./layouts/administration-layout.component";
import { ModalLayout } from "./layouts/modal-layout.component";

import { HomePage } from "./pages/home-page.component";
import { LoginPage } from "./pages/login-page.component";

import { FirstComponent } from "./components/first-component.component";

angular
    .module("customSeed", [
        "ngRoute",
        "pascalprecht.translate"
    ])
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider.when("/", { template: "<home-page></home-page>" });
        $routeProvider.when("/login", { template: "<login-page></login-page>" });
    })
    .config(($translateProvider: ng.translate.ITranslateProvider) => {
        $translateProvider
            .useSanitizeValueStrategy("escape")
            .preferredLanguage("en")
            .translations("en", {
                home: {
                    TRANSLATED: "translated"
                }
            });
    })
    .component(AdministrationLayout.name, AdministrationLayout)
    .component(ModalLayout.name, ModalLayout)
    .component(HomePage.name, HomePage)
    .component(LoginPage.name, LoginPage)
    .component(FirstComponent.name, FirstComponent);