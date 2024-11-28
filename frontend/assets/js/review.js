let currentRating = 0;

const rate = (rating) => {
    currentRating = rating;
    document.getElementById('rating-value').textContent = currentRating;
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
};

// Handle review submission (optional)
document.querySelector('button').addEventListener('click', () => {
    const reviewText = document.getElementById('review-text').value;
    if (currentRating > 0 && reviewText) {
        alert(`Review submitted: Rating - ${currentRating}, Review - ${reviewText}`);
    } else {
        alert('Please provide a rating and a review!');
    }
});
