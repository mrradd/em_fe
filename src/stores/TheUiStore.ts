import { makeAutoObservable } from "mobx";

export class UiStore {
  navbarOpened = false;

  constructor() {
    makeAutoObservable(this);
  }

  setNavbarOpened = (opened: boolean) => {
    this.navbarOpened = opened;
  };

  toggleNavbar = () => {
    this.navbarOpened = !this.navbarOpened;
  };
}