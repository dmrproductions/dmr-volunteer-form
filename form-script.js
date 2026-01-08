// Connected Google Apps Script endpoint
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwLrW-ykDMsjugaT3B7NqIBS-ohm3zmaDDmRmCyQIhWAiS7dZq_FUdATNz5JxUEVJ72/exec";

// Limit selections to three
document.querySelectorAll('input[name="position"]').forEach(box => {
  box.addEventListener('change', () => {
    const checked = document.querySelectorAll('input[name="position"]:checked');
    if (checked.length > 3) {
      alert('You can select up to three positions only.');
      box.checked = false;
    }
  });
});

// Handle form submit
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const selectedEvents = Array.from(
    document.querySelectorAll('input[name="event"]:checked')
  ).map(c => c.value).join('; ');

  if (!selectedEvents) {
    alert('Please select at least one event date.');
    return;
  }

  const selectedPositions = Array.from(
    document.querySelectorAll('input[name="position"]:checked')
  ).map(c => c.value).join(', ');

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    events: selectedEvents,
    availability:
      document.getElementById('availStart').value +
      ' - ' +
      document.getElementById('availEnd').value,
    positions: selectedPositions,
    notes: document.getElementById('notes').value
  };

  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    alert(
      '✅ Thank you for signing up as a volunteer team member with DMR Productions for Fashion Week Sacramento in support of the L for Lupus Community Foundation. We appreciate your contribution and look forward to collaborating with you!'
    );
    this.reset();
  } catch (error) {
    alert('❌ There was an error submitting your form. Please check your connection or script URL.');
    console.error(error);
  }
});
