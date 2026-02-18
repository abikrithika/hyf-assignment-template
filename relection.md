Reflection

1. 3 new things you learned from AI in the above task.
From using GitHub Copilot, I learned:
1. How to write semantic and meaningful class names such as `section-main` and `section-intro` to keep code organized.
2. How to align sections in CSS using `text-align`, Flexbox, and Grid layouts.
3. How to use JavaScript functions and event listeners to make a webpage interactive, such as changing the background color randomly when a button is clicked.



2. My experience using Copilot for paragraph text and JavaScript
When I asked Copilot to help me write an introduction paragraph, I first wrote this text:
"Iam Abi. Iam was worked as Appian BPM Consultant and now im a carrier transition. Hope I will land a job as <strong>Frontend Developer</strong> in Denmark. I love <em>Cooking and travel and do meditation</em>."

Copilot suggested a corrected version:
"I am Abi. I have worked as an Appian BPM Consultant and now I am making a career transition. I hope to land a job as a <strong>Frontend Developer</strong> in Denmark. I love <em>cooking, traveling, and meditation</em>."

From this, I learned how to improve my grammar, sentence flow, and use of HTML tags like `<strong>` and `<em>` to highlight text. It showed me how AI can help with both **language improvement** and **semantic HTML writing**.

For the JavaScript part, I asked Copilot how to make a button that changes the background color randomly.  
It gave me this code:

javascript
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

document.getElementById('colorBtn').addEventListener('click', function() {
  document.body.style.backgroundColor = getRandomColor();
});


I then asked Copilot to explain this code line by line and why each part is used.
Here is what I learned from the explanation:

The <script> tag allows me to write JavaScript inside my HTML file.

The function getRandomColor() generates a random color:

Math.random() returns a random number between 0 and 1.

Multiplying by 16777215 gives a range for all possible color codes.

Math.floor() rounds down the number.

.toString(16) converts it to a hexadecimal format.

Adding '#' at the beginning makes it a valid CSS color code.

The line

document.getElementById('colorBtn').addEventListener('click', function() {
  document.body.style.backgroundColor = getRandomColor();
});


means that:

The button with ID colorBtn is selected.

An event listener waits for a click event.

When clicked, it calls the getRandomColor() function and assigns the returned value to document.body.style.backgroundColor.

This changes the background color of the page every time the button is clicked.
I have asked why we using this line document.body.style.backgroundColor  to equal getrandomcolor function. Why we are not calling just as by giving the function name.

Copilot also explained why we use

document.body.style.backgroundColor = getRandomColor();


instead of just calling getRandomColor().
The function only returns a random color value, but by assigning it to document.body.style.backgroundColor, we actually apply that color to the webpage.

From this interaction, I understood how functions return values, how to use DOM manipulation with document.body, and how event listeners work to make a webpage interactive.

This gave me more confidence in reading and understanding JavaScript, not just copying it.
