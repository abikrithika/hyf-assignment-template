

// Save a note using priority and status

const notes=[];
const priorityOrder = ["High", "Medium", "Low"];

function saveNote(content,id,priority){
notes.push({Content: content,Id:id,Priority:priority});
}

saveNote("Pick up groceries", 1,"Low");
saveNote("Do laundry", 2,"High");
saveNote("Buy Items",3,"Medium");
saveNote("Call Mom and Dad",4,"High");

console.log(notes);

function sortNotesByPriority(){
    for(let i=0;i<priorityOrder.length;i++){
        const currentPriority=priorityOrder[i];
for(let j=0;j<notes.length;j++){
    if(notes[j].Priority===currentPriority){
     console.log(`${notes[j].Content} having "${currentPriority}" priority`);
    }
}

}

}
sortNotesByPriority();

function markAsDone(noteID)
{
    for(let i=0;i<notes.length;i++){
        if(notes[i].Id===noteID){
          notes[i].Status="Done";
          console.log(`Note Completed: ${notes[i].Content}`);
          return;
        }
    }
    return "Notes not found";
}
markAsDone(2);