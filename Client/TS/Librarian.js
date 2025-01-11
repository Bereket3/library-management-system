// Get all necessary DOM elements
const bookCollection = document.querySelector('.book-grid .grid'); 
const bookModal = document.getElementById('book-modal');
const bookModalTitle = document.getElementById('bookModalTitle');
const bookTitleInput = document.getElementById('bookTitleInput');
const bookDescriptionInput = document.getElementById('bookDescriptionInput');
const bookCoverInput = document.getElementById('bookCoverInput');
const saveBookBtn = document.getElementById('saveBookBtn');
const addBookBtn = document.getElementById('addBookBtn');

// Global variables
let isEditMode = false;
let currentBookIndex = null;

// Function to get books data from the HTML structure
function getBooksFromHTML() {
  const bookItems = document.querySelectorAll('.book-item');
  const books = [];
  bookItems.forEach((bookItem) => {
    const title = bookItem.querySelector('h3').textContent.trim();
    const description = bookItem.querySelector('p').textContent.trim();
    const image = bookItem.querySelector('img')?.getAttribute('src'); // Optional chaining for image
    books.push({ title, description, cover: image });
  });
  return books;
}

// Function to display books in the HTML structure
function displayBooks(books) {
  bookCollection.innerHTML = ''; 
  books.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      ${book.cover ? `<img src="${book.cover}" alt="Cover Image" class="book-cover">` : ''}
      <p>by Author Name</p> 
      <button class="edit-btn" onclick="editBook(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
    `;
    bookCollection.appendChild(bookItem);
  });
}

// Function to open the add book modal
function openAddBookModal() {
  bookModalTitle.textContent = "Add Book";
  bookTitleInput.value = '';
  bookDescriptionInput.value = '';
  bookCoverInput.value = ''; // Clear the file input
  isEditMode = false;
  bookModal.style.display = 'flex';
}

// Function to save a book (add or update)
function saveBook() {
  const title = bookTitleInput.value.trim();
  const description = bookDescriptionInput.value.trim();

  if (!title || !description) {
    alert("Please fill in both the title and description.");
    return;
  }

  const books = getBooksFromHTML();
  let cover = null;

  if (bookCoverInput.files && bookCoverInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      cover = event.target.result;
      updateBook(books, title, description, cover); 
    };
    reader.readAsDataURL(bookCoverInput.files[0]);
  } else {
    updateBook(books, title, description, null); 
  }

  bookModal.style.display = 'none'; 
}

// Function to update book data (handles adding new books and editing existing ones)
function updateBook(books, title, description, cover) {
  if (isEditMode) {
    books[currentBookIndex] = { title, description, cover };
    alert("Book updated successfully!");
  } else {
    books.push({ title, description, cover });
    alert("Book added successfully!");
  }

  updateBookCollectionDOM(books); 
  isEditMode = false; 
  currentBookIndex = null; 
}

// Function to edit a book
function editBook(index) {
  const books = getBooksFromHTML();
  const book = books[index];

  bookModalTitle.textContent = "Edit Book";
  bookTitleInput.value = book.title;
  bookDescriptionInput.value = book.description;
  // Clear the file input to allow for new image selection
  bookCoverInput.value = ''; 
  isEditMode = true;
  currentBookIndex = index;
  bookModal.style.display = 'flex';
}

// Function to delete a book
function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    const books = getBooksFromHTML();
    books.splice(index, 1);
    updateBookCollectionDOM(books); 
    alert("Book deleted successfully!");
  }
}

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
  if (e.target === bookModal) {
    bookModal.style.display = 'none';
  }
});

// Initialize page
const initialBooks = getBooksFromHTML();
displayBooks(initialBooks);

// Add event listeners
addBookBtn.addEventListener('click', openAddBookModal);
saveBookBtn.addEventListener('click', saveBook);