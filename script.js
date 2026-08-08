let books = JSON.parse(localStorage.getItem("books")) || [];

const bookForm = document.getElementById("bookForm");
const editBookData = JSON.parse(localStorage.getItem("editBook"));

if (bookForm && editBookData) {

    document.getElementById("bookName").value = editBookData.name;
    document.getElementById("author").value = editBookData.author;
    document.getElementById("genre").value = editBookData.genre;
    document.getElementById("type").value = editBookData.type || "book";
    document.getElementById("bookLink").value = editBookData.link;
    document.getElementById("cover").value = editBookData.cover;
    document.getElementById("status").value = editBookData.status;
}

const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");

if (editBookData && formTitle && submitButton) {
    formTitle.textContent = "Edit Book";
    submitButton.textContent = "Save Changes";
}

if (bookForm) {

    bookForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const book = {
            id: editBookData ? editBookData.id : Date.now(),
            name: document.getElementById("bookName").value,
            author: document.getElementById("author").value,
            genre: document.getElementById("genre").value,
            type: document.getElementById("type").value || "book",
            link: document.getElementById("bookLink").value,
            cover: document.getElementById("cover").value,
            status: document.getElementById("status").value,
            favorite: editBookData ? Boolean(editBookData.favorite) : false
        };

        if (editBookData) {

            books = books.map(function (oldBook) {
                return oldBook.id === book.id ? book : oldBook;
            });

            localStorage.removeItem("editBook");

        } else {

            books.push(book);
        }

        localStorage.setItem("books", JSON.stringify(books));

        window.location.href = "index.html";
    });
}

const booksContainer = document.getElementById("booksContainer");

function displayBooks(bookList) {

    if (!booksContainer) return;

    booksContainer.innerHTML = "";

    if (bookList.length === 0) {
        booksContainer.innerHTML = `
            <div class="empty-state col-span-full">
                <h2 class="text-xl font-semibold text-gray-700">
                    No books found
                </h2>
                <p class="text-gray-500 mt-2">
                    Add your first book to get started.
                </p>
            </div>
        `;
        return;
    }

    bookList.forEach(function (book) {

        const card = document.createElement("div");

        card.className =
            `book-card ${getStatusClass(book.status)} rounded-xl overflow-hidden`;

        card.innerHTML = `
            <img
                src="${book.cover || 'https://via.placeholder.com/300x400?text=No+Cover'}"
                alt="${book.name}"
                class="book-cover"
                onerror="this.src='https://via.placeholder.com/300x400?text=No+Cover'"
            >

            <div class="p-4">

                <div class="flex items-center justify-between gap-2">
                    <h2 class="text-lg font-bold truncate flex-1">
                        ${book.name}
                    </h2>

                    <button
                        onclick="toggleFavorite(${book.id})"
                        class="favorite-button ${book.favorite ? "active" : ""}"
                        aria-label="Toggle favorite"
                        title="${book.favorite ? "Unfavorite" : "Favorite"}"
                    >
                        ${book.favorite ? "★" : "☆"}
                    </button>
                </div>

                <p class="text-gray-600 text-sm mt-1">
                    ${book.author || "Unknown Author"}
                </p>

                ${
                    getGenreList(book.genre).length
                    ? `<div class="flex flex-wrap gap-2 mt-1">
                        ${getGenreList(book.genre).map(function (genre) {
                            return `<span class="genre-badge">${genre}</span>`;
                        }).join("")}
                       </div>`
                    : ""
                }

                <div class="mt-4 flex flex-col sm:flex-row gap-2">

                    ${
                        book.link
                        ? `<a
                            href="${book.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex-1 min-w-0 inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                            Open Link
                           </a>`
                        : ""
                    }

                    <button
                        onclick="editBook(${book.id})"
                        class="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-100">
                        Edit
                    </button>

                    <button
                        onclick="deleteBook(${book.id})"
                        class="flex-1 px-3 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50">
                        Delete
                    </button>

                </div>

            </div>
        `;

        booksContainer.appendChild(card);
    });
}

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

function getStatusClass(status) {

    if (status === "want") {
        return "status-want";
    }

    if (status === "reading") {
        return "status-reading";
    }

    if (status === "completed") {
        return "status-completed";
    }

    if (status === "hiatus") {
        return "status-hiatus";
    }

    return "";
}

