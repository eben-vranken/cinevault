import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html',
    imports: [RouterLink, RouterLinkActive]
})
export class Navbar {

}