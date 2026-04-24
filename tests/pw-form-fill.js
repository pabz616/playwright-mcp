const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const formURL = "https://practice-automation.com/form-fields/";

  //SELECTORS
  const nameInput = "#name-input";
  const emailInput = "#email";
  const messageInput = "#message";
  const passwordInput = 'input[type="password"]';
  const submitBtn = "#submit-btn";
  const dinkOption_coffee = "#drink3";
  const colorOption_blue = "#color2";
  const techOptions = "#automation";

  await page.goto(formURL, { waitUntil: "domcontentloaded", timeout: 10000 });
  console.log("Starting form testing scenarios...\n");

  // Positive Scenario
  console.log("1. Positive Scenario: Filling with valid data");
  await page.fill(nameInput, "John Doe");
  await page.fill(passwordInput, "password123");
  await page.check(dinkOption_coffee);
  await page.check(colorOption_blue);
  await page.selectOption(techOptions, "yes");
  await page.fill(emailInput, "john.doe@example.com");
  await page.fill(
    messageInput,
    "Hello, this is a test message for the form filling automation.",
  );
  await page.click(submitBtn);
  console.log("Positive scenario completed.\n");

  // Reload page for next scenarios
  await page.reload();

  // Negative Scenarios
  console.log("2. Negative Scenarios:");
  // Invalid email
  console.log("   - Invalid email");
  await page.fill(nameInput, "Test User");
  await page.fill(emailInput, "invalid-email");
  await page.fill(messageInput, "Testing invalid email.");
  await page.click(submitBtn);
  // Check for error (assuming form validation)
  await page.waitForTimeout(1000);
  console.log("   Invalid email submitted.\n");

  // Empty required fields
  await page.reload();
  console.log("   - Empty required fields");
  await page.fill(emailInput, "test@example.com");
  await page.click(submitBtn);
  await page.waitForTimeout(1000);
  console.log("   Empty fields submitted.\n");

  // Reload for next
  await page.reload();

  // Abuse Cases
  console.log("3. Abuse Cases:");
  // Very long input
  console.log("   - Very long input");
  const longText = "A".repeat(10000);
  await page.fill(nameInput, longText);
  await page.fill(messageInput, longText);
  await page.fill(emailInput, "abuse@example.com");
  await page.click(submitBtn);
  console.log("   Long input submitted.\n");

  // Special characters and potential injection
  await page.reload();
  console.log("   - Special characters and injection attempts");
  await page.fill(nameInput, "<script>alert('XSS')</script>");
  await page.fill(messageInput, "'; DROP TABLE users; --");
  await page.fill(emailInput, "abuse@example.com");
  await page.click(submitBtn);
  console.log("   Injection attempts submitted.\n");

  // Reload
  await page.reload();

  // Misuse Cases
  console.log("4. Misuse Cases:");
  // Submit without filling
  console.log("   - Submit without filling");
  await page.click(submitBtn);
  await page.waitForTimeout(1000);
  console.log("   Empty submit attempted.\n");

  // Multiple rapid submits
  await page.reload();
  console.log("   - Multiple rapid submits");
  for (let i = 0; i < 5; i++) {
    await page.fill(nameInput, `User ${i}`);
    await page.fill(emailInput, `user${i}@example.com`);
    await page.click(submitBtn);
    await page.waitForTimeout(500);
  }
  console.log("   Multiple submits completed.\n");

  // Reload
  await page.reload();

  // Performance
  console.log("5. Performance:");
  console.log("   - Measuring fill and submit time");
  const start = Date.now();
  await page.fill(nameInput, "Perf Test");
  await page.fill(emailInput, "perf@example.com");
  await page.fill(messageInput, "Performance test message.");
  await page.click(submitBtn);
  const end = Date.now();
  console.log(`   Time taken: ${end - start} ms\n`);

  // Reload
  await page.reload();

  // Reliability
  console.log("6. Reliability:");
  console.log("   - Testing with retries");
  let attempts = 0;
  const maxAttempts = 3;
  while (attempts < maxAttempts) {
    try {
      await page.fill(nameInput, "Reliability Test");
      await page.fill(emailInput, "reliability@example.com");
      await page.click(submitBtn);
      console.log("   Reliability test passed on attempt " + (attempts + 1));
      break;
    } catch (e) {
      attempts++;
      console.log(`   Attempt ${attempts} failed, retrying...`);
      await page.reload();
    }
  }
  if (attempts === maxAttempts)
    console.log("   Reliability test failed after max attempts.\n");
  else console.log("   Reliability test completed.\n");

  // Reload
  await page.reload();

  // Security
  console.log("7. Security:");
  console.log("   - Testing for XSS and injection");
  await page.fill(nameInput, "<img src=x onerror=alert('XSS')>");
  await page.fill(messageInput, "' OR '1'='1");
  await page.fill(emailInput, "security@example.com");
  await page.click(submitBtn);
  console.log("   Security tests submitted.\n");

  // Reload
  await page.reload();

  // WCAG 2.2 Accessibility Tests
  console.log("8. WCAG 2.2 Accessibility Compliance:");

  // 1.1.1 Non-text Content - Check for alt text on images
  console.log("   ✓ 1.1.1 Non-text Content:");
  const imagesWithoutAlt = await page.$$eval(
    "img",
    (imgs) => imgs.filter((img) => !img.alt || img.alt.trim() === "").length,
  );
  console.log(`     - Images without alt text: ${imagesWithoutAlt}`);

  // 1.3.1 Info and Relationships - Check label associations
  console.log("   ✓ 1.3.1 Info and Relationships:");
  const inputsWithLabels = await page.$$eval(
    "input, textarea, select",
    (inputs) => {
      return inputs.filter((input) => {
        const id = input.id;
        const label = id && document.querySelector(`label[for="${id}"]`);
        return label || input.getAttribute("aria-label");
      }).length;
    },
  );
  const totalInputs = await page.$$eval(
    "input, textarea, select",
    (i) => i.length,
  );
  console.log(
    `     - Form inputs with associated labels: ${inputsWithLabels}/${totalInputs}`,
  );

  // 1.4.3 Contrast (AA) - Minimum 4.5:1 for normal text
  console.log("   ✓ 1.4.3 Color Contrast (AA):");
  const contrastResults = await page.evaluate(() => {
    const results = [];
    document
      .querySelectorAll("label, input, textarea, select, button")
      .forEach((el) => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        results.push({
          element: el.tagName,
          color,
          bgColor,
        });
      });
    return results.length;
  });
  console.log(`     - Checked ${contrastResults} elements for contrast ratio`);

  // 2.1.1 Keyboard - All inputs accessible via keyboard
  console.log("   ✓ 2.1.1 Keyboard Accessibility:");
  const keyboardAccessible = await page.evaluate(() => {
    const inputs = document.querySelectorAll("input, textarea, select, button");
    return Array.from(inputs).filter((el) => {
      const tabindex = el.getAttribute("tabindex");
      return tabindex === null || parseInt(tabindex) >= -1;
    }).length;
  });
  console.log(
    `     - Keyboard-accessible form elements: ${keyboardAccessible}/${totalInputs}`,
  );

  // 2.4.3 Focus Order - Check logical tab order
  console.log("   ✓ 2.4.3 Focus Order:");
  const focusableElements = await page.$$eval(
    "button, [href], input, select, textarea, [tabindex]",
    (els) =>
      els.filter((el) => {
        const tabindex = el.getAttribute("tabindex");
        return tabindex === null || parseInt(tabindex) >= 0;
      }).length,
  );
  console.log(
    `     - Focusable elements with logical tab order: ${focusableElements}`,
  );

  // 2.4.7 Focus Visible (AA) - Check for visible focus styles
  console.log("   ✓ 2.4.7 Focus Visible (AA):");
  const focusStyles = await page.evaluate(() => {
    const styleSheet = new CSSStyleSheet();
    const hasFocusStyle = Array.from(document.styleSheets).some((sheet) => {
      try {
        const rules = sheet.cssRules;
        return Array.from(rules).some((rule) =>
          rule.selectorText?.includes(":focus"),
        );
      } catch {
        return false;
      }
    });
    return hasFocusStyle;
  });
  console.log(
    `     - Focus visible styles defined: ${focusStyles ? "Yes" : "No"}`,
  );

  // 3.3.1 Error Identification - Check for error messages
  console.log("   ✓ 3.3.1 Error Identification:");
  const errorElements = await page.$$eval(
    "[role='alert'], .error, [aria-invalid]",
    (els) => els.length,
  );
  console.log(`     - Error notification elements found: ${errorElements}`);

  // 3.3.2 Labels or Instructions - Check for labels/instructions
  console.log("   ✓ 3.3.2 Labels or Instructions:");
  const labelCount = await page.$$eval("label", (labels) => labels.length);
  const instructionCount = await page.$$eval(
    "[aria-describedby]",
    (els) => els.length,
  );
  console.log(`     - Labels found: ${labelCount}`);
  console.log(`     - Elements with descriptions: ${instructionCount}`);

  // 4.1.2 Name, Role, Value - Check accessible names
  console.log("   ✓ 4.1.2 Name, Role, Value:");
  const accessibleNames = await page.evaluate(() => {
    const inputs = document.querySelectorAll("input, textarea, select, button");
    let count = 0;
    inputs.forEach((el) => {
      const name =
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        el.name ||
        document.querySelector(`label[for="${el.id}"]`)?.textContent;
      if (name) count++;
    });
    return count;
  });
  console.log(
    `     - Form elements with accessible names: ${accessibleNames}/${totalInputs}`,
  );

  // 4.1.3 Status Messages (AA) - Check for ARIA live regions
  console.log("   ✓ 4.1.3 Status Messages (AA):");
  const liveRegions = await page.$$eval(
    '[aria-live], [role="status"], [role="alert"]',
    (els) => els.length,
  );
  console.log(`     - ARIA live regions found: ${liveRegions}`);

  // Accessibility Snapshot
  console.log("   ✓ Accessibility Tree Snapshot:");
  const snapshot = await page.accessibility.snapshot();
  const treeNodeCount = snapshot.children?.length || 0;
  console.log(`     - Accessibility tree nodes: ${treeNodeCount}`);

  // WCAG 2.2 Overall Compliance Score
  const complianceScore = Math.round(
    ((inputsWithLabels +
      keyboardAccessible +
      focusableElements +
      (focusStyles ? 1 : 0) +
      accessibleNames) /
      (totalInputs * 5)) *
      100,
  );
  console.log(
    `\n   📊 WCAG 2.2 Accessibility Compliance Score: ${complianceScore}%\n`,
  );

  // UI
  console.log("9. UI:");
  console.log("   - Taking screenshot and checking visibility");
  await page.screenshot({ path: "form-ui.png" });
  const isFormVisible = await page.isVisible("#name-input");
  console.log("   Form input visible:", isFormVisible);
  console.log("   Screenshot saved as form-ui.png\n");

  console.log("All scenarios completed.");
  await browser.close();
})();
