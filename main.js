const addButton=document.getElementById("add_btn");
const mainBody=document.querySelector(".main-body")

const notes=JSON.parse(localStorage.getItem('notesArray'));

if(notes)
{
    notes.forEach(note =>addNewnote(note))
}


addButton.addEventListener('click',()=>addNewnote());
function addNewnote(text="")
{
    const note =document.createElement('div');
    note.classList.add('main');
    note.innerHTML=`
    <div class="navbar">
    <i class="edit fa-solid fa-file-pen"></i>
    <span class="Title"></span>
    <i class="delete fa-solid fa-trash"></i>
    </div>
      <div class="textarea1">
        <textarea class="${text ? "hidden" : "" }"></textarea>
        <span class="date"></span>
     </div>
     <div class="store ${text ? "" : "hidden"}">
    </div>`;


    const delButton=note.querySelector(".delete");
    const editButton=note.querySelector(".edit");
    const textarea=note.querySelector("textarea");
    const hiddenClass=note.querySelector(".store");
    const currentDate=note.querySelector(".date");
    const progress=note.querySelector(".Title");
    const date=new Date();
    let today=date.getDate();
    let month=date.getMonth()+1;
    let year=date.getFullYear();
    
    let dateFormat=`${today}-${month}-${year}`;

   currentDate.textContent=dateFormat;
   textarea.value=text;
   hiddenClass.innerHTML=text;

    delButton.addEventListener('click',()=>{
        note.remove();
        updateLocalStorage();
    } ) ;

    editButton.addEventListener('click',()=>
    {
        textarea.classList.toggle('hidden');
        hiddenClass.classList.toggle('hidden');
        if(hiddenClass.selected)
        {
            progress.textContent="jjehe";
        }
    });


    textarea.addEventListener('input',(e)=>{
        const{value}=e.target;
        hiddenClass.innerHTML=value;
        updateLocalStorage();
    });
    mainBody.append(note);
}
function updateLocalStorage()
{
    const notesText=document.querySelectorAll('textarea');
    const notesArray=[];

    notesText.forEach(note => notesArray.push(note.value));

    localStorage.setItem('notesArray',JSON.stringify(notesArray));
}