function generateMemberId() {
  const date = new Date();
  const year = date.getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `NEX-${year}-${randomSuffix}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const memberIdInput = document.getElementById('memberId');
  const resetButton = document.getElementById('resetFormBtn');
  const form = document.querySelector('form');

  if (memberIdInput) {
    memberIdInput.value = generateMemberId();
  }

  if (resetButton && form) {
    resetButton.addEventListener('click', () => {
      form.reset();
      if (memberIdInput) {
        memberIdInput.value = generateMemberId();
      }
    });
  }
});
