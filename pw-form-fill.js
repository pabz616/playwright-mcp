const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://practice-automation.com/form-fields/", {
    waitUntil: "domcontentloaded",
  });

  // Fill the requested form fields without submitting
  await page.fill("#name-input", "John Doe");
  await page.fill('input[type="password"]', "password123");
  await page.check("#drink3");
  await page.check("#color2");
  await page.selectOption("#automation", "yes");
  await page.fill("#email", "john.doe@example.com");
  await page.fill(
    "#message",
    "Hello, this is a test message for the form filling automation.",
  );

  // Confirm the values were set, but do not submit the form.
  const finalValues = await page.evaluate(() => ({
    name: document.querySelector("#name-input")?.value,
    password: document.querySelector('input[type="password"]')?.value,
    drink: document.querySelector("#drink3")?.checked,
    color: document.querySelector("#color2")?.checked,
    automation: document.querySelector("#automation")?.value,
    email: document.querySelector("#email")?.value,
    message: document.querySelector("#message")?.value,
  }));

  console.log("Form fields filled successfully:", finalValues);
  await browser.close();
})();
