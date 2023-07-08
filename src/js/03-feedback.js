import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const saveFormStateThrottled = throttle(function () {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

function fillFormFields() {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState !== null) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email || '';
    messageTextarea.value = formState.message || '';
  } else {
    emailInput.value = '';
    messageTextarea.value = '';
  }
}

window.addEventListener('DOMContentLoaded', fillFormFields);

emailInput.addEventListener('input', saveFormStateThrottled);
messageTextarea.addEventListener('input', saveFormStateThrottled);

feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      email: emailInput.value,
      message: messageTextarea.value
    };

    localStorage.removeItem('feedback-form-state');

    emailInput.value = '';
    messageTextarea.value = '';

    console.log(formData);
  });
  
