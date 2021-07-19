class View {
  constructor() {
    this.app = this.getElement("#root");
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
}

class loginView extends View {
  constructor() {
    super();
    this.container = this.createElement("div", "container");
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
    this.container.append(this.userForm);
    this.app.append(this.container);
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
}

class Model {
  constructor() {
    this.user = "admin";
    this.password = "admin@1234";
  }

  authenticate(User) {
    return User.user === this.user && User.password === this.password;
  }
}

class loginController {
  constructor(model, loginView) {
    this.model = model;
    this.view = loginView;
  }
}

const app = new loginController(new Model(), new loginView());
