const nameText = document.getElementById("name");
const ageText = document.getElementById("age");
const addressText = document.getElementById("address");
const genderText = document.getElementById("gender");
const positionText = document.getElementById("position");
const tableBodyToDisplay = document.getElementById("tableBody");

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", clickSubmit);

let editID = null;
let propertyArray = [];
let prevDataStr = localStorage.getItem("Entry_1");
if (prevDataStr != null) {
    propertyArray = JSON.parse(prevDataStr);
}
display();

function clickSubmit() {
    // event.preventDefault(); //stopping the form
    const nameVal = nameText.value;
    const ageVal = ageText.value;
    const addressVal = addressText.value;
    const genderVal = genderText.value;
    const positionVal = positionText.value;

    if (editID != null) {
        propertyArray.splice(editID, 1, {
            nameVal: nameVal,
            ageVal: ageVal,
            addressVal: addressVal,
            genderVal: genderVal,
            positionVal: positionVal,
        });
    } else {
        propertyArray.push({
            nameVal: nameVal,
            ageVal: ageVal,
            addressVal: addressVal,
            genderVal: genderVal,
            positionVal: positionVal,
        });
    }

    saveValue(propertyArray);
    display();
}

function saveValue(propertyArray) {
    let propertyArrayStr = JSON.stringify(propertyArray);
    localStorage.setItem("Entry_1", propertyArrayStr);
}

function display() {
    let statement = "";
    propertyArray.forEach((element, index) => {
        statement += `<tr>
                            <td>${element.nameVal}</td>
                            <td>${element.ageVal}</td>
                            <td>${element.addressVal}</td>
                            <td>${element.genderVal}</td>
                            <td>${element.positionVal}</td>
                            <td>
                                <i class="btn text-white fa fa-edit btn-info mx-2" onclick="editInfo(${index})"></i>
                                <i class="btn text-white fa fa-trash btn-danger" onclick="deleteInfo(${index})"></i>
                            </td>
                        </tr>`;
    });
    tableBodyToDisplay.innerHTML = statement;
}

function editInfo(id) {
    editID = id;
    nameText.value = propertyArray[editID].nameVal;
    ageText.value = propertyArray[editID].ageVal;
    addressText.value = propertyArray[editID].addressVal;
    genderText.value = propertyArray[editID].genderVal;
    positionText.value = propertyArray[editID].positionVal;

    submitBtn.innerText = "Save Changes";
}

function deleteInfo(id) {
    propertyArray.splice(id, 1);
    saveValue(propertyArray);
    display();
}
