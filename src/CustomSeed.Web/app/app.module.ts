
import { CookieAuthenticationInterceptor } from "./security/CookieAuthentication.interceptor";

import { AdministrationLayout } from "./layouts/administration.layout";
import { ModalLayout } from "./layouts/modal.layout";

import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { ResourcePage } from "./pages/resource.page";

import { FirstComponent } from "./components/first-component.component";

angular
    .module("customSeed", [
        "ngRoute",
        "ngMessages",
        "pascalprecht.translate"
    ])
    .config(($provide: ng.auto.IProvideService, $httpProvider: ng.IHttpProvider) => {
        $provide.factory("cookieAuthenticationInterceptor", CookieAuthenticationInterceptor);
        $httpProvider.interceptors.push("cookieAuthenticationInterceptor");
    })
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider.when("/", { template: "<home-page></home-page>" });
        $routeProvider.when("/login", { template: "<login-page></login-page>" });
        $routeProvider.when("/resource", { template: "<resource-page></resource-page>", resolve: { user: ($http) => $http.get('/api/User') } });
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
    .component(ResourcePage.name, ResourcePage)

    .component(FirstComponent.name, FirstComponent);