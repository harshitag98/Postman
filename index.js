// Get the parametersBox and jsonBox
let parametersBox = document.getElementById('parametersBox');
let jsonBox = document.getElementById('jsonBox');
let responseBox = document.getElementById('responseBox');

// Initially parametersBox will be hidden because JSON is selected as default
parametersBox.style.display = 'none';
responseBox.style.display = 'none';

// Get the Radio elements here
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


// This returns the element created from the string
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
    let delBtn = document.getElementsByClassName('delBtn');
    for(btn of delBtn){
        btn.addEventListener('click', (e) =>{
            e.target.parentElement.remove();
        })
    }
})


let responseText = document.getElementById('responseText');
let submit = document.getElementById('submit');

// To print out the response when user clicks on submit button
submit.addEventListener('click', () =>{
    responseBox.style.display = 'block';
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    responseText.innerHTML = "Please wait while the response is being fetched........";

    // If the user selects to enter the parameters, an object with the key value pairs is prepared
    if(contentType=='params'){
        data = {};
        for(let i=1; i<parametersNo+1; i++){
            let Key = document.getElementById(`paramKey${i}`);
            let Value = document.getElementById(`paramValue${i}`);
            if(Key!=undefined){
                data[Key.value] = Value.value;   ;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('jsonText').value;
        //data = JSON.stringify(data);
    }

    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);

    if(requestType=="GET"){
        fetch(url).then((response)=>{
            return response.text();
        }).then((text)=>{
            responseText.innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        //console.log(data);
        fetch(url, {
            method : 'POST',
            body : data,
            headers : {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response)=>{
            return response.text();
        }).then((text)=>{
            responseText.innerHTML = text;
            Prism.highlightAll();
        });
    }
})