// BitLife Challenge Progress Tracker Logic

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.rule-check');
    const progressBar = document.getElementById('challengeProgress');
    const progressText = document.getElementById('progressPercentage');

    // Function to update the progress bar
    const updateProgress = () => {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.rule-check:checked').length;
        const percentage = Math.round((checked / total) * 100);

        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute('aria-valuenow', percentage);
        }
        
        if (progressText) {
            progressText.innerText = `${percentage}% Complete`;
        }

        // Save progress to LocalStorage so it persists on refresh
        const status = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem('bitlifeProgress', JSON.stringify(status));
    };

    // Load saved progress
    const savedStatus = JSON.parse(localStorage.getItem('bitlifeProgress'));
    if (savedStatus) {
        checkboxes.forEach((cb, index) => {
            cb.checked = savedStatus[index] || false;
        });
        updateProgress();
    }

    // Add event listeners to all checkboxes
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateProgress);
    });
});
