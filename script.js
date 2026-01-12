let selection = [];

const modalData = {
    'small-lot': {
        fr: `<h3>Petit terrain (65$)</h3>
             <ul><li>Tonte, coupe-bordure, soufflage des rognures</li><li>Bordure une fois par mois</li></ul>
             <p><strong>Détails :</strong> Plus taxes. Par visite.</p>
             <button class="btn-quote" onclick="addItem('Petit terrain (65$)')">Ajouter / Add</button>`,
        en: `<h3>Small Lot ($65)</h3>
             <ul><li>Mowing, trimming, blowing clippings</li><li>Once a month edging</li></ul>
             <p><strong>Details:</strong> Plus taxes. Per visit.</p>
             <button class="btn-quote" onclick="addItem('Small Lot ($65)')">Add</button>`
    },
    'custom-quote': {
        fr: `<h3>Terrain Standard</h3>
             <ul><li>Tonte, coupe-bordure, soufflage des rognures</li><li>Bordure une fois par mois</li></ul>
             <p>Veuillez envoyer votre adresse et la taille de votre terrain à <strong>mcsolutiongazon@gmail.com</strong> pour une estimation.</p>
             <button class="btn-quote" onclick="addItem('Estimation: Terrain Standard')">Ajouter / Add</button>`,
        en: `<h3>Standard Lot</h3>
             <ul><li>Mowing, trimming, blowing clippings</li><li>Once a month edging</li></ul>
             <p>Please email your address and lawn size to <strong>mcsolutiongazon@gmail.com</strong> for an estimate.</p>
             <button class="btn-quote" onclick="addItem('Estimate: Standard Lot')">Add</button>`
    }
};

const addons = [
    { fr: "Nettoyage printanier", en: "Spring cleanup" },
    { fr: "Aération et déchaumage", en: "Aeration and dethatching" },
    { fr: "Contrôle des mauvaises herbes", en: "Weed control" },
    { fr: "Fertilisation écologique", en: "Eco-friendly fertilization" },
    { fr: "Nettoyage des dommages hivernaux", en: "Winter damage repair" },
    { fr: "Traitements vers blancs & punaises", en: "White grub & chinch bug treatment" },
    { fr: "Pose de gazon en rouleaux", en: "Sod installation" }
];

function openModal(id) {
    const body = document.getElementById('modal-body');
    if (id === 'addons-modal') {
        let html = '<h3>Services Additionnels / Add-ons</h3>';
        addons.forEach((a, i) => {
            const label = `${a.fr} / ${a.en}`;
            const checked = selection.includes(label) ? 'checked' : '';
            html += `<div class="addon-row"><input type="checkbox" id="a${i}" ${checked} onchange="toggleAddon('${label}')"> <label for="a${i}">${label}</label></div>`;
        });
        body.innerHTML = html;
    } else {
        body.innerHTML = modalData[id].fr + "<hr>" + modalData[id].en;
    }
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

function addItem(item) {
    if (!selection.includes(item)) selection.push(item);
    updateCart();
    closeModal();
}

function toggleAddon(item) {
    const idx = selection.indexOf(item);
    if (idx > -1) selection.splice(idx, 1);
    else selection.push(item);
    updateCart();
}

function updateCart() {
    const display = document.getElementById('cart-display');
    display.innerHTML = selection.length ? `<ul>${selection.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>Aucun service sélectionné / No services selected</p>';
}

function sendFinalEmail() {
    if (!selection.length) return alert("Sélectionnez un service!");
    const body = encodeURIComponent("Demande d'estimation pour :\n\n" + selection.join("\n") + "\n\nAdresse:");
    window.location.href = `mailto:mcsolutiongazon@gmail.com?subject=Estimation MC Solution&body=${body}`;
}
