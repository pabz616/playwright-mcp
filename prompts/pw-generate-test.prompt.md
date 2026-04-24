## OBJECTIVE

Generate a test script using Playwright's MCP to automate a simple user interaction on a web page.

## DIRECTIONS
1. Create a new file called `test-script.mcp.json` in your workspace.
2. Copy and paste the following configuration into the file:
```json
{
  "name": "playwright-test-script",
  "command": "npx",
  "args": ["@playwright/mcp@latest", "run", "test-script.mcp.json"]
}
```
3. Start a new chat session and enter the following prompt:
```Generate a Playwright test script that navigates to https://example.com, clicks on the "More information..." link, and verifies that the URL changes to https://www.iana.org/domains/example.```
4. Select the option to allow in this session when prompted.
5. Review the generated test script and make any necessary adjustments.
6. Run the test script using the command specified in the `test-script.mcp.json` file.
7. Verify that the test script executes successfully and that the expected URL change is confirmed.
8. Document the results of the test execution, including any issues encountered and recommendations for improvement.
9. Add additional scenarios for the script `test-script.mcp.json` covering negative scenarios, abuse cases, misuse cases, performance, reliability, security, accessibility, and UI
10. Happy testing!


## EXAMPLE
Here is an example of a generated test script for the specified user interaction:

The pw-form-fill.js script to include comprehensive testing scenarios for the form at https://practice-automation.com/form-fields/. The script now covers:

  - Positive Scenario: Valid data fill and submit (original functionality).
  - Negative Scenarios: Invalid email, empty required fields.
  - Abuse Cases: Very long inputs, special characters, and injection attempts.
  - Misuse Cases: Submitting without filling, multiple rapid submits.
  - Performance: Measuring time for fill and submit operations.
  - Reliability: Testing with retry logic on failures.
  - Security: XSS and SQL injection attempts.
  - Accessibility: Accessibility snapshot and label checks.
  
  WCAG 2.2 Criterion	Test
    1.1.1 Non-text Content (A)	Checks images for alt text
    1.3.1 Info & Relationships (A)	Validates label-to-input associations
    1.4.3 Color Contrast (AA)	Analyzes contrast ratios on form elements
    2.1.1 Keyboard (A)	Verifies keyboard navigation support
    2.4.3 Focus Order (A)	Confirms logical tab order
    2.4.7 Focus Visible (AA)	Checks for visible focus indicators
    3.3.1 Error Identification (A)	Detects error notification elements
    3.3.2 Labels/Instructions (A)	Counts labels and descriptions
    4.1.2 Name, Role, Value (A)	Validates accessible names on inputs
    4.1.3 Status Messages (AA)	Identifies ARIA live regions
    Accessibility Tree (A)	Captures DOM accessibility snapshot

  - UI: Screenshot capture and element visibility checks.

The script reloads the page between scenarios to reset the form state. It runs with a headed browser for visual inspection. To execute, run node pw-form-fill.js in the terminal. The script will log progress for each category and save a screenshot (form-ui.png) in the workspace directory.

*** NOTE: The actual implementation of the test script will depend on the specific requirements and structure of the web page being tested. The above example is a general outline and may need to be adjusted based on the actual elements and interactions present on the target page. Where applicable, follow QAE best practices for test automation, including clear naming conventions, modular code structure, and comprehensive logging for debugging purposes.