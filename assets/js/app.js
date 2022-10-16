
const submitform = document.getElementById("submitform");
const fnameinput = document.getElementById("fname");
const lnameinput = document.getElementById("lname");
const emailinput = document.getElementById("email");
const contactinput = document.getElementById("contact");
const tableContentInput=document.getElementById("tableContent");
const submitbtninput=document.getElementById("submitbtn");
const updatebtninput=document.getElementById("updatebtn");

let arrayData=[];

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  console.log(uuidv4());
const onEditForm=e=>{
   
    let getid=e.getAttribute("data-id");
    localStorage.setItem("getid",getid);
    console.log(getid);
    let arrayData=JSON.parse(localStorage.getItem("arrayData"));
    submitbtninput.classList.add("d-none")
    updatebtninput.classList.remove("d-none")
    let requiredObj=arrayData.find(obj=>obj.id===getid);
    fnameinput.value=requiredObj.fname;
    lnameinput.value=requiredObj.lname;
    emailinput.value=requiredObj.email;
    contactinput.value=requiredObj.contact;
   
}
const onClickUpdate=(event)=>{
    let getid=localStorage.getItem("getid");
    console.log(getid);
    arrayData.forEach((ele)=>{
        if(ele.id===getid){
            ele.fname=fnameinput.value;
            ele.lname=lnameinput.value;
            ele.email=emailinput.value;
            ele.contact=contactinput.value;
        }
    })
    localStorage.setItem("arrayData",JSON.stringify(arrayData))
    templating(arrayData);
    updatebtninput.classList.add("d-none")
    submitbtninput.classList.remove("d-none")
 
    submitform.reset();
}

const onDeleteForm=((ele)=>{
    let getDelete=ele.getAttribute("data-id");
    arrayData=arrayData.filter(ele=>{return ele.id !=getDelete });
    localStorage.setItem("arrayData",JSON.stringify(arrayData));
    templating(arrayData)
   })

const onsubmitform = (event) => {
    event.preventDefault();
    let objdata = {
        fname: fnameinput.value,
        lname: lnameinput.value,
        email: emailinput.value,
        contact: contactinput.value,
         id:uuidv4()

    }
    console.log(objdata);
    arrayData.push(objdata);
    localStorage.setItem("arrayData", JSON.stringify(arrayData));
    // templating(arrayData);
    let tr=document.createElement("tr");
     tr.innerHTML=`
                    <td>${arrayData.length}</td>
                    <td>${objdata.fname}</td>
                    <td>${objdata.lname}</td>
                    <td>${objdata.email}</td>
                    <td>${objdata.contact}</td>
                    <td><button class="btn btn-primary" data-id="${objdata.id}" onclick="onEditForm(this)">Edit</button></td>
                    <td><button class="btn btn-danger"data-id="${objdata.id}" onclick="onDeleteForm(this)" >Delete</button></td>`
                    tableContentInput.append(tr);
    console.log(arrayData);
    event.target.reset()
}

function templating(arr){
    let result="";
    arr.forEach((ele,i) => {
        result +=`<tr>
        <td>${i+1}</td>
        <td>${ele.fname}</td>
        <td>${ele.lname}</td>
        <td>${ele.email}</td>
        <td>${ele.contact}</td>
        <td><button class="btn btn-primary" data-id="${ele.id}" onclick="onEditForm(this)">Edit</button></td>
        <td><button class="btn btn-danger" data-id="${ele.id}" onclick="onDeleteForm(this)">Delete</button></td>
    </tr>
        `
        
    });
    tableContentInput.innerHTML=result;
}

if (localStorage.getItem("arrayData")){
    let arrayData=JSON.parse(localStorage.getItem("arrayData"))
    templating(arrayData);
}







submitform.addEventListener("submit", onsubmitform);
updatebtninput.addEventListener("click", onClickUpdate);