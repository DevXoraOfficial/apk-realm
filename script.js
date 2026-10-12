// Search Filtering
document.getElementById('searchInput').addEventListener('keyup', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.app-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Category Filter Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const cards = document.querySelectorAll('.app-card');

        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Download Modal Timer System
let countdownInterval;

function openDownloadModal(appName, size, version) {
    const modal = document.getElementById('downloadModal');
    const title = document.getElementById('modalTitle');
    const info = document.getElementById('modalInfo');
    const timerBox = document.getElementById('timerBox');
    const dlBtn = document.getElementById('directDownloadBtn');
    const countdownEl = document.getElementById('countdown');

    title.innerText = appName;
    info.innerText = `Package Size: ${size} | Version: ${version}`;
    modal.style.display = 'flex';

    // Reset button state
    dlBtn.classList.add('disabled');
    dlBtn.innerText = 'Initializing Secure Link...';
    dlBtn.href = '#';

    let timeLeft = 5;
    countdownEl.innerText = timeLeft;
    timerBox.style.display = 'block';

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownEl.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerBox.style.display = 'none';
            dlBtn.classList.remove('disabled');
            dlBtn.innerText = '⚡ Download APK Now';
            dlBtn.href = '#'; // Replace with your direct .apk file link
        }
    }, 1000);
}

function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
    clearInterval(countdownInterval);
}
