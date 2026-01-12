let selection = [];
let tempAddons = []; // Temporary storage for checkboxes

const modalData = {
    'small-lot': {
        item: 'Petit terrain / Small Lot (65$)',
        fr: `<h3>Petit terrain (65$)</h3>
             <ul><li>Tonte, coupe-bordure, soufflage</li><li>Bordure une fois par mois</li></ul>`,
        en: `<h3>Small Lot ($65)</h3>
             <ul><li>Mowing, trimming, blowing</li><li>Once a month edging</li></ul>`
    },
    'custom-quote': {
        item: 'Estimation: Terrain Standard / Standard Lot',
        fr: `<h3>Terrain Standard</h3>
             <p>Veuillez envoyer votre adresse et la taille du terrain à mcsolutiongazon@gmail.com pour une estimation.</p>`,
        en: `<h3>Standard Lot</h3>
             <p>Please email your address and lawn size to mcsolutiongazon@gmail.com for an estimate.</p>`
    }
};

const addons = [
    { fr: "Nettoyage printanier", en: "Spring cleanup" },
    { fr: "Aération et déchaumage", en: "Aeration and dethatching" },
    { fr: "Contrôle des mauvaises herbes", en: "Weed control" },
    { fr: "Fertilisation écologique", en: "Eco-friendly fertilization" },
    { fr: "Pose de gazon en rouleaux", en: "Sod installation" }
];

function openModal(id) {
    const body = document.getElementById('modal-body');
    if (id === 'addons-modal') {
        tempAddons = [...selection.filter(i => addons.some(a => `${a.fr} / ${a.en}` === i))];
        let html = '<h3>Add-ons / Services Additionnels</h3>';
        addons.forEach((a, i) => {
            const label = `${a.fr} / ${a.en}`;
            const isChecked = tempAddons.includes(label) ? 'checked' : '';
            html += `<div style="margin:10px 0;">
                        <input type="checkbox" id="a${i}" ${isChecked} onchange="updateTempAddon('${label}')"> 
                        <label for="a${i}">${label}</label>
                     </div>`;
        });
        html += `<button class="btn-quote" onclick="confirmAddons()">CONFIRMER / CONFIRM</button>`;
        body.innerHTML = html;
    } else {
        body.innerHTML = modalData[id].fr + "<hr>" + modalData[id].en + 
        `<button class="btn-quote" onclick="addItem('${modalData[id].item}')">CONFIRMER / CONFIRM</button>`;
    }
    document.getElementById('modal-overlay').style.display = 'flex';
}

function updateTempAddon(item) {
    const idx = tempAddons.indexOf(item);
    if (idx > -1) tempAddons.splice(idx, 1);
    else tempAddons.push(item);
}

function confirmAddons() {
    // Replace old addons in selection with the new confirmed tempAddons
    selection = selection.filter(i => !addons.some(a => `${a.fr} / ${a.en}` === i));
    selection.push(...tempAddons);
    updateCart();
    closeModal();
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

function addItem(item) {
    if (!selection.includes(item)) selection.push(item);
    updateCart();
    closeModal();
}

function updateCart() {
    const display = document.getElementById('cart-display');
    display.innerHTML = selection.length ? `<ul>${selection.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>Aucun service sélectionné / No services selected</p>';
}

function sendFinalEmail() {
    if (!selection.length) return alert("Sélectionnez un service!");
    const body = encodeURIComponent("Demande d'estimation pour :\n\n" + selection.join("\n") + "\n\nAdresse:");
    window.location.href = `mailto:mcsolutiongazon@gmail.com?subject=Estimation&body=${body}`;
}
