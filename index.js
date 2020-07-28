let parametersBox = document.getElementById('parametersBox');
let jsonBox = document.getElementById('jsonBox');
parametersBox.style.display = 'none';

let jsonRadio = document.getElementById('jsonRadio');
let paramsRadio = document.getElementById('paramsRadio');

// If user clicks on jsonBox, hide parametersBox
jsonRadio.addEventListener('click', () => {
    jsonBox.style.display = 'block';
    parametersBox.style.display = 'none';
})


// If user clicks on parametersBox, hide jsonBox
paramsRadio.addEventListener('click', () => {
    jsonBox.style.display = 'none';
    parametersBox.style.display = 'block';
})

let addBtn = document.getElementById('addBtn');
let parametersNo = 1

function getElement(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// If user clicks on + button, more parameters will be added
addBtn.addEventListener('click', () => {
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${parametersNo+1}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="paramKey${parametersNo+1}" placeholder="Enter parameter ${parametersNo+1} key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="paramValue${parametersNo+1}" placeholder="Enter parameter ${parametersNo+1} value">
                    </div>
                    <button class="btn btn-primary delBtn">-</button>
                </div>`
    let params = document.getElementById('params');
    let parameterElement = getElement(string);
    params.appendChild(parameterElement);
    parametersNo+=1;

    // To delete parameters when user clicks on - button

})