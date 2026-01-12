let selection = [];
let tempAddons = [];

const modalData = {
    'small-lot': {
        fr: `<h3>Petit terrain (65$)</h3><ul><li>Tonte, coupe-bordure, soufflage</li><li>Bordure une fois par mois</li></ul><button class="btn-quote" onclick="addItem('Petit terrain / Small Lot (65$)')">Ajouter / Add</button>`
    },
    'custom-quote': {
        fr: `<h3>Terrain Standard</h3><p>Veuillez envoyer votre adresse et la taille du terrain pour une estimation.</p><button class="btn-quote" onclick="addItem('Estimation: Terrain Standard')">Ajouter / Add</button>`
    }
};

const addonsList = [
    { fr: "Nettoyage printanier", en: "Spring cleanup" },
    { fr: "Aération et déchaumage", en: "Aeration and dethatching" },
    { fr: "Contrôle des mauvaises herbes", en: "Weed control" },
    { fr: "Fertilisation écologique", en: "Eco-friendly fertilization" },
    { fr: "Pose de gazon en rouleaux", en: "Sod installation" }
];

function openModal(id) {
    const body = document.getElementById('modal-body');
    if (id === 'addons-modal') {
        // Prepare temporary storage for Add-ons
        tempAddons = [...selection.filter(i => addonsList.some(a => `${a.fr} / ${a.en}` === i))];
        let html = '<h3>Add-ons / Services Additionnels</h3>';
        addonsList.forEach((a, i) => {
            const label = `${a.fr} / ${a.en}`;
            const isChecked = tempAddons.includes(label) ? 'checked' : '';
            html += `<div style="margin:10px 0;"><input type="checkbox" id="a${i}" ${isChecked} onchange="updateTemp('${label}')"> <label for="a${i}">${label}</label></div>`;
        });
        // ONLY the Add-on box gets the "Confirm" button
        html += `<button class="btn-quote" onclick="confirmAddons()">CONFIRMER / CONFIRM</button>`;
        body.innerHTML = html;
    } else {
        // Original behavior for the first two boxes
        body.innerHTML = modalData[id].fr;
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

function updateCart() {
    const display = document.getElementById('cart-display');
    display.innerHTML = selection.length ? `<ul>${selection.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>Aucun service sélectionné / No services selected</p>';
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

function sendFinalEmail() {
    if (!selection.length) return alert("Sélectionnez un service!");
    const body = encodeURIComponent("Estimation pour :\n\n" + selection.join("\n") + "\n\nAdresse:");
    window.location.href = `mailto:mcsolutiongazon@gmail.com?subject=Estimation&body=${body}`;
}
