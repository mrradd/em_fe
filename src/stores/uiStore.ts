import { makeAutoObservable } from "mobx";

class UiStore {
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

export const uiStore = new UiStore();