let selection = [];
let tempAddons = [];

const modalData = {
    'small-lot': {
        fr: `<h3>Petit terrain (65$ / visite)</h3>
             <p>Le service inclut la tonte, le coupe-bordure (weedeater) et le soufflage. La bordure mécanique est incluse une fois par mois.</p><hr>`,
        en: `<h3>Small Lot ($65 / visit)</h3>
             <p>Service includes mowing, weed-eating, and blowing. Mechanical edging included once a month.</p>
             <button class="btn-quote" onclick="addItem('Petit terrain / Small Lot (65$/visite)')">Ajouter / Add</button>`
    },
    'custom-quote': {
        fr: `<h3>Terrain Standard / Standard Lot</h3>
             <p>Contact: <strong>mcsolutiongazon@gmail.com</strong></p>
             <div style="text-align:left; margin-top:15px; border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
                <label><b>Adresse / Address:</b></label><br>
                <input type="text" id="q_addr" placeholder="123 Rue..." style="width:100%; margin-bottom:10px; padding:8px;">
                <label><b>Taille du terrain / Lawn Size (pi²):</b></label><br>
                <input type="text" id="q_size" placeholder="e.g. 5000" style="width:100%; margin-bottom:10px; padding:8px;">
                <label><b>Contact (Tel / Email):</b></label><br>
                <input type="text" id="q_contact" style="width:100%; margin-bottom:10px; padding:8px;">
             </div>
             <button class="btn-quote" onclick="sendCustomQuote()">AJOUTER & ENVOYER / ADD & SEND</button>`
    }
};

const addonsList = [
    { fr: "Nettoyage printanier", en: "Spring cleanup" },
    { fr: "Aération et déchaumage", en: "Aeration and dethatching" },
    { fr: "Contrôle des mauvaises herbes", en: "Weed control" },
    { fr: "Fertilisation écologique", en: "Eco-friendly fertilization" },
    { fr: "Nettoyage des dommages hivernaux", en: "Winter damage repair" },
    { fr: "Traitements vers blancs & punaises de céréales", en: "White grub and chinch bug treatment" },
    { fr: "Pose de gazon en rouleaux", en: "Sod installation (rolled sod)" }
];

function openModal(id) {
    const body = document.getElementById('modal-body');
    if (id === 'addons-modal') {
        tempAddons = [...selection.filter(i => addonsList.some(a => `${a.fr} / ${a.en}` === i))];
        let html = '<h3>Add-ons / Services Additionnels</h3>';
        addonsList.forEach((a, i) => {
            const label = `${a.fr} / ${a.en}`;
            const isChecked = tempAddons.includes(label) ? 'checked' : '';
            html += `<div style="margin:10px 0;"><input type="checkbox" id="a${i}" ${isChecked} onchange="updateTemp('${label}')"> <label for="a${i}">${label}</label></div>`;
        });
        html += `<button class="btn-quote" onclick="confirmAddons()">CONFIRMER / CONFIRM</button>`;
        body.innerHTML = html;
    } else {
        body.innerHTML = modalData[id].fr + (modalData[id].en || "");
    }
    document.getElementById('modal-overlay').style.display = 'flex';
}

function updateTemp(item) {
    const idx = tempAddons.indexOf(item);
    if (idx > -1) tempAddons.splice(idx, 1);
    else tempAddons.push(item);
}

function confirmAddons() {
    selection = selection.filter(i => !addonsList.some(a => `${a.fr} / ${a.en}` === i));
    selection.push(...tempAddons);
    updateCart();
    closeModal();
}

function addItem(item) {
    if (!selection.includes(item)) selection.push(item);
    updateCart();
    closeModal();
}

function sendCustomQuote() {
    const addr = document.getElementById('q_addr').value;
    const size = document.getElementById('q_size').value;
    const contact = document.getElementById('q_contact').value;
    
    if(!addr || !size || !contact) return alert("Veuillez remplir tous les champs / Please fill all fields");

    const entry = `ESTIMATION: ${addr} (${size} pi²) - Contact: ${contact}`;
    if (!selection.includes(entry)) selection.push(entry);
    
    updateCart();
    closeModal();
}

function updateCart() {
    const display = document.getElementById('cart-display');
    if (selection.length === 0) {
        display.innerHTML = '<p>Aucun service sélectionné / No services selected</p>';
    } else {
        display.innerHTML = `<ul style="list-style:none; padding:0;">
            ${selection.map((item, index) => `
                <li style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; background:#fff; padding:10px; border-radius:8px; border-left: 5px solid #2e7d32; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <span>${item}</span>
                    <button onclick="removeItem(${index})" style="background:#ff4444; color:white; border:none; border-radius:50%; cursor:pointer; width:26px; height:26px; font-weight:bold; flex-shrink:0; margin-left:10px;">✕</button>
                </li>
            `).join('')}
        </ul>`;
    }
}

function removeItem(index) {
    selection.splice(index, 1);
    updateCart();
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

function sendFinalEmail() {
    if (!selection.length) return alert("Sélectionnez un service!");
    const body = encodeURIComponent("Demande d'estimation pour :\n\n" + selection.join("\n"));
    window.location.href = `mailto:mcsolutiongazon@gmail.com?subject=Estimation&body=${body}`;
}
