document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profile-form');
  const profileData = JSON.parse(localStorage.getItem('farmerProfile')) || {};

  // Pre-fill the form
  form.farmerName.value = profileData.farmerName || '';
  form.farmName.value = profileData.farmName || '';
  form.location.value = profileData.location || '';
  form.contact.value = profileData.contact || '';
  form.email.value = profileData.email || '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedProfile = {
      farmerName: form.farmerName.value,
      farmName: form.farmName.value,
      location: form.location.value,
      contact: form.contact.value,
      email: form.email.value
    };

    localStorage.setItem('farmerProfile', JSON.stringify(updatedProfile));
    alert('Profile updated successfully!');
  });
});