function normalizeType(type) {
    if (type === "manga" || type === "webnovel") {
        return type;
    }

    return "book";
}

function getGenreList(genreValue) {
    if (!genreValue) return [];

    return Array.from(new Set(
        String(genreValue)
            .split(",")
            .map(function (genre) {
                return genre.trim();
            })
            .filter(Boolean)
    ));
}

function getAuthorList(authorValue) {
    if (!authorValue) return [];

    return String(authorValue)
        .split(",")
        .map(function (author) {
            return author.trim();
        })
        .filter(Boolean);
}

function deleteBook(id) {

    const confirmDelete = confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) {
        return;
    }

    books = books.filter(function (book) {
        return book.id !== id;
    });

    localStorage.setItem("books", JSON.stringify(books));

    loadGenres();
    applyFilters();
}

function toggleFavorite(id) {

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) return;

    book.favorite = !book.favorite;

    localStorage.setItem("books", JSON.stringify(books));

    applyFilters();
}

function editBook(id) {

    const book = books.find(function (book) {
        return book.id === id;
    });

    if (!book) return;

    localStorage.setItem("editBook", JSON.stringify(book));

    window.location.href = "add-book.html";
}
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const statusFilter = document.getElementById("statusFilter");
const genreFilter = document.getElementById("genreFilter");
const favoriteFilter = document.getElementById("favoriteFilter");
const sortBooks = document.getElementById("sortBooks");

function loadGenres() {

    if (!genreFilter) return;

    const genres = [];

    books.forEach(function (book) {

        getGenreList(book.genre).forEach(function (genre) {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });

    });

    genres.sort(function (a, b) {
        return a.localeCompare(b);
    });

    genreFilter.innerHTML = `<option value="all">All Genres</option>`;

    genres.forEach(function (genre) {

        genreFilter.innerHTML += `
            <option value="${genre}">
                ${genre}
            </option>
        `;

    });
}

function applyFilters() {

    let filteredBooks = [...books];

    if (searchInput) {

        const searchText = (searchInput.value || "").trim().toLowerCase();

        if (searchText) {
            filteredBooks = filteredBooks.filter(function (book) {

                const bookName = (book.name || "").toLowerCase();
                const authors = getAuthorList(book.author).map(function (author) {
                    return author.toLowerCase();
                });

                return (
                    bookName.includes(searchText) ||
                    authors.some(function (author) {
                        return author.includes(searchText);
                    })
                );

            });
        }
    }

    if (typeFilter && typeFilter.value !== "all") {

        filteredBooks = filteredBooks.filter(function (book) {
            return normalizeType(book.type) === typeFilter.value;
        });

    }

    if (statusFilter && statusFilter.value !== "all") {

        filteredBooks = filteredBooks.filter(function (book) {
            return book.status === statusFilter.value;
        });

    }

    if (genreFilter && genreFilter.value !== "all") {

        filteredBooks = filteredBooks.filter(function (book) {
            const genres = getGenreList(book.genre).map(function (genre) {
                return genre.toLowerCase();
            });

            return genres.includes(genreFilter.value.toLowerCase());
        });

    }

    if (favoriteFilter && favoriteFilter.value === "favorites") {

        filteredBooks = filteredBooks.filter(function (book) {
            return book.favorite === true;
        });

    }

    if (sortBooks) {

        if (sortBooks.value === "az") {

            filteredBooks.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

        }

        if (sortBooks.value === "za") {

            filteredBooks.sort(function (a, b) {
                return b.name.localeCompare(a.name);
            });

        }

    }

    displayBooks(filteredBooks);
}

if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
}

if (typeFilter) {
    typeFilter.addEventListener("change", applyFilters);
}

if (statusFilter) {
    statusFilter.addEventListener("change", applyFilters);
}

if (genreFilter) {
    genreFilter.addEventListener("change", applyFilters);
}

if (favoriteFilter) {
    favoriteFilter.addEventListener("change", applyFilters);
}

if (sortBooks) {
    sortBooks.addEventListener("change", applyFilters);
}

loadGenres();
displayBooks(books);