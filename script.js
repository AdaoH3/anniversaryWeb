// Set your anniversary date here (UTC format for consistency)
const anniversaryDate = new Date('2025-05-06T12:20:02Z');
let isClockMode = false;

function updateAnniversaryTimer() {
  const now = new Date();
  
  if (isClockMode) {
    // Show current time in 12-hour format with blinking colon
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const formattedHours = hours.toString().padStart(2, '0');
    
    // Create blinking colon (blinks every second)
    const colonClass = Math.floor(now.getTime() / 500) % 2 === 0 ? 'blink' : '';
    
    const clockText = `${formattedHours}:${minutes} ${ampm}`;
    document.getElementById('anniversary-timer').innerHTML = 
      `${formattedHours}<span class="${colonClass}">:</span>${minutes} ${ampm}`;
    document.getElementById('timer-labels').textContent = "";
    
    // Move timer down slightly in clock mode
    document.getElementById('anniversary-timer').style.marginTop = "20px";
  } else {
    // Show anniversary timer
    let diffMs = now - anniversaryDate;

    if (diffMs < 0) {
      document.getElementById('anniversary-timer').textContent = "Not started yet.";
      return;
    }

    // Calculate days, hours, minutes, and seconds from anniversary start
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    // Format with zero padding
    const formattedDays = days.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    const timerText = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    document.getElementById('anniversary-timer').textContent = timerText;
    document.getElementById('timer-labels').textContent = "Days:Hours:Minutes:Seconds";
    
    // Reset timer position for anniversary mode
    document.getElementById('anniversary-timer').style.marginTop = "0";
  }
}

// Toggle mode event listener
document.getElementById('toggle-mode').addEventListener('change', function() {
  isClockMode = this.checked;
  updateAnniversaryTimer(); // Update immediately when toggled
});

// Initial call
updateAnniversaryTimer();

// Update every 500ms for smooth blinking colon in clock mode
setInterval(updateAnniversaryTimer, 500);
