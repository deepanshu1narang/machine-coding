(async () => {
  console.log("hello world");
  const resp = await fetch("./data.json");
  const employeeData = await resp.json();

  const employeeListDiv = document.querySelector(".employee-list");

  const addEmployeeButton = document.querySelector(".add_employee_button");
  const employeeListUL = document.createElement("ul");
  employeeListUL.classList.add("employee-list_list");

  // form filling
  const rawEmployee = Object.freeze({
    id: null,
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    age: 0,
    dob: "",
    salary: 0,
    address: "",
  });

  // functions

  function removeAllChildren(parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }

  function renderEmployeeList() {
    employeeData.forEach((emp, idx) => {
      const listItemHTML = `
            <div class="employee-list_list-item__name">${emp.firstName} ${emp.lastName}</div>
            <div class="employee-list_list-item__delete">❌</div>
            `;
      const listItem = document.createElement("li");
      listItem.classList.add("employee-list_list-item");
      listItem.innerHTML = listItemHTML;
      listItem.setAttribute("id", `${emp.id}`);
      employeeListUL.appendChild(listItem);
    });

    employeeListDiv.appendChild(employeeListUL);
  }

  function renderEmployeeDetails(employee) {
    const employeeDetailBox = document.querySelector(".employee-detail__box");

    const employeeDetailBoxHTML = `
            <img src=${employee.imageUrl} />
            <p class="employee-detail__box__name">${employee.firstName} ${employee.lastName} (${employee.age})</p>
            <p class="employee-detail__box__address">${employee.address}</p>
            <p class="employee-detail__box__email">Email - ${employee.email}</p>
            <p class="employee-detail__box__mobile-number">Phone Number - ${employee.contactNumber}</p>
            <p class="employee-detail__box__DOB">DOB - ${employee.dob}</p>
        `;

    employeeDetailBox.innerHTML = employeeDetailBoxHTML;
  }

  function addEmployee(newEmployee) {
    employeeData.push(newEmployee);
    if (employeeListUL.hasChildNodes()) {
      removeAllChildren(employeeListUL);
    }
    renderEmployeeList();
  }

  function removeEmployee(idx) {
    employeeData.splice(idx, 1);
    if (employeeListUL.hasChildNodes()) {
      removeAllChildren(employeeListUL);
    }
    renderEmployeeList();
  }

  const addEmployeeModal = document.querySelector(".add-employee-modal");
  addEmployeeModal.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  let isAddEmployeModalOpen = false;

  function fnOpenAddEmployeeModal() {
    // e.stopPropagation();
    isAddEmployeModalOpen = true;
    addEmployeeModal.classList.remove("hide");
    addEmployeeModal.classList.add("show");
    

    return (newEmployee) => {
      Array.from(employeeAddFormEntries).forEach((entry) => {
        Array.from(entry.children).forEach((inp) => {
          inp.addEventListener("change", (e) => {
            newEmployee[e.target.name] = e.target.value;
          });
        });
      });
    };
  }

  function fnCloseAddEmployeeModal() {
    isAddEmployeModalOpen = false;
    addEmployeeModal.classList.remove("show");
    addEmployeeModal.classList.add("hide");
  }

  //   let newEmployee = structuredClone(rawEmployee);

  function validateEmployeeForm(emp){
    for(key in emp){
        if(key !== "id" && key !== "age" && !emp[key]){
            return {isValid: false, msg: `Please fill the ${key} properly`};
        }
    }
    return {isValid: true, msg: null};
  }

  let newEmployee = {};
  addEmployeeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    newEmployee = structuredClone(rawEmployee);
    const formEvents = fnOpenAddEmployeeModal();
    formEvents(newEmployee);
    const submitEmployeeButton = document.querySelector("#submit-employee");
    submitEmployeeButton?.addEventListener("click", () => {
        const {isValid, msg} = validateEmployeeForm(newEmployee)
        if(isValid){
            newEmployee.id = Math.random();
            newEmployee.age = Math.floor((new Date().getTime() - new Date(newEmployee.dob).getTime())/(365.25 * 24 * 60 * 60 * 1000));
            newEmployee.dob = newEmployee.dob.split("-").reverse().join("/");
            addEmployee(newEmployee);
            fnCloseAddEmployeeModal();
            newEmployee = {};
        }
        else{
            alert(msg);
        }
    });
  });

  document.addEventListener("click", (e) => {});

  // implementation of functions
  // inititally to render the list and details of 1st employee in the list
  renderEmployeeList();
  renderEmployeeDetails(employeeData[0]);

  employeeListUL.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) {
      const id = Number(li.id);
      const idx = employeeData.findIndex((e) => e.id === id);

      if(idx > -1){
        if (e.target.matches(".employee-list_list-item__delete")) {
            e.stopPropagation();
            removeEmployee(idx);
          } else {
            renderEmployeeDetails(employeeData[idx]);
          }
      }
    }
  });


  const employeeAddFormEntries = document.querySelectorAll(
    ".add-employee-modal__form__entries",
  );
})();
