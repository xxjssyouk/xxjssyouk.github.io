document.addEventListener('DOMContentLoaded', () => {
    
    const ob = new IntersectionObserver((entris) => {
        entris.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target
                img.src = img.dataset.src;
                ob.unobserve(img);
            }
        });
    },
    {
        rootMargin: '0px 0px 500px 0px',
    });

    const imgs = document.querySelectorAll('img[data-src]');
    imgs.forEach(img => {
        ob.observe(img);
    });

});
