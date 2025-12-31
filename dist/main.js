var _a, _b, _c, _d, _e, _f;
import { EventModel } from './models/Event.js';
import { User } from './models/User.js';
import { Registration } from './models/Registration.js';
// --- STATE MANAGEMENT ---
let events = JSON.parse(localStorage.getItem('events_list') || '[]');
let users = JSON.parse(localStorage.getItem('user_list') || '[]');
let registrations = JSON.parse(localStorage.getItem('reg_list') || '[]');
let currentUser = null;
const persist = () => {
    localStorage.setItem('events_list', JSON.stringify(events));
    localStorage.setItem('user_list', JSON.stringify(users));
    localStorage.setItem('reg_list', JSON.stringify(registrations));
};
// --- SEED DATA (5 EVENTS) ---
if (events.length === 0) {
    events = [
        new EventModel('1', 'Global AI Ethics Forum', 'The future of AI in 2026.', '2026-01-15', 'Grand Hall A', 'conference', 200, 145),
        new EventModel('2', 'Tech Summit 2024', 'Last year\'s keynote event.', '2024-11-20', 'Campus Hall', 'conference', 100, 101),
        new EventModel('3', 'Coding Bootcamp', 'Learn TypeScript.', '2026-07-20', 'Mbalngong', 'workshop', 25, 6),
        new EventModel('4', 'Annual Marathon', 'Track event.', '2026-05-10', 'Campus-Eyang', 'sport', 50),
        new EventModel('5', 'Cybersecurity Expo', 'Safe computing.', '2026-03-12', 'Tech Plaza', 'conference', 50, 10)
    ];
    persist();
}
// --- WINDOW LOGIC ---
window.openWindow = (id) => document.getElementById(id).style.display = 'flex';
window.closeWindows = () => document.querySelectorAll('.window-overlay').forEach(w => w.style.display = 'none');
// --- AUTHENTICATION ---
(_a = document.getElementById('signup-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = new User(document.getElementById('s-name').value, document.getElementById('s-email').value, document.getElementById('s-pass').value);
    users.push(newUser);
    persist();
    currentUser = newUser;
    launchDashboard();
});
(_b = document.getElementById('login-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('l-email').value;
    const pass = document.getElementById('l-pass').value;
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
        currentUser = user;
        launchDashboard();
    }
    else
        alert("Access Denied");
});
(_c = document.getElementById('admin-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('a-email').value;
    const pass = document.getElementById('a-pass').value;
    if (email === 'admin@school.com' && pass === 'admin123') {
        currentUser = new User('System Admin', email, pass, 'admin');
        launchDashboard();
    }
    else
        alert("Invalid Admin Token");
});
function launchDashboard() {
    window.closeWindows();
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-dashboard').style.display = 'block';
    if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'admin')
        document.getElementById('show-create-btn').style.display = 'block';
    renderArchive();
}
// --- RENDERING & SEARCH ---
function renderArchive() {
    const app = document.getElementById('app-container');
    if (!app)
        return;
    const today = new Date().toISOString().split('T')[0];
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filtered = events.filter(e => e.title.toLowerCase().includes(searchTerm));
    let statsHTML = `
        <div class="stats-bar">
            <div class="stat-item"><span>Total Events</span><strong>${events.length}</strong></div>
            <div class="stat-item"><span>Search Results</span><strong>${filtered.length}</strong></div>
            ${(currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'admin' ? `
                <div class="stat-item" style="border-color: var(--accent);">
                    <span>Global Registrations</span>
                    <strong style="color: var(--accent);">${registrations.length}</strong>
                </div>
            ` : ''}
        </div>
    `;
    app.innerHTML = `${statsHTML}<div class="events-grid" id="grid"></div>`;
    filtered.forEach(ev => {
        var _a;
        const isPast = ev.date < today;
        const fill = (ev.currentParticipants / ev.maxCapacity) * 100;
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div style="font-size:0.7rem; font-weight:800; color:var(--primary);">${ev.category.toUpperCase()}</div>
            <h3>${ev.title}</h3>
            <p style="font-size:0.9rem; color:#64748b;">${ev.description}</p>
            <div class="progress-container"><div class="progress-fill" style="width:${fill}%"></div></div>
            <span class="seat-text">${ev.currentParticipants}/${ev.maxCapacity} Booked</span>
            <div style="margin-top:15px; font-size:0.8rem; font-weight:600;">${ev.location.toUpperCase()} • ${ev.date}</div>
            <button class="btn-primary-lg" style="width:100%; margin-top:20px; ${isPast ? 'background:#cbd5e1;' : ''}" 
                onclick="${isPast ? '' : `book('${ev.id}')`}" ${isPast ? 'disabled' : ''}>
                ${isPast ? 'Event Passed' : 'Register Now'}
            </button>
        `;
        (_a = document.getElementById('grid')) === null || _a === void 0 ? void 0 : _a.appendChild(card);
    });
}
// --- ACTIONS ---
window.book = (id) => {
    const ev = events.find(e => e.id === id);
    if (!ev || registrations.some(r => r.eventId === id && r.userEmail === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.email)))
        return alert("Already registered!");
    if (ev.currentParticipants >= ev.maxCapacity)
        return alert("Fully Booked!");
    registrations.push(new Registration(id, currentUser.email));
    ev.currentParticipants++;
    persist();
    renderArchive();
    alert("Confirmed!");
};
// --- ELITE CREATE EVENT WINDOW (CLEAN VERSION) ---
(_d = document.getElementById('show-create-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
    var _a;
    const app = document.getElementById('app-container');
    if (!app)
        return;
    app.innerHTML = `
        <div class="form-wrap">
            <h2 style="margin-bottom: 30px;">Create New Archive Entry</h2>
            <form id="create-form" class="form-grid">
                <div class="form-group full-width">
                    <label>Event Title</label>
                    <input type="text" id="ev-t" placeholder="e.g. Annual Tech Symposium" required>
                </div>
                
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea id="ev-d" placeholder="Provide event details..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="ev-da" required>
                </div>
                
                <div class="form-group">
                    <label>Category</label>
                    <select id="ev-c">
                        <option value="conference">Conference</option>
                        <option value="sport">Sport</option>
                        <option value="workshop">Workshop</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="ev-l" placeholder="Venue name" required>
                </div>
                
                <div class="form-group">
                    <label>Max Capacity</label>
                    <input type="number" id="ev-ca" value="50">
                </div>
                
                <div class="form-actions full-width" style="display: flex; justify-content: flex-end; align-items: center; margin-top: 20px;">
                    <button type="button" onclick="renderArchive()" style="background:none; border:none; margin-right:20px; cursor:pointer; color:#64748b; font-weight:600;">Cancel</button>
                    <button type="submit" class="btn-primary-lg" style="width:200px;">Publish to Archive</button>
                </div>
            </form>
        </div>
    `;
    (_a = document.getElementById('create-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEv = new EventModel(Date.now().toString(), document.getElementById('ev-t').value, document.getElementById('ev-d').value, document.getElementById('ev-da').value, document.getElementById('ev-l').value, document.getElementById('ev-c').value, parseInt(document.getElementById('ev-ca').value));
        events.push(newEv);
        persist();
        renderArchive();
    });
});
(_e = document.getElementById('search-input')) === null || _e === void 0 ? void 0 : _e.addEventListener('input', renderArchive);
(_f = document.getElementById('show-archive-btn')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', renderArchive);
