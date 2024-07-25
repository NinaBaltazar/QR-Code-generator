const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode'); // Corrigido para 'qrcode'

const colors = {
    'customPurple': '#8A85FF',
    'customLavender': '#E0D8FF',
    'customDarkPurple': '#17153B',
    'customDarkWhite': '#ffff'
};

const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value; // Corrigido para obter o valor de '#size'

    // Validate URL
    if (url === '') {
        alert('Please enter a URL');
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
             },50)
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode(qr, { // Corrigido para usar o elemento 'qr'
        text: url,
        width: size,
        height: size,
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) saveLink.remove();
};

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.style.backgroundColor = colors.customPurple;
    link.style.color = colors.customDarkWhite;
    link.style.fontWeight = 'bold';
    link.style.padding = '0.5rem 1rem';
    link.style.borderRadius = '0.25rem';
    link.style.width = '33%';
    link.style.margin = 'auto';
    link.style.marginTop = '1.25rem';
    link.style.marginBottom = '1.25rem';
    link.style.textAlign = 'center';
    link.style.display = 'block';
    
    link.href = saveUrl;
    link.download = 'qr-code';
    link.innerHTML = 'Save Image';
    link.addEventListener('mouseover', () => {
        link.style.backgroundColor = colors.customLavender;
        link.style.color = colors.customDarkWhite;
    });

    link.addEventListener('mouseout', () => {
        link.style.backgroundColor = colors.customPurple;
        link.style.color = colors.customDarkWhite;
    });

    document.getElementById('generated').appendChild(link);
};

// Remove hideSpinner() aqui para o spinner ser visível durante o carregamento

form.addEventListener('submit', onGenerateSubmit);
