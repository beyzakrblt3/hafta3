document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const quoteForm = document.getElementById('quoteForm');
    const userQuoteInput = document.getElementById('userQuote');
    const quoteList = document.getElementById('quoteList');
    const favoritesList = document.getElementById('favoritesList');

    // Sample quotes
    const quotes = [
        { text: "Sanat, duyguların evrensel dilidir.", category: "sanat" },
        { text: "Tarih, geçmişin aynasıdır.", category: "tarih" },
        { text: "Seyahat, ruhu besler.", category: "seyahat" }
    ];

    // Add quote to the list
    const addQuoteToList = (quote) => {
        const li = document.createElement('li');
        li.textContent = `${quote.text} (Kategori: ${quote.category})`;
        quoteList.appendChild(li);
    };

    // Display all quotes initially
    quotes.forEach(quote => addQuoteToList(quote));

    // Filter quotes by category
    categorySelect.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        quoteList.innerHTML = ''; // Clear list
        const filteredQuotes = selectedCategory === 'all'
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);
        filteredQuotes.forEach(quote => addQuoteToList(quote));
    });

    // Search functionality
    searchInput.addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredQuotes = quotes.filter(quote => quote.text.toLowerCase().includes(searchText));
        quoteList.innerHTML = ''; // Clear list
        filteredQuotes.forEach(quote => addQuoteToList(quote));
    });

    // Add new quote from the form
    quoteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newQuoteText = userQuoteInput.value;
        const newQuote = { text: newQuoteText, category: 'all' }; // Default category to 'all'
        quotes.push(newQuote); // Add to quotes array
        addQuoteToList(newQuote); // Add to the list
        userQuoteInput.value = ''; // Clear input
    });

    // Add a quote to favorites
    const addToFavorites = () => {
        const favoriteQuote = quotes[quotes.length - 1]; // Use the last added quote
        const li = document.createElement('li');
        li.textContent = favoriteQuote.text;
        favoritesList.appendChild(li);
    };

    // Handle the "Favorilere Ekle" button
    document.querySelector('.favorites-section button').addEventListener('click', addToFavorites);

    // 2. Görsellere tıklanınca büyüsün (Modal)
    const modalHTML = `
        <div id="imageModal" style="display:none; position:fixed; z-index:1000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); justify-content:center; align-items:center;">
            <img id="modalImage" src="" alt="" style="max-width:90%; max-height:90%; border:5px solid white;" />
        </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    document.querySelectorAll("img").forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            modalImg.src = img.src;
            modal.style.display = "flex";
        });
    });

    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 3. Sayfa fade-in efektiyle açılsın
    document.body.style.opacity = 0;
    document.body.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);

    // 4. Footer'daki yıl otomatik güncellensin
    const footer = document.querySelector("footer p");
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `&copy; ${year} Seyahat ve Sanat Web Sitesi`;
    }

    // Aktif sayfa menüde vurgulansın
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
