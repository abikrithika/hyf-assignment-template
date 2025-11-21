//Smart-ease - Back to the basics!
//NOnoN0nOYes (Note taking app)

//1->Save a note

const notes=[];

function saveNote(content,id){
notes.push({Content: content,Id:id});
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
saveNote("Buy Items",3);
console.log(notes);

//2-> Get a note

function getNote(id){
    for(let i=0;i<notes.length;i++){
        if(notes[i].Id===id){
            return notes[i];
        }
       
    }
     return "The Value of Id is not Valid or Empty";
        
}
const firstNote=getNote(1);
console.log("FirstNote Value: " ,firstNote);

//3-> Log out notes
function logOutNotesFormatted(){
     for(let i=0;i<notes.length;i++){
      
        console.log(`The note with id: ${notes[i].Id}, has the following note text: ${notes[i].Content} `);
     }
}
logOutNotesFormatted();