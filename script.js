// Get books from localStorage
let books = JSON.parse(localStorage.getItem("books")) || [];

const editBookData = JSON.parse(localStorage.getItem("editBook"));

if (bookForm && editBookData) {

    document.getElementById("bookName").value = editBookData.name;
    document.getElementById("author").value = editBookData.author;
    document.getElementById("genre").value = editBookData.genre;
    document.getElementById("bookLink").value = editBookData.link;
    document.getElementById("cover").value = editBookData.cover;
    document.getElementById("status").value = editBookData.status;
}
// ---------------- ADD BOOK ----------------

const bookForm = document.getElementById("bookForm");

if (bookForm) {

    bookForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const book = {
            id: editBookData ? editBookData.id : Date.now(),
            name: document.getElementById("bookName").value,
            author: document.getElementById("author").value,
            genre: document.getElementById("genre").value,
            link: document.getElementById("bookLink").value,
            cover: document.getElementById("cover").value,
            status: document.getElementById("status").value
        };

        if (editBookData) {

            books = books.map(function (oldBook) {
                return oldBook.id === book.id ? book : oldBook;
            });

            localStorage.removeItem("editBook");

        } else {

            books.push(book);
        }

        // Save to browser
        localStorage.setItem("books", JSON.stringify(books));

        // Go back to books page
        window.location.href = "index.html";
    });
}


// ---------------- DISPLAY BOOKS ----------------

const booksContainer = document.getElementById("booksContainer");

function displayBooks(bookList) {

    if (!booksContainer) return;

    booksContainer.innerHTML = "";

    if (bookList.length === 0) {
        booksContainer.innerHTML = `
            <p class="text-gray-500 col-span-full text-center">
                No books found.
            </p>
        `;
        return;
    }

    bookList.forEach(function (book) {

        const card = document.createElement("div");

        card.className =
            "bg-white rounded-xl shadow-sm overflow-hidden";

        card.innerHTML = `
            <img
                src="${book.cover || 'https://via.placeholder.com/300x400?text=No+Cover'}"
                alt="${book.name}"
                class="w-full h-64 object-cover"
            >

            <div class="p-4">

                <h2 class="text-lg font-bold">
                    ${book.name}
                </h2>

                <p class="text-gray-600 text-sm">
                    ${book.author || "Unknown Author"}
                </p>

                <p class="text-gray-500 text-sm mt-2">
                    ${book.genre || "No genre"}
                </p>

                <span class="inline-block mt-3 px-3 py-1 text-sm bg-gray-100 rounded-full">
                    ${getStatusText(book.status)}
                </span>

                <div class="flex gap-2 mt-4">

                    ${
                        book.link
                        ? `<a
                            href="${book.link}"
                            target="_blank"
                            class="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg">
                            Open Book
                        </a>`
                        : ""
                    }

                    <button
                        onclick="editBook(${book.id})"
                        class="px-3 py-2 border rounded-lg">
                        Edit
                    </button>

                    <button
                        onclick="deleteBook(${book.id})"
                        class="px-3 py-2 border border-red-400 text-red-500 rounded-lg">
                        Delete
                    </button>

                </div>

            </div>
        `;

        booksContainer.appendChild(card);
    });
}


// Convert status value to readable text
function getStatusText(status) {

    if (status === "want") {
        return "Want to Read";
    }

    if (status === "reading") {
        return "Reading";
    }

    if (status === "completed") {
        return "Completed";
    }

    return "";
}


// ---------------- DELETE BOOK ----------------

function deleteBook(id) {

    books = books.filter(function (book) {
        return book.id !== id;
    });

    localStorage.setItem("books", JSON.stringify(books));

    displayBooks(books);
}

function editBook(id) {

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) return;

    localStorage.setItem("editBook", JSON.stringify(book));

    window.location.href = "add-book.html";
}

// ---------------- SEARCH ----------------

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase();

        const filteredBooks = books.filter(function (book) {

            return (
                book.name.toLowerCase().includes(searchText) ||
                book.author.toLowerCase().includes(searchText)
            );

        });

        displayBooks(filteredBooks);
    });
}


// ---------------- FILTER ----------------

const statusFilter = document.getElementById("statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        const selectedStatus = statusFilter.value;

        if (selectedStatus === "all") {
            displayBooks(books);
            return;
        }

        const filteredBooks = books.filter(function (book) {
            return book.status === selectedStatus;
        });

        displayBooks(filteredBooks);
    });
}


// Display books when page loads
displayBooks(books);