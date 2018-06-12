/* JS File for handling the home screen */

/* Function name: SearchMedia by Mark
 * User searches through the database by the name of the media upon input
 *
 */
/* DOESNT WORK SO REMOVED FOR NOW
function updateSearch() {
    let searchInput = document.getElementById('navbar-search-input').value;

    var name = document.querySelectorAll('.user-attribution').length;

    for(var i =0; i < name; i++){
        console.log('searchInput: ', searchInput);
        console.log(name);

        if(document.getElementsById('user-attribution')[i].innerText.indexOf(input) > -1) {
            document.getElementsById('user')[i].style.display='block';
        } else {
            document.getElementsById('user')[i].style.display='none';
        }
    }
}
*/
////////////////////////////////////////////////////////////////////////////////


// Jackson's Stuff

/* clearForms()
 * Runs when a proper item is created and the submit button on the modal is clicked
 * Clears the input fields of text from the modal
 */
function clearForms() {
    mediaName   = document.getElementById('name-input').value   = "";
    mediaReview = document.getElementById('review-input').value = "";
    mediaScore  = document.getElementById('score-input').value  = "";
}

/* toggleCreationModal()
 * Runs when a user clicks the creation modal button or properly creates a list item
 * Toggles the 'hidden' class on various elements of the modal
 */
function toggleCreationModal() {
    document.getElementById('modal-backdrop').classList.toggle('hidden');
    document.getElementById('creation-modal').classList.toggle('hidden');
    document.getElementById('create-item-button').classList.toggle('hidden');

    clearForms();
}

/* submitClicked()
 * Runs when a user clicks the submit button
 * Creates a new list item (will send to DB at some point) and puts it into the list
 */
function submitClicked() {
    let mediaName   = document.getElementById('name-input').value,
        mediaReview = document.getElementById('review-input').value,
        mediaScore  = document.getElementById('score-input').value;

    //checks for proper forms
    if (!mediaName || !mediaReview || !mediaScore)
        alert('All fields must be filled.');
    else if (parseInt(mediaScore) > 10 || parseInt(mediaScore) < 1)
        alert('The score must be between 1 and 10.');
    else{

        /* OLD HANDLEBARS CODE, REPLACE w/ MONGODB
        //creates HTML from the handlebars template
        let newListItemHTML = Handlebars.templates.mediaListItem({
            itemName:   mediaName,
            itemReview: mediaReview,
            itemScore:  mediaScore
        });

        //appends the new HTML code into the list container
        let listContainer = document.getElementById('item-list');
        listContainer.insertAdjacentHTML('beforeend', newListItemHTML);
        */

        //resets the modal
        toggleCreationModal();
    }
}

/* Only adds event listeners once the page has finished loading */
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('modal-submit').addEventListener('click', submitClicked);

    document.getElementById('create-item-button').addEventListener('click', toggleCreationModal);
    document.getElementById('cancel-button').addEventListener('click', toggleCreationModal);
    document.getElementById('modal-close-button').addEventListener('click', toggleCreationModal);

    document.getElementById('navbar-search-input').addEventListener('keyup', updateSearch);
});
