// Set your anniversary date here (UTC format for consistency)
const anniversaryDate = new Date('2025-04-06T12:20:02Z');

function updateAnniversaryTimer() {
  const now = new Date();
  let diffMs = now - anniversaryDate;

  if (diffMs < 0) {
    document.getElementById('anniversary-timer').textContent = "Not started yet.";
    return;
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Calculate days, hours, and minutes from anniversary start
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format with zero padding
  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const timerText = `${formattedDays}:${formattedHours}:${formattedMinutes}`;
  document.getElementById('anniversary-timer').textContent = timerText;
}

// Initial call
updateAnniversaryTimer();

// Update every 30 seconds
setInterval(updateAnniversaryTimer, 30000);
