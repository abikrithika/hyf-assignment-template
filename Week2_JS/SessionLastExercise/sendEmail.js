//Send Email Exercise

const emailString="benjamin@gmail.com|peter@gmail.com|hans@gmail.com|ahmad@gmail.com|sana@gmail.com|virgeen@gmail.com|mohammed@gmail.com";
const emailArray=emailString.split("|");

function sendEmailTo(recipient){
   
     console.log("Email sent to " + recipient);
}
 for(let i = 0; i < emailArray.length; i++)
 {
    sendEmailTo(emailArray[i]);
 }