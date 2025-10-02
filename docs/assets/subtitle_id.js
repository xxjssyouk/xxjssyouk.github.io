document.addEventListener("DOMContentLoaded", function() {
    const subtitles = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    
    subtitles.forEach(subtitle => {
        const classname = subtitle.getAttribute('class');
        if (classname != 'postTitle') {
            const text = subtitle.textContent;
            subtitle.setAttribute('id',text);
        }
    });
});
