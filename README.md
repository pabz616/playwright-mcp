# playwright-mcp

MCP + Playwright

## OBJECTIVE

Leverage Playwright's MCP to streamline automation workflows.
src. `https://github.com/microsoft/playwright-mcp`
installing server from VSCODE CLI - 
`code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}`

# GOALS

✅ Comprehensive form testing across distinct scenarios (F.U.R.P.S +)
✅ WCAG 2.2 accessibility compliance analysis
✅ Professional reports in both Markdown and JSON formats
✅ Clear recommendations for improvements

### DIRECTIONS

1. Create a local workspace, or use your project's working directory.
2. Visit the provided URL (src.) and clone the MCP work to your directory.
3. In the repo's READ ME, look for the spot to install server.
4. Click the button, `Install Server - VSCODE`.
5. When the pop-is displayed, click on the option to open VSCODE.
6. Choose the option to install. `Install in workspace` keeps it local, whereas `Install` is global.
7. Create a file called `mcp.json` then copy & paste the sample configuration from the README.
8. Start a new chat session, and enter a simple prompt to visit a page and take an action to confirm the settings. Be sure to select `allow in this session` so it doesn't prompt a step-by-step check.
9. Once all is good-to-go, proceed with all relevant testing activities.
10. Happy hunting!!

## TYPICAL QAE WORKFLOW

Let's consider the following tasks and what can be automated with PW:

1. During Planning:
   1. Get a complete & thorough understanding of the feature being worked on. Requirements must be as specific as possible if they are to be used for drafting a test plan.
   2. Once all details have been ironed out. draft the test plan, test strategy, etc.
   3. Map out test cases accordingly --> Create an instruction markdown file.
2. During Design:
   1. Study any wire frames or design comps for visual QA options.
   2. Conduct a cursory threat model (if applicable) or a "what happens if.." exercise. These will be come visual test scenarios.
3. During Development:
   1. Test cases should accurately address positive, negative cases; use, abuse, and misuse cases.
   2. Use AI to fleshout any gaps.
   3. Get the document reviewed before testing.
4. During Testing:
   1. Visit the site / section under test.
   2. Leverage AI to get all DOM elements.
   3. Leverage PW-MCP to automate tests.
   4. Leverage PW-MCP to generate a concise test report.

## EXPECTED QA DELIVERABLES

1. Test Plan 
2. Test Strategy
3. Test Cases (Manual QA)
4. Test Scripts (Autom. QA)
5. Test Report (with / without bugs)
   1. If bugs are found - Links to JIRA tickets
   2. If no bugs - recommendations


