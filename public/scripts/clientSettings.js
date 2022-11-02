// Made by Tim
import clientUtil from "./clientUtilities.js";

function ClientSettings() {
  const clientSettings = {};
  let res;
  const txtName = document.querySelector("input#name");
  const txtEmail = document.querySelector("input#email");
  const txtPassword = document.querySelector("input#password");
  const btnEdit = document.querySelector("button#btnSettings");
  const btnSave = document.querySelector("button#btnSave");
  const divMsg = document.querySelector("div#msg");
  const btnDelete = document.querySelector("button#btnDelete");
  const divConfirm = document.querySelector("div.confirmDelete");
  const btnConfirmDelete = document.querySelector("button#confirmDelete");
  const btnCancelDelete = document.querySelector("button#cancelDelete");

  clientSettings.getCurrentUser = clientUtil.getCurrentUser;

  clientSettings.loadUser = async () => {
    res = await fetch("/getUser");
    const user = await res.json();
    txtName.value = user.user.name;
    txtEmail.value = user.user.email;
    txtPassword.value = user.user.password;
  }

  clientSettings.editAccountSetup = () => {
    btnEdit.addEventListener("click", () => {
      txtName.disabled = false;
      txtEmail.disabled = false;
      txtPassword.disabled = false;
      btnSave.disabled = false;
      btnSave.disabled = false;
      btnEdit.disabled = true;
    })
  }

  clientSettings.updateAccountSetup = () => {
    const form = document.querySelector("form#settings-form");
    let res;

    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      try {
        res = await fetch("/update-account", {
          method: "POST",
          body: new URLSearchParams(new FormData(form))
        });
        const resUser = await res.json();
        if (resUser.isUpdated) {
          clientUtil.showMessage(divMsg, "Account was successfully updated.");
          setTimeout(() => clientUtil.redirect("settings"), 2000);
        } else {
          clientUtil.showMessage(divMsg, resUser.err);
          setTimeout(() => clientUtil.redirect("settings"), 2000);
        }
        txtName.disabled = true;
        txtEmail.disabled = true;
        txtPassword.disabled = true;
        btnSave.disabled = true;
        btnSave.disabled = true;
        btnEdit.disabled = false;
      } catch (err) {
        console.log(err);
      }
    });
  }

  clientSettings.deleteAccountSetup = () => {
    btnDelete.addEventListener("click", () => {
      divConfirm.style.display = "block";
    });

    btnCancelDelete.addEventListener("click", () => {
      divConfirm.style.display = "none";
    });

    btnConfirmDelete.addEventListener("click", async () => {
      try {
        res = await fetch("/deleteAccount");
        const resResult = await res.json();
        if (resResult.isDeleted) {
          clientUtil.showMessage(divMsg, "Account was successfully deleted.");
          setTimeout(() => clientUtil.redirect("index"), 2000);
        } else {
          clientUtil.showMessage(divMsg, resResult.err);
          setTimeout(() => clientUtil.redirect("settings"), 2000);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  return clientSettings;
}

export default ClientSettings();