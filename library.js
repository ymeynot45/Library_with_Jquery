let myLibrary = [];

const Book = function (title, author, pageNumber, haveRead) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.haveRead = haveRead;
    return this
}

const bookInfo = function(book) {
    return `${book.title} - ${book.author} - ${book.pageNumber} - ${book.haveRead}   `
}

const setupTitleButtons = function() {
    const headers = ["Title", "Author", "Pages", "Have_Read"]
    let firstShelf = document.getElementById("firstShelf");
    let secondShelf = document.createElement("div");
    secondShelf.setAttribute("id", "secondShelf");
    firstShelf.appendChild(secondShelf);
    headers.forEach(createHeaderButton);
}

const createHeaderButton = function(keyWord){
    let frame = document.getElementById("secondShelf");
    let button = document.createElement("button");
    button.setAttribute("class", "headerButtons");
    button.setAttribute("id", `${keyWord}Button`);
    button.textContent = keyWord;
    frame.appendChild(button);
    button.addEventListener ("click", 
    function() {
        sortLibrary(keyWord);
    });
}

const sortLibrary = (keyWord) => {  //not currently working
    document.getElementById("thirdShelf").remove();
    let library = myLibrary;
    if(keyWord === "Title"){
        library = library.sort(compareTitle);
    }else if(keyWord === "Author"){
        library = library.sort(compareAuthor);
    }else if(keyWord == "Pages"){
        library = library.sort(comparePages);
    }else if(keyWord == "Have_Read"){
        library = library.sort(compareHave_Read);
    }else{
        alert("Sorting Error, unrecognized keyWord");
    }
    // let sortedLibrary = library.sort((kw1, kw2) => (kw1.title < kw2.title) ? 1 : (kW1.title > kw2.title) ? -1: 0);
    loadLibrary(library);
}

const compareTitle = function(a, b){
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB){
        comparison = 1;
    } else if (titleA < titleB){
        comparison = -1
    }
    return comparison;
}

const compareAuthor = function(a, b){
    let authorA = a.author.toUpperCase();
    let authorB = b.author.toUpperCase();

    let comparisonauthorA= 0;
    if (authorA > authorB){
        comparison = 1;
    } else if (authorA < authorB){
        comparison = -1
    }
    return comparison;
}

const comparePages = function(a, b){
    let pagesA = a.pageNumber;
    let pagesB = b.pageNumber;

    let comparison = 0;
    if (pagesA > pagesB){
        comparison = 1;
    } else if (pagesA < pagesB){
        comparison = -1
    }
    return comparison;
}

const compareHave_Read = function(a, b){
    let haveReadA = a.haveRead;
    let haveReadB = b.haveRead;

    let comparison = 0;
    if (haveReadA > haveReadB){
        comparison = 1;
    } else if (haveReadA < haveReadB){
        comparison = -1
    }
    return comparison;
}

const createBookSlot = function(book) {
    let bookSlot = document.createElement("li");
    bookSlot.setAttribute("class", "bookSlot");
    bookSlot.setAttribute("id", book.id);
    bookSlot.textContent = bookInfo(book);
    addReadButton(bookSlot);
    frame = document.getElementById("thirdShelf");
    frame.appendChild(bookSlot);
}

const loadLibrary = function(library) {
    let thirdShelf = document.createElement("ol");
    thirdShelf.setAttribute(`id`, `thirdShelf`);
    document.getElementById(`secondShelf`).appendChild(thirdShelf);
    library.forEach(book => {
        createBookSlot(book);
    });
}   

const addReadButton = function(location) { // I know I should break this up into multiple functions.
    let button = document.createElement("button");
    button.setAttribute("class", "readButton");
    button.innerHTML = "Finished Book?"
    location.appendChild(button);
    button.addEventListener ("click", 
        function() {
            toggleHaveRead(parseInt(location.id), location);
            addReadButton(location);
        });
};

const toggleHaveRead = function(id, bookSlot) {  // I have to refactor this badly.
    myLibrary.forEach(book => {
        if (book.id === id && book.haveRead === true){
            book.haveRead = false
            bookSlot.textContent = bookInfo(book);
            return book
        };
        if (book.id === id && book.haveRead === false){
            book.haveRead = true
            bookSlot.textContent = bookInfo(book);
            return book
        };
    });
}

const addBookForm = function () {
    frame = document.getElementById("newBookEntry")  // frame name
    
    // let createForm = document.createElement('form');
    // createForm.setAttribute("method", "post");
    // createForm.setAttribute("action", "");
    // createForm.setAttribute("id", "newBookForm");  //form name
    let createForm = ($("<form action='' method='post' id='newBookForm'>"))
    $(frame).append(createForm);

    // let heading = document.createElement('h4');
    // heading.innerHTML = "Add new book ";
    $(createForm).append($("<h4></h4>").text("Add New Book"));

    // let line = document.createElement('hr'); 
    // createForm.appendChild(line);
    $(createForm).append($("<hr>"));

    // let linebreak = document.createElement('br');
    // createForm.appendChild(linebreak);
    $(createForm).append($("<br></br>"));

    // let newBookTitle = document.createElement('newBookTitle'); 
    // newBookTitle.innerHTML = "New Book Title : "; 
    // createForm.appendChild(newBookTitle);
    $(createForm).append("New Book Title : ");

    // let newTitleElement = document.createElement('input');
    // newTitleElement.setAttribute("id", "newTitle"); 
    // newTitleElement.setAttribute("type", "text");
    // newTitleElement.setAttribute("name", "title");
    // createForm.appendChild(newTitleElement);
    $(createForm).append($("<input type='text' id='newTitle' name='title'>"));

    // let newTitleBreak = document.createElement('br');
    // createForm.appendChild(newTitleBreak);
    $(createForm).append($('<br />'));

    // let authorLable = document.createElement('label'); 
    // authorLable.innerHTML = "Who is the author: ";
    // createForm.appendChild(authorLable);
    $(createForm).append("Who is the author: ");

    // let newAuthorElement = document.createElement('input');
    // newAuthorElement.setAttribute("type", "text");
    // newAuthorElement.setAttribute("name", "author");
    // createForm.appendChild(newAuthorElement);
    $(createForm).append($("<input type='text' id= 'newAuthor' name='author'>"));

    // let newAuthorBreak = document.createElement('br');
    // createForm.appendChild(newAuthorBreak);
    $(createForm).append($("<br></br>"));

    // let newPageCountLabel = document.createElement('label');
    // newPageCountLabel.innerHTML = "Total Pages : ";
    // createForm.appendChild(newPageCountLabel);
    $(createForm).append("Total Pages: ");

    // let newPageCountElement = document.createElement('input');
    // newPageCountElement.setAttribute("type", "number");
    // newPageCountElement.setAttribute("name", "pageNumber");
    // createForm.appendChild(newPageCountElement);
    $(createForm).append($("<input type='number' name='pageNumber'>"));


    // let newPageCountBreak = document.createElement('br');
    // createForm.appendChild(newPageCountBreak);
    $(createForm).append($("<br></br>"));

    // let haveReadLabel = document.createElement('label');
    // haveReadLabel.innerHTML = "I Have Read This Book : ";
    // createForm.appendChild(haveReadLabel);
    $(createForm).append("I Have Read This Book : ")

    // let haveReadElementFalse = document.createElement("input");
    // haveReadElementFalse.setAttribute("id", "haveReadRadioFalse");
    // haveReadElementFalse.setAttribute("name", "haveRead");
    // haveReadElementFalse.setAttribute("type", "radio");
    // haveReadElementFalse.setAttribute("value", false);
    // haveReadElementFalse.setAttribute("checked", "checked");
    // let radioFalseLable = document.createElement('label');
    // radioFalseLable.innerHTML = "False   "
    $(createForm).append($("<input id='haveReadFalse' name='haveRead' type='checkbox' value=true><label for='haveReadRadioFalse'>Finished</label>"));

    // let haveReadElementTrue = document.createElement("input");
    // haveReadElementTrue.setAttribute("id", "haveReadRadioTrue");
    // haveReadElementTrue.setAttribute("name", "haveRead");
    // haveReadElementTrue.setAttribute("type", "radio");
    // haveReadElementTrue.setAttribute("value", true);
    // let radioTrueLable = document.createElement('label');
    // radioTrueLable.innerHTML = "True"

    // createForm.appendChild(haveReadElementFalse);
    // createForm.appendChild(radioFalseLable);
    // createForm.appendChild(haveReadElementTrue);
    // createForm.appendChild(radioTrueLable);

    // let haveReadBreak = document.createElement('br');
    // createForm.appendChild(haveReadBreak);
    $(createForm).append($("<br></br>"));


    // let submitElement = document.createElement('input'); // Append Submit Button
    // submitElement.setAttribute("id", "newBookSubmitButton");
    // submitElement.setAttribute("type", "submit");
    // submitElement.setAttribute("name", "newBookSubmit");
    // submitElement.setAttribute("value", "Submit");
    // createForm.appendChild(submitElement);  
    $(createForm).append($("<input type='submit' id='newBookSubmitButton' name='newBookSubmit' value='Submit'>"));

    newBookForm.addEventListener ("submit", handleSubmit);
    // $("#newBookEntry").appendChild(createForm, heading); // frame name
}

const handleSubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
        book = new Book(formProps.title, formProps.author, formProps.pageNumber, handleCheckbox(formProps))
        addBookToLibrary(myLibrary, book);
        postBookToLibrary(book);
        clearForm();
        return false;
}

const handleCheckbox = function(formProps){
    if(formProps.haveRead === 'true'){
        return true
    } else{
        return false
    }
}

const clearForm = function(){
    document.getElementById("newBookForm").reset();
};

const addBookToLibrary = function(myLibrary, newBook) {
    addIdToBook(newBook);
    myLibrary = myLibrary.push(newBook);
    findNextId();
    return myLibrary
}

const postBookToLibrary = function(newBook) {
    createBookSlot(newBook);
}

const addIdToBook = function(newbook) {
    nextBookId = findNextId()
    newbook['id'] = nextBookId
    return newbook
}

const findNextId = function() {
    nextId = Math.max(...myLibrary.map(book => book.id));
    if(nextId < 1){
        nextId = 1
    }
    else{
        ++nextId
    }
    return nextId
}

const loadPage = function() {
    addBookToLibrary(myLibrary, new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
    addBookToLibrary(myLibrary, new Book("Flight from the Dark", "Joe Denver", 300, true));
    addBookToLibrary(myLibrary, new Book("Fire on the Water", "Gary Chalk", 350, false));
    setupTitleButtons();
    loadLibrary(myLibrary);
    addBookForm();
}

$(document).ready(function(){
    loadPage(); 
});
// document.body.addEventListener("load", loadPage());
