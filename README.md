# My Books

My Books is a personal book tracking app designed to help you keep a simple, local library of books you want to read, are currently reading, or have completed. It is built with plain HTML, CSS, JavaScript, and Tailwind CSS, with all data stored in the browser using LocalStorage.

## Overview

This project is a lightweight, privacy-friendly app for managing a reading list without a backend or login system. It is ideal for personal use and keeps everything local to the browser.

## Features

- Add new books
- Edit existing book entries
- Delete books
- Track book details such as:
  - title
  - author
  - genre
  - type
  - link
  - cover image URL
  - reading status
- Support for the following book types:
  - Book
  - Manga
  - Webnovel
- Support for the following statuses:
  - Want to Read
  - Reading
  - Completed
  - Hiatus
- Mark books as favorites
- Search by title or author
- Filter by type, genre, status, and favorites
- Sort books alphabetically in ascending or descending order
- Responsive layout for different screen sizes
- Local data persistence using browser storage

## Tech Stack

- HTML5
- CSS3
- Tailwind CSS
- JavaScript
- Browser LocalStorage

## Project Structure

```text
book-tracker/
├── index.html
├── add-book.html
├── style.css
├── script.js
├── README.md
```

## Getting Started

### Option 1: Open directly

1. Open the project folder.
2. Launch `index.html` in a browser.

### Option 2: Use VS Code Live Server

1. Open the project in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Select Open with Live Server.

## Data Storage

Book information is stored in the browser using LocalStorage. This means:

- data is saved locally on the same device/browser
- no server is required
- no account is needed
- the library is private to that browser environment

Note: LocalStorage is not shared across devices or browsers automatically.

## Privacy

This app is fully client-side. It does not use a backend, database, or user account system. Your book library stays in your browser and is not uploaded anywhere.

## Important Note

The app uses Tailwind CSS via CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Because of this, an internet connection is needed the first time the page loads so the styling can be fetched.

## Future Improvements

- import/export library data
- backup and restore books
- dark mode
- reading progress tracking
- custom themes

## License

This project is intended for personal and educational use.