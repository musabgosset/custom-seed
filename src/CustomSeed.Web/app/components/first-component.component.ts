
class FirstComponentController {

    constructor() {
    }

}

export var FirstComponent: ng.INamedComponentOptions = {

    name: "firstComponent",
    templateUrl: "/app/components/first-component.component.html",
    transclude: true,
    controller: FirstComponentController
}
