(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const dialog = document.getElementById("loginDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogClose = document.getElementById("dialogClose");
  const demoLoginForm = document.getElementById("demoLoginForm");
  const dialogMessage = document.getElementById("dialogMessage");
  const roleNames = {
    administrator: "Administrator sign in",
    teacher: "Teacher sign in",
    student: "Student sign in",
    parent: "Parent / Guardian sign in"
  };

  document.getElementById("year").textContent = new Date().getFullYear();

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  document.querySelectorAll("[data-role]").forEach(card => {
    card.addEventListener("click", () => {
      const role = card.dataset.role;
      dialogTitle.textContent = roleNames[role] || "Portal sign in";
      dialogMessage.textContent = "";
      demoLoginForm.reset();
      if (typeof dialog.showModal === "function") dialog.showModal();
      else alert("This browser does not support the demo sign-in dialog.");
    });
  });

  dialogClose.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  demoLoginForm.addEventListener("submit", event => {
    event.preventDefault();
    // Deliberately does not send or store credentials. Real authentication is a later phase.
    demoLoginForm.reset();
    dialogMessage.textContent = "Demo only: sign-in is not connected yet. No username or password was saved. Firebase authentication will be added in Phase 2.";
  });
})();
