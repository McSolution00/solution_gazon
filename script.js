let selection = [];

const modalData = {
    'small-lot': {
        fr: `<h3>Petit terrain (35$)</h3>
             <p>Inclus : Tonte, soufflage, finition des bordures et bordure (1x mois).</p>
             <p><strong>Détails :</strong> Plus taxes. Par visite.</p>
             <button class="btn-quote" onclick="addItem('Petit terrain (35$)')">Ajouter à ma liste</button>`,
        en: `<h3>Small Lot ($35)</h3>
             <p>Included: Mowing, trimming, blowing, and edging (1x month).</p>
             <p><strong>Details:</strong> Plus taxes. Per visit.</p>
             <button class="btn-quote" onclick="addItem('Small Lot ($35)')">Add to list</button>`
    },
    'custom-quote': {
        fr: `<h3>Terrain Standard</h3>
             <p>Inclus : Tonte, soufflage, finition des bordures et bordure (1x mois).</p>
             <p><strong>Estimation :</strong> Veuillez envoyer votre adresse et la taille du terrain à mcsolutiongazon@gmail.com.</p>
             <button class="btn-quote" onclick="addItem('Estimation: Terrain Standard')">Ajouter à ma liste</button>`,
        en: `<h3>Standard Lot</h3>
             <p>Included: Mowing, trimming, blowing, and edging (1x month).</p>
             <p><strong>Estimate:</strong> Please email your address and lawn size to mcsolutiongazon@gmail.com.</p>
             <button class="btn-quote" onclick="addItem('Estimate: Standard Lot')">Add to list</button>`
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
        let html = '<h4>Choisir Add-ons</h4>';
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
    display.innerHTML = selection.length ? `<ul>${selection.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>Aucun service sélectionné</p>';
}

function sendFinalEmail() {
    if (!selection.length) return alert("Sélectionnez un service!");
    const body = encodeURIComponent("Demande d'estimation pour :\n\n" + selection.join("\n") + "\n\nAdresse:");
    window.location.href = `mailto:glscape1@hotmail.com?subject=Estimation MC Solution&body=${body}`;
}
