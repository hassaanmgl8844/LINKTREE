// Data for links
const linksData = [
    {
        name: "Portfolio",
        icon: "fa-solid fa-laptop-code",
        url: "https://hassaammgl.vercel.app/", 
        type: "link"
    },
    {
        name: "GitHub",
        icon: "fa-brands fa-github",
        url: "https://github.com/hassaammgl",
        type: "link"
    },
    {
        name: "LinkedIn",
        icon: "fa-brands fa-linkedin",
        url: "https://www.linkedin.com/in/m-hassaam-mehtab-91668a256/", 
        type: "link"
    },
    {
        name: "Upwork",
        icon: "fa-brands fa-upwork", 
        url: "https://www.upwork.com/freelancers/~01984a29dcc68bc2db",
        type: "link"
    },
    {
        name: "Fiverr",
        // Using custom SVG from Simple Icons (Official)
        customIcon: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 1.25em; height: 1.25em; fill: currentColor;"><title>Fiverr</title><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"/></svg>',
        url: "https://www.fiverr.com/hassaam_mgl?public_mode=true",
        type: "link"
    },
    {
        name: "X (Twitter)",
        icon: "fa-brands fa-x-twitter",
        url: "https://x.com/hassaammgl",
        type: "link"
    },
    {
        name: "YouTube",
        icon: "fa-brands fa-youtube",
        url: "https://youtube.com/@coderglitchx03?si=a8_TxbeONttITmfR",
        type: "link"
    },
    {
        name: "Instagram",
        icon: "fa-brands fa-instagram",
        url: "https://instagram.com/hassaammgl",
        type: "link"
    },
    {
        name: "Business Email",
        icon: "fa-solid fa-envelope",
        url: "mailto:contact@hassaammgl.com",
        label: "contact@hassaammgl.com",
        type: "email"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderLinks();
    updateYear();
});

function renderLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';

    linksData.forEach((link, index) => {
        const card = document.createElement('div');
        card.className = 'link-card';
        card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

        // Icon Handling
        let iconHtml;
        if (link.customIcon) {
            iconHtml = link.customIcon;
        } else {
            iconHtml = `<i class="${link.icon}"></i>`;
        }

        card.innerHTML = `
            <div class="card-left">
                <div class="icon-wrapper">
                    ${iconHtml}
                </div>
            </div>
            <div class="card-center">
                <span class="link-name">${link.name}</span>
            </div>
            <div class="card-right">
                <button class="options-btn" aria-label="Copy link options">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
            
            <!-- Clickable Area Overlay to avoid interfering with buttons -->
            <a href="${link.url}" class="card-link-overlay" ${link.type === 'link' ? 'target="_blank" rel="noopener noreferrer"' : ''}></a>
        `;

        // Add event listener for the options button (Copy functionality)
        const optionsBtn = card.querySelector('.options-btn');
        optionsBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link click
            e.stopPropagation(); // Stop bubbling
            copyToClipboard(link.type === 'email' ? link.label : link.url);
        });

        container.appendChild(card);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers or if context is restricted
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied manually: ${text}`);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function updateYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}
