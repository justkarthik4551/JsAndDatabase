class View {
  constructor(classes) {
    this.app = this.getElement("#root");
    this.container = this.createElement("div", ("container " + classes));
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      let classes = className.split(" ");
      classes.forEach((c) => {
        element.classList.add(c);
      });
    }

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  loaderInit() {
    this.loader = this.createElement("div", "loader");
    for (let i = 0; i < 12; i++) {
      let outerDiv = this.createElement("div");
      let innerDiv = this.createElement("div");
      outerDiv.append(innerDiv);
      this.loader.append(outerDiv);
    }
  }

  toggleLoader() {
    let displayState = this.loader.style.display;
    if (displayState === "block") {
      displayState = "none";
    } else {
      displayState = "block";
    }
    this.loader.style.display = displayState;
  }

  _destory() {
    if (this.container) {
      this.container.remove();
    }
  }

}

class loginView extends View {
  constructor() {
    super("login");
    this.loginContainer = this.createElement("div", "loginContainer");
    this.userForm = this.createElement("form");
    this.userForm.id = "form";
    this.userForm.action = "";
    this.initializeUserName();
    this.initializeUserPassword();
    this.initializeButton();
    this.userForm.append(
      this.userNameContainer,
      this.userPasswordContainer,
      this.submitButton
    );
    this.loaderInit();
    this.loginContainer.append(this.userForm);
    this.container.append(this.loginContainer);
    this.app.append(this.loader, this.container);
  }

  initializeUserName() {
    this.userNameContainer = this.createElement(
      "div",
      "container-form-userName container-form-input"
    );

    this.userNameLabel = this.createElement("label");
    this.userNameLabel.setAttribute("for", "userName");
    this.userNameLabel.innerText = "User Name";

    this.userNameInput = this.createElement("input");
    this.userNameInput.type = "text";
    this.userNameInput.placeholder = "User Name";
    this.userNameInput.name = "userName";

    this.userNameContainer.append(this.userNameLabel, this.userNameInput);
  }

  initializeUserPassword() {
    this.userPasswordContainer = this.createElement(
      "div",
      "container-form-userPassword container-form-input"
    );

    this.userPasswordLabel = this.createElement("label");
    this.userPasswordLabel.setAttribute("for", "userPassword");
    this.userPasswordLabel.innerText = "User Password";

    this.userPasswordInput = this.createElement("input");
    this.userPasswordInput.type = "password";
    this.userPasswordInput.placeholder = "User Password";
    this.userPasswordInput.name = "userPassword";

    this.userPasswordContainer.append(
      this.userPasswordLabel,
      this.userPasswordInput
    );
  }

  initializeButton() {
    this.submitButton = this.createElement("button", "js-form-btn");
    this.submitButton.type = "submit";
    this.submitButton.innerText = "Submit";
  }

  bindSubmit(handler) {
    this.userForm.addEventListener('submit', event => {
      event.preventDefault();
      if (this._userName && this._userPassword) {
        handler(this._userName, this._userPassword);
      }
    })
  }

  get _userName() {
    return this.userNameInput.value;
  }

  get _userPassword() {
    return this.userPasswordInput.value;
  }

  _resetInput() {
    this.userNameInput.value = "";
    this.userPasswordInput.value = "";
  }

}

class homeView extends View {
  constructor() {
    super("home");
    this.initializeNavBar();
    this.app.append(this.navBarBox, this.container);
  }

  initializeNavBar() {
    this.navBarBox = this.createElement('nav', 'fixed-nav-bar');
    this.navBar = this.createElement('div');
    this.navBar.id = "navBar";
    this.navBarTitle = this.createElement('div', 'navTitle');
    this.navBarTitle.innerText = "Project Viewer";
    this.navBarElements = [];
    this.navBarElements['Home'] = this.createElement('div', 'navElement selected');
    this.navBarElements['Home'].id = "home";
    this.navBarElements['Home'].innerText = "Home";
    this.navBarElements['About'] = this.createElement('div', 'navElement');
    this.navBarElements['About'].id = "About";
    this.navBarElements['About'].innerText = "About";
    this.navBarElements['Projects'] = this.createElement('div', 'navElement');
    this.navBarElements['Projects'].id = "Projects";
    this.navBarElements['Projects'].innerText = "Projects";
    this.navBarElements['Contact'] = this.createElement('div', 'navElement');
    this.navBarElements['Contact'].id = "Contact";
    this.navBarElements['Contact'].innerText = "Contact";
    this.navBar.append(this.navBarTitle,
      this.navBarElements['Home'],
      this.navBarElements['About'],
      this.navBarElements['Projects'],
      this.navBarElements['Contact']);
    this.navBarBox.append(this.navBar);
  }
}



class Model {
  constructor() {
    this.user = "admin";
    this.password = "admin";
  }

  _getPassword(user) {
    if (this.user === user)
      return this.password;
  }
}

class loginController {
  constructor(model, loginView) {
    this.model = model;
    this.loginView = loginView;
    this.currentView = loginView;

    this.currentView.bindSubmit(this.handleSubmit);
  }

  handleSubmit = async (userName, userPassWord) => {
    this.currentView.toggleLoader();
    let result = await this.authenticate({
      user: userName,
      password: userPassWord,
    });
    if (result) {
      this.currentView.toggleLoader();
      this.homeView = new homeView();
      this.currentView = this.homeView;
      this.loginView._destory();

    } else {
      this.currentView.toggleLoader();
      this.currentView._resetInput();
    }
  }

  async authenticate(User) {
    let password = this.model._getPassword(User.user);
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    if (password && password === User.password) {
      return true;
    }
    return false;
  }
}

const app = new loginController(new Model(), new loginView());
