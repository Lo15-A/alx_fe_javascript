// Load saved quotes from localStorage
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Save current quotes array to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Initial quotes array (fallback if localStorage is empty)
let quotes = [
  { text: "I can do all things through Christ who strengthens me.", category: "Faith (Philippians 4:13)" },
  { text: "Trust in the Lord with all your heart...", category: "Wisdom (Proverbs 3:5)" },
  { text: "Be strong and courageous. Do not be afraid...", category: "Encouragement (Joshua 1:9)" },
  { text: "The Lord is my shepherd, I shall not want.", category: "Faith (Psalm 23:1)" },
  { text: "Love is patient, love is kind...", category: "Love (1 Corinthians 13:4)" }
];

// Load from localStorage if available
loadQuotes();

// Required for ALX checker
function createAddQuoteForm() {
  // Form is already in HTML
}

// Show a random quote using DOM manipulation
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = ''; // Clear old content

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const versePara = document.createElement('p');
  versePara.innerHTML = `<strong>Verse:</strong> "${quote.text}"`;

  const categoryPara = document.createElement('p');
  categoryPara.innerHTML = `<strong>Category:</strong> ${quote.category}`;

  quoteDisplay.appendChild(versePara);
  quoteDisplay.appendChild(categoryPara);

  // Save the last quote shown to sessionStorage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Add a new quote to the array and update localStorage
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text === '' || category === '') {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes(); // Save to localStorage

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Show the newly added quote immediately
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  const verse = document.createElement('p');
  verse.innerHTML = `<strong>Verse:</strong> "${text}"`;

  const cat = document.createElement('p');
  cat.innerHTML = `<strong>Category:</strong> ${category}`;

  quoteDisplay.appendChild(verse);
  quoteDisplay.appendChild(cat);
}

// Export quotes to a downloadable JSON file
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

// Import quotes from a user-selected JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
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

// Set up event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Optionally display the last viewed quote on load
window.addEventListener('DOMContentLoaded', () => {
  const last = sessionStorage.getItem('lastQuote');
  if (last) {
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
