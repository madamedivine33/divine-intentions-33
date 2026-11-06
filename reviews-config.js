/* Soul Tribe Reviews — connection settings.
   After you deploy your review Google Apps Script as a web app, paste its URL
   (it ends in /exec) between the quotes below. Until then the review form
   stays closed and tells visitors reviews are opening soon, so nothing is lost.

   turnstileSiteKey is optional extra spam protection from Cloudflare Turnstile
   (free). Leave it empty if you are not using it. */
window.DI_REVIEWS_CONFIG = {
  endpoint: 'https://script.google.com/macros/s/AKfycbwiRVvleRAjf1r4TfoaPHmxC9w3MC63WoVIolgu9HfwpyOxD1xfGsNf0-Ug1SXudc83ew/exec',
  turnstileSiteKey: ''
};
