const API_URL = 'http://localhost:5050/api';

// Fetch categories and bookmarks from the backend
async function fetchData() {
    try {
        const [categoriesResponse, bookmarksResponse] = await Promise.all([
            fetch(`${API_URL}/categories`),
            fetch(`${API_URL}/bookmarks`)
        ]);

        if (!categoriesResponse.ok || !bookmarksResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const categories = await categoriesResponse.json();
        const bookmarks = await bookmarksResponse.json();

        displayCategories(categories);
        displayBookmarks(bookmarks);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch bookmarks by category from the backend
async function fetchBookmarksByCategory(categoryId) {
    try {
        const response = await fetch(`${API_URL}/bookmarks/ByCategory/${categoryId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const bookmarks = await response.json();
        showBookmarksPopup(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks by category:', error);
    }
}

// Add a new category to the backend
async function addCategoryToBackend(category) {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const newCategory = await response.json();
        appendCategory(newCategory);
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

// Add a new bookmark to the backend
async function addBookmarkToBackend(bookmark) {
    try {
        const response = await fetch(`${API_URL}/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookmark)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const newBookmark = await response.json();
        appendBookmark(newBookmark);
    } catch (error) {
        console.error('Error adding bookmark:', error);
    }
}

// Function to append a single category to the displayed list
function appendCategory(category) {
    const categoriesContainer = document.getElementById('category-list');
    const categoryDropdown = document.getElementById('bookmark-category');

    if (!categoriesContainer || !categoryDropdown) {
        console.error('Category list or dropdown element not found');
        return;
    }

    const categoryElement = document.createElement('div');
    categoryElement.textContent = category.name;
    categoryElement.addEventListener('click', () => {
        fetchBookmarksByCategory(category.id);
        focusCategory(categoryElement);
    });
    categoriesContainer.appendChild(categoryElement);

    const optionElement = document.createElement('option');
    optionElement.value = category.id;
    optionElement.textContent = category.name;
    categoryDropdown.appendChild(optionElement);
}

// Function to append a single bookmark to the displayed list
function appendBookmark(bookmark) {
    const bookmarksContainer = document.getElementById('bookmark-list');
    if (!bookmarksContainer) {
        console.error('Bookmark list element not found');
        return;
    }

    const bookmarkElement = document.createElement('div');
    bookmarkElement.textContent = bookmark.title;
    bookmarkElement.addEventListener('click', () => {
        window.open(bookmark.url, '_blank');
    });
    bookmarksContainer.appendChild(bookmarkElement);
}

// Function to display categories
function displayCategories(categories) {
    const categoriesContainer = document.getElementById('category-list');
    const categoryDropdown = document.getElementById('bookmark-category');

    if (!categoriesContainer || !categoryDropdown) {
        console.error('Category list or dropdown element not found');
        return;
    }

    categoriesContainer.innerHTML = '';
    categoryDropdown.innerHTML = '<option value="" disabled selected>Choose category</option>';

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.textContent = category.name;
        categoryElement.addEventListener('click', () => {
            fetchBookmarksByCategory(category.id);
            focusCategory(categoryElement);
        });
        categoriesContainer.appendChild(categoryElement);

        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.textContent = category.name;
        categoryDropdown.appendChild(optionElement);
    });
}

// Function to display bookmarks
function displayBookmarks(bookmarks) {
    const bookmarksContainer = document.getElementById('bookmark-list');
    if (!bookmarksContainer) {
        console.error('Bookmark list element not found');
        return;
    }

    bookmarksContainer.innerHTML = '';
    bookmarks.forEach(bookmark => {
        const bookmarkElement = document.createElement('div');
        bookmarkElement.textContent = bookmark.title;
        bookmarkElement.addEventListener('click', () => {
            window.open(bookmark.url, '_blank');
        });
        bookmarksContainer.appendChild(bookmarkElement);
    });
}

// Function to show bookmarks in a popup
function showBookmarksPopup(bookmarks) {
    const popupContainer = document.getElementById('popup-container');
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = ''; // Clear previous content

    bookmarks.forEach(bookmark => {
        const bookmarkElement = document.createElement('div');
        bookmarkElement.classList.add('bookmark-item');
        bookmarkElement.innerHTML = `
            <span>${bookmark.title}</span>
            <button onclick="window.open('${bookmark.url}', '_blank')">Go to URL</button>
        `;
        popupContent.appendChild(bookmarkElement);
    });

    popupContainer.style.display = 'flex'; // Show the popup
}

// Function to close the popup
function closePopup() {
    const popupContainer = document.getElementById('popup-container');
    popupContainer.style.display = 'none';
}

// Close popup when clicking outside of it
document.getElementById('popup-container').addEventListener('click', function (event) {
    if (event.target === this) {
        closePopup();
    }
});

// Function to display categories
// Function to display categories
// Function to display categories
function displayCategories(categories) {
    const categoriesContainer = document.getElementById('category-list');
    const categoryDropdown = document.getElementById('bookmark-category');

    if (!categoriesContainer || !categoryDropdown) {
        console.error('Category list or dropdown element not found');
        return;
    }

    categoriesContainer.innerHTML = ''; // Clear previous categories
    categoryDropdown.innerHTML = '<option value="" disabled selected>Choose category</option>'; // Clear previous options

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');

        const categoryName = document.createElement('h3');
        categoryName.textContent = category.name;
        categoryElement.appendChild(categoryName);

        if (category.image) {
            const categoryImage = document.createElement('img');
            categoryImage.src = category.image;
            categoryElement.appendChild(categoryImage);
        }

        categoryElement.addEventListener('click', () => {
            fetchBookmarksByCategory(category.id);
            focusCategory(categoryElement);
        });

        categoriesContainer.appendChild(categoryElement);

        // Add the new category to the dropdown
        const optionElement = document.createElement('option');
        optionElement.value = category.id; // Assuming category.id is the value you want to use
        optionElement.textContent = category.name;
        categoryDropdown.appendChild(optionElement);
    });
}

// Function to focus on a category
function focusCategory(categoryElement) {
    const categoriesContainer = document.getElementById('category-list');
    Array.from(categoriesContainer.children).forEach(child => {
        child.classList.remove('focused');
    });
    categoryElement.classList.add('focused');
}

// Initialize the app
async function init() {
    await fetchData();
}

init();

// Event listeners for forms
document.getElementById('bookmark-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('bookmark-name').value;
    const url = document.getElementById('bookmark-url').value;
    const categoryId = document.getElementById('bookmark-category').value;
    const imageFile = document.getElementById('bookmark-image').files[0];
    let imageUrl = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            const bookmark = { title, url, categoryId, imageUrl };
            addBookmarkToBackend(bookmark);
        };
        reader.readAsDataURL(imageFile);
    } else {
        const bookmark = { title, url, categoryId, imageUrl };
        addBookmarkToBackend(bookmark);
    }

    this.reset();
});

document.getElementById('category-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('category-name').value;
    const imageFile = document.getElementById('category-image').files[0];
    let imageUrl = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            const category = { name, imageUrl };
            addCategoryToBackend(category);
        };
        reader.readAsDataURL(imageFile);
    } else {
        const category = { name, imageUrl };
        addCategoryToBackend(category);
    }

    this.reset();
});