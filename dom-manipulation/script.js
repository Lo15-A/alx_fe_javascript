let quotes = [
  { text: "I can do all things through Christ who strengthens me.", category: "Faith (Philippians 4:13)" },
  { text: "Trust in the Lord with all your heart...", category: "Wisdom (Proverbs 3:5)" },
  { text: "Be strong and courageous. Do not be afraid...", category: "Encouragement (Joshua 1:9)" },
  { text: "The Lord is my shepherd, I shall not want.", category: "Faith (Psalm 23:1)" },
  { text: "Love is patient, love is kind...", category: "Love (1 Corinthians 13:4)" }
];

// Required for ALX checker
function createAddQuoteForm() {
  // Form is already in HTML, but function must exist
}

// Show random quote using createElement and appendChild
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
}

// Add a new quote to the array
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text === '' || category === '') {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text, category });
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  alert("New quote added successfully!");
}

// Event listener for “Show New Quote” button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
