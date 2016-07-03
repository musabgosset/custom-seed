
export function CookieAuthenticationInterceptor($q: ng.IQService, $location: ng.ILocationService): ng.IHttpInterceptor {

    var loginPath = "/login";
    var defaultRedirectPath = "";

    return {
        responseError: function responseError(response: ng.IHttpPromiseCallbackArg<any>) {

            if (response.status === 401) {

                var currentPath = $location.path();

                if (currentPath !== loginPath) {
                    $location.path(loginPath);

                    if (currentPath !== defaultRedirectPath) {
                        $location.search({ returnUrl: currentPath });
                    }

                    $location.replace();
                }
            }

            return $q.reject(response);
        }
    };
}
