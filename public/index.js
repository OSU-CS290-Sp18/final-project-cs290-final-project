/* JS File for handling the home screen */

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
    else {
        //creates HTML from the handlebars template
        let newListItemHTML = Handlebars.template.userPageListItem({
            itemName:   mediaName,
            itemReview: mediaReview,
            itemScore:  mediaScore
        });

        //appends the new HTML code into the list container
        let listContainer = document.getElementById('item-list');
        listContainer.insertAdjacentHTML('beforeend', newListItemHTML);

        //resets the modal
        clearForms();
        toggleCreationModal();
    }
}

/* Only adds event listeners once the page has finished loading */
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('modal-submit').addEventListener('click', submitClicked);

    document.getElementById('create-item-button').addEventListener('click', toggleCreationModal);
});