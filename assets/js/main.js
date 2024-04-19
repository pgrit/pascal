function deobfuscateMail() {
    let mails = document.getElementsByClassName("obfuscated-mail");

    for (let i = 0; i < mails.length; ++i) {
        const m = mails[i];
        let mail64 = m.getAttribute("href");
        let mailStr = atob(mail64);
        m.setAttribute("href", `mailto:${mailStr}`);
        m.innerHTML = mailStr;
    }
}
window.addEventListener("load", deobfuscateMail);

function addCollapseLogic() {
    const btns = document.getElementsByClassName("collapse-btn");

    function updateCollapsible(btn, content) {
        const expandChar = "+";
        const collapseChar = "−";
        content.style.display = btn.classList.contains("active") ? "block" : "none";

        let text = btn.innerText;
        if (text.startsWith(expandChar) || text.startsWith(collapseChar))
            text = text.substring(1);

        btn.innerText = `${btn.classList.contains("active") ? collapseChar : expandChar} ${text}`;
    }

    for (let i = 0; i < btns.length; ++i) {
        btns[i].addEventListener("click", function() {
            this.classList.toggle("active");
            updateCollapsible(this, this.parentElement.parentElement.getElementsByClassName("collapse-content")[0]);
        });
        updateCollapsible(btns[i], btns[i].parentElement.parentElement.getElementsByClassName("collapse-content")[0])
    }
}
window.addEventListener("load", addCollapseLogic);

function storeScrollPos() {
    let main = document.getElementsByTagName("main")[0];
    localStorage.setItem("scrollPosition", main.scrollTop);
    console.log(main.scrollTop());
}
window.addEventListener("beforeunload", storeScrollPos);

function restoreScrollPos() {
    if(localStorage.scrollPosition) {
        let main = document.getElementsByTagName("main")[0];
        main.scrollTop = localStorage.getItem("scrollPosition");
    }
}
window.addEventListener("load", restoreScrollPos);