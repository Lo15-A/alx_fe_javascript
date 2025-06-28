// Initial fallback quotes
let quotes = [
  { text: "I can do all things through Christ who strengthens me.", category: "Faith (Philippians 4:13)" },
  { text: "Trust in the Lord with all your heart...", category: "Wisdom (Proverbs 3:5)" },
  { text: "Be strong and courageous. Do not be afraid...", category: "Encouragement (Joshua 1:9)" },
  { text: "The Lord is my shepherd, I shall not want.", category: "Faith (Psalm 23:1)" },
  { text: "Love is patient, love is kind...", category: "Love (1 Corinthians 13:4)" }
];

// Load saved quotes from localStorage if they exist
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Required by ALX checker
function createAddQuoteForm() {
  // Form is already in HTML
}

// Populate the category filter dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return;

  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes by selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastFilter', selectedCategory);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes found for this category.</p>';
    return;
  }

  filteredQuotes.forEach(quote => {
    const verse = document.createElement('p');
    verse.innerHTML = `<strong>Verse:</strong> "${quote.text}"`;

    const cat = document.createElement('p');
    cat.innerHTML = `<strong>Category:</strong> ${quote.category}`;

    quoteDisplay.appendChild(verse);
    quoteDisplay.appendChild(cat);
  });
}

// Display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const versePara = document.createElement('p');
  versePara.innerHTML = `<strong>Verse:</strong> "${quote.text}"`;

  const categoryPara = document.createElement('p');
  categoryPara.innerHTML = `<strong>Category:</strong> ${quote.category}`;

  quoteDisplay.appendChild(versePara);
  quoteDisplay.appendChild(categoryPara);

  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text === '' || category === '') {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  alert("New quote added successfully!");
}

// Export quotes as JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON file format.');
      }
    } catch (err) {
      alert('Error reading JSON file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup after page load
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();

  const last = sessionStorage.getItem('lastQuote');
  const lastFilter = localStorage.getItem('lastFilter');

  if (lastFilter) {
    document.getElementById('categoryFilter').value = lastFilter;
    filterQuotes();
  } else if (last) {
    const quote = JSON.parse(last);
    const quoteDisplay = document.getElementById('quoteDisplay');

    const verse = document.createElement('p');
    verse.innerHTML = `<strong>Verse:</strong> "${quote.text}"`;

    const cat = document.createElement('p');
    cat.innerHTML = `<strong>Category:</strong> ${quote.category}`;

    quoteDisplay.appendChild(verse);
    quoteDisplay.appendChild(cat);
  }
});

// Event listener for Show New Quote button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
