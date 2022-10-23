const baseApi = "http://127.0.0.1:3000/";
const tbody = document.getElementById("tbody");
const rowTemplate = `
<tr>
    <th scope="row">
        <%= i + 1 %> 
    </th>
    <td><%= data[i].id %></td>
    <td><%= data[i].name %></td>
    <td><%= data[i].username %></td>
    <td><%= data[i].email %></td>
    <td><%= data[i].website %></td>
    <td><%= data[i].phone %></td>
    <td class="password"><%= data[i].password %></td>
    <td class="action">
        <span id="<%= data[i].id %>" class="btn-delete btn btn-danger">
            <ion-icon name="trash-outline"></ion-icon>
        </span>
        <span id="udpate-<%= data[i].id %>" class="btn-update btn btn-info">
            <ion-icon name="build-outline"></ion-icon>
        </span>
    </td>
</tr>
`;

const showMessage = (status, message) => {
  let messageContainer = document.getElementsByClassName("message")[0];
  if (status === "delete") {
    messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }
  if (status === "update") {
    messageContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
  }
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
};

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;
    fetch(baseApi + `users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        showMessage("delete", data.message);
        e.target.parentElement.parentElement.remove();
        console.log(data);
      })
      .catch((err) => {
        showMessage("delete", err.message);
      });
  }

  if (e.target.classList.contains("btn-update")) {
    let id = e.target.id.split("-")[1]; // update-1, update-2...
    let td = e.target.parentElement.parentElement;
    let tdChildList = e.target.parentElement.parentElement.children;
    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      name: tdChildList[2].innerHTML,
      username: tdChildList[3].innerHTML,
      email: tdChildList[4].innerHTML,
      website: tdChildList[5].innerHTML,
      phone: tdChildList[6].innerHTML,
      password: tdChildList[7].innerHTML,
    };
    td.innerHTML = `
    <tr>
        <th scope="row">
            ${info.index}
        </th>
        <td>${info.id}</td>
        <td><input type="text" value="${info.name}"></td>
        <td><input type="text" value="${info.username}"></td>
        <td>${info.email}</td>
        <td><input type="text" value="${info.website}"></td>
        <td><input type="text" value="${info.phone}"></td>
        <td class="password">${info.password}</td>
        <td class="action">
            <span id="${info.id}" class="btn-delete btn btn-danger">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
            <span id="save-<%= data[i].id %>" class="btn-save btn btn-info">
                Save
            </span>
        </td>
    </tr>
    `;
  }

  if (e.target.classList.contains("btn-save")) {
    // Lấy value từ ô input ra
    // Tiến hành gọi fetch update
    // Đổi lại nut save thành icon update
    // Hiển thị ra message update thành công
  }
});
