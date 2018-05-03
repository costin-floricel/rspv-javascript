document.addEventListener('DOMContentLoaded', () => {
    

//Capture the Form input 
const form = document.getElementById('registrar');
//Select the form input
const input = form.querySelector('input');
const mainDiv = document.querySelector('.main');

//Select the list by ID and store it in a var
const ul = document.getElementById('invitedList');

//Create the elements for the filter functionality
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide Those who haven't responded";
filterCheckBox.type = 'checkbox';

div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);
filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    
    if (isChecked) {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            if (li.className === 'responded') {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
    }
        } else {
         for (let i = 0; i < lis.length; i++) {
             let li = lis[i];
            li.style.display = '';
    }
        }
})





function createLi(text) {
    
    function createElement(elementName, property, value) {
        const element = document.createElement(elementName);
        element[property] = value;
        return element;
    }
    
    function appendToLi (elementName, property, value) {
        const element = createElement(elementName, property, value);
        li.appendChild(element);
        return element;
    }
      
    //Create a list item element and store it in a var li
    const li = document.createElement('li');
    
    appendToLi('span', 'textContent', text);
   
   
    
    //Append the checkbox to the label
    appendToLi('label','textContent', 'Confirmed').appendChild(createElement('input','type','checkbox'));
    
    
     //Add the edit button as a child of each  list item
    appendToLi('button', 'textContent', 'Edit');
   

    
    //Add the remove button as a child of each  list item
    appendToLi('button', 'textContent', 'Remove');
    return li;
}

//Add an event Listener to the form
form.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevents the default behaviour
    
    //Store the input value into a var called text
    const text = input.value;
    //Clear the input
    input.value = '';
    const li = createLi(text);
    //Append the li to the ul by using appendChild Method
    ul.appendChild(li);
    
});


//Checkbox delegated handler 
ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    //Check if the checkbox is checked or not and add or remove a class
    
    if (checked){
        listItem.className = 'responded';
        } else {
        listItem.className = '';
        }
});


//Remove items delegated handler that bubbles up when a user click the remove button
ul.addEventListener('click', (e) => {
    //Filter the elements that are not buttons
    if (e.target.tagName === 'BUTTON'){
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        const action = button.textContent.toLowerCase();
        const nameActions = {
            remove:  () => {
            ul.removeChild(li);
            },
            edit:  () => {
            const span = li.firstElementChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                button.textContent = 'Save';
            },
            save:() => {
             const input = li.firstElementChild;
                const span = document.createElement('span');
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                button.textContent = 'Edit';
            }
        };
    
        //select and run action in button's name
        nameActions[action]();
        
        }
});

});












