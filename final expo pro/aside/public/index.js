// index.js

// Sticky header effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 80);
});

// Firebase Auth Check (for later use)
window.addEventListener('DOMContentLoaded', () => {
  if (firebase && firebase.auth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("✅ User logged in:", user.email);
        // You can update the nav to show "Dashboard" or "Logout" here
      } else {
        console.log("ℹ️ No user is logged in.");
      }
    });
  }
});
