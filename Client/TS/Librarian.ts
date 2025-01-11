// Book Data
interface Book {
  title: string;
  description: string;
  cover: string | null;
}

let books: Book[] = [
  {
    title: "Book 1",
    description: "This is the first book.",
    cover: null,
  },
  {
    title: "Book 2",
    description: "This is the second book.",
    cover: null,
  },
];

// DOM Elements
const bookCollection = document.getElementById("book-collection") as HTMLDivElement;
const bookModal = document.getElementById("book-modal") as HTMLDivElement;
const bookTitleInput = document.getElementById("bookTitle") as HTMLInputElement;
const bookDescriptionInput = document.getElementById("bookDescription") as HTMLTextAreaElement;
const bookCoverInput = document.getElementById("bookCover") as HTMLInputElement;
const saveBookBtn = document.getElementById("saveBookBtn") as HTMLButtonElement;
const addBookBtn = document.getElementById("addBookBtn") as HTMLButtonElement;
const bookModalTitle = document.getElementById("bookModalTitle") as HTMLHeadingElement;

let isEditMode = false;
let currentBookIndex: number | null = null;

// Display Books
function displayBooks() {
  bookCollection.innerHTML = "";
  books.forEach((book, index) => {
    const bookItem = document.createElement("div") as HTMLDivElement;
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
      <h3><span class="math-inline">\{book\.title\}</h3\>
<p\></span>{book.description}</p>
      ${book.cover ? `<img src="${book.cover}" alt="Cover Image" class="book-cover">` : ""}
      <button class="edit-btn" onclick="editBook(<span class="math-inline">\{index\}\)"\>Edit</button\>
<button class\="delete\-btn" onclick\="deleteBook\(</span>{index})">Delete</button>
    `;
    bookCollection.appendChild(bookItem);
  });
}

// Open Add Book Modal
addBookBtn.addEventListener("click", () => {
  bookModalTitle.textContent = "Add Book";
  bookTitleInput.value = "";
  bookDescriptionInput.value = "";
  bookCoverInput.value = ""; // Clear the file input
  isEditMode = false;
  bookModal.style.display = "flex";
});

// Save Book (Add or Update)
saveBookBtn.addEventListener("click", () => {
  const title = bookTitleInput.value.trim();
  const description = bookDescriptionInput.value.trim();
  const coverFile = bookCoverInput.files[0];

  if (!title || !description) {
    alert("Please fill in both the title and description.");
    return;
  }

  let cover: string | null = null;
  if (coverFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target instanceof FileReader && typeof event.target.result === 'string') {
        cover = event.target.result;
      }
      saveBook(title, description, cover);
    };
    reader.readAsDataURL(coverFile);
  } else {
    saveBook(title, description, null);
  }
});

function saveBook(title: string, description: string, cover: string | null) {
  if (isEditMode && currentBookIndex !== null) {
    books[currentBookIndex] = { title, description, cover };
    alert("Book updated successfully!");
  } else {
    books.push({ title, description, cover });
    alert("Book added successfully!");
  }

  bookModal.style.display = "none"; 

  // Function to resize and display the book cover image
  function displayBookCover(coverURL: string) {
    const maxWidth = 200; // Adjust this value as needed for your container size
    const maxHeight = 200; // Adjust this value as needed for your container size

    const img = new Image();
    img.onload = function() {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      let newWidth, newHeight;

      // Maintain aspect ratio
      if (width > height) {
        newWidth = maxWidth;
        newHeight = (height / width) * maxWidth;
      } else {
        newHeight = maxHeight;
        newWidth = (width / height) * maxHeight;
      }

      img.style.width = `${newWidth}px`;
      img.style.height = `${newHeight}px`;
      img.classList.add("book-cover"); // Add CSS class for styling (optional)

      const bookCollectionItem = document.querySelector(".book-item:last-child") as HTMLDivElement;
      if (bookCollectionItem) {
        const existingCover = bookCollectionItem.querySelector(".book-cover");
        if (existingCover) {
          existingCover.parentNode?.removeChild(existingCover); // Use optional chaining for safety
        }
        bookCollectionItem.appendChild(img); // Add the resized image to the container
      }
    };

    img.src = coverURL;
  }

  // Call displayBookCover only when adding a new book and cover is provided
  if (!isEditMode && cover) {
    displayBookCover(cover); 
  }

  displayBooks(); 
}

// Edit Book
function editBook(index: number) {
  const book = books[index];
  bookTitleInput.value = book.title;
  bookDescriptionInput.value = book.description;
  bookModalTitle.textContent = "Edit Book";
  bookCoverInput.value = ""; // Reset file input as it cannot show existing files
  isEditMode = true;
  currentBookIndex = index;
  bookModal.style.display = "flex";
}

// Delete Book
function deleteBook(index: number) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    alert("Book deleted successfully!");
    displayBooks();
  }
}

// Close Modal on Outside Click
window.addEventListener("click", (e: MouseEvent) => {
  if (e.target === bookModal) {
    bookModal.style.display = "none";
  }
});

// Array to store pending users (Example data, you can replace it with actual data source)
interface PendingUser {
  name: string;
  role: string;
}

const pendingUsers: PendingUser[] = [
  { name: "John Doe", role: "Member" },
  { name: "Jane Smith", role: "Member" },
];

// Get the container for displaying pending users
const pendingUsersContainer = document.getElementById("pending-users") as HTMLDivElement;

// Function to display pending approvals
function displayPendingUsers() {
  pendingUsersContainer.innerHTML = ""; // Clear the container

  if (pendingUsers.length === 0) {
    // Show a message if no pending users
    const emptyMessage = document.createElement("p") as HTMLParagraphElement;
    emptyMessage.textContent = "No pending user approvals.";
    pendingUsersContainer.appendChild(emptyMessage);
    return;
  }

  // Iterate over the pending users and create UI elements for each
  pendingUsers.forEach((user, index) => {
    // Create a container for the user
    const userDiv = document.createElement("div") as HTMLDivElement;
    userDiv.classList.add("pending-user");
    userDiv.textContent = `<span class="math-inline">\{user\.name\} \(</span>{user.role})`;

    // Approve button
    const approveBtn = document.createElement("button") as HTMLButtonElement;
    approveBtn.textContent = "Approve";
    approveBtn.classList.add("cta");
    approveBtn.onclick = () => {
      pendingUsers.splice(index, 1); // Remove user from the array
      alert(`${user.name} has been approved.`);
      displayPendingUsers(); // Refresh the list
    };

    // Reject button
    const rejectBtn = document.createElement("button") as HTMLButtonElement;
    rejectBtn.textContent = "Reject";
    rejectBtn.classList.add("cta", "reject-btn");
    rejectBtn.onclick = () => {
      pendingUsers.splice(index, 1); // Remove user from the array
      alert(`${user.name} has been rejected.`);
      displayPendingUsers(); // Refresh the list
    };

    // Append buttons to the user container
    userDiv.appendChild(approveBtn);
    userDiv.appendChild(rejectBtn);

    // Append the user container to the pending users section
    pendingUsersContainer.appendChild(userDiv);
  });
}

// Add event listeners
addBookBtn.addEventListener("click", () => {
  currentBookIndex = null;
  bookModalTitle.textContent = "Add Book";
});

saveBookBtn.addEventListener("click", () => {
  const title = bookTitleInput.value.trim();
  const description = bookDescriptionInput.value.trim();
  const coverFile = bookCoverInput.files[0];

  if (!title || !description) {
    alert("Please fill in both the title and description.");
    return;
  }

  // ... (Rest of the code) 
});