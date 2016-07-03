
class LoginPageController {

    public form: ng.IFormController;
    public viewModel: SignInViewModel;
    public error: string;

    constructor(
        private $http: ng.IHttpService,
        private $location: ng.ILocationService) {
    }

    public $onInit() {

        this.$http.get("api/User")
            .then(r => this.redirect());
    }

    public submit(): void {

        if (this.form.$invalid) {
            return;
        }

        delete this.error;

        this.$http.post("/api/User/SignIn", this.viewModel)
            .then(() => this.redirect())
            .catch(r => {
                if (r["status"] == 400) {
                    this.error = "Nom d'utilisateur ou mot de passe incorrect";
                } else {
                    this.error = "Erreur de connexion";
                }
            });
    }
    
    public redirect() {
        var returnUrl = this.$location.search()["returnUrl"];
        this.$location.search({});

        if (returnUrl) {
            this.$location.path(returnUrl);
        } else {
            this.$location.path("/");
        }
    }
}

export var LoginPage: ng.INamedComponentOptions = {
    name: "loginPage",

    templateUrl: "/app/pages/login.page.html",
    controller: LoginPageController
}