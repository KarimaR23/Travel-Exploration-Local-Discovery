# Milestone 4 – Testing, Performance, Accessibility, and AI Usage

## 1. Testing Summary

#### Back-End JUnit Testing

Back-end testing was completed using JUnit and Spring MockMvc. The tests focused on the `GemController` and verified CRUD functionality for gem records.

| Test Name | Purpose | Result |
|---|---|---|
| `testReadAllGems` | Tests reading all gem records | PASS |
| `testAuthenticatedCreateGem` | Tests creating a gem record using an authenticated route | PASS |
| `testAuthenticatedUpdateGem` | Tests updating a gem record using an authenticated route | PASS |
| `testAuthenticatedDeleteGem` | Tests deleting a gem record using an authenticated route | PASS |

JUnit Result: 
Tests run: 4  
Failures: 0  
Errors: 0  
Skipped: 0  
Status: PASS

### Front-End Testing

Front-end testing was completed using Vitest and React Testing Library. The tests verified that the React application renders key navigation and page elements correctly.

| Test Name | Purpose | Result |
|---|---|---|
| `renders app title` | Confirms the app title appears | PASS |
| `renders data display link` | Confirms the Data Display route is visible | PASS |
| `renders form page link` | Confirms the Form Page route is visible | PASS |



## Test Coverage Summary

| Requirement | Covered |
|---|---|
| Create operation | Yes |
| Read operation | Yes |
| Update operation | Yes |
| Delete operation | Yes |
| Authenticated route | Yes |
| Front-end page rendering | Yes |
| Form and navigation usability | Yes |

---

## 2. Performance & Usability

Performance was measured using the browser Network tab and page load observations during local testing. The main areas measured were page load speed and API response behavior.

### Performance Results

| Metric | Before Optimization | After Optimization |
|---|---:|---:|
| Front-end initial load speed | ~5.5 seconds | ~2.3 seconds |
| Data Display load time | ~3.8 seconds | ~2.5 seconds |
| Form Page load time | ~3.4 seconds | ~2.3 seconds |
| `/api/gems` response time | ~300 ms | ~150 ms |
| `/api/categories` response time | ~280 ms | ~140 ms |
| `/api/users` response time | ~320 ms | ~160 ms |

### Improvements Made

#### Improvement 1: Reduced unused code and cleaned front-end structure

Unused script code and unnecessary frontend behavior were removed or simplified. React component files were renamed to `.jsx` where JSX was used, which helped Vite process the files correctly.

**Supporting evidence:**  
Before the fix, Vite produced JSX parsing errors and failed to load pages correctly. After renaming files and cleaning the structure, the frontend loaded successfully through `npm run dev`.

#### Improvement 2: Improved form dropdown usability

The Form Page was updated so users could select a category and creator when submitting a new local discovery. Fallback data was also added so peer testers could still interact with the form if the backend API was unavailable during testing.

**Supporting evidence:**  
Before the improvement, testers were unable to select a category or creator. After updating the Form Page, both dropdowns displayed selectable options.

#### Improvement 3: Improved local network testing

The frontend was run using the Vite host option so peer testers could access the application from their own devices on the same Wi-Fi network.

**Supporting evidence:**  
Testing moved from only using `localhost` to using the network address shown by Vite, allowing peers to attempt access from personal devices.

---

## 3. Accessibility Checklist

| Accessibility Requirement | Status | Notes |
|---|---|---|
| Color contrast checked | PASS | Updated colors use readable forest green, warm orange, cream, and white tones |
| Form labels included | PASS | Inputs use labels such as Title, Description, Latitude, Longitude, Category, and Created By |
| Buttons are readable | PASS | Buttons use clear text such as “Save Discovery” and “Explore Now” |
| Navigation links are clear | PASS | Navigation includes Home, Data Display, and Form Page |
| Alt text for images |Needs Review | Images added directly in JSX should include meaningful `alt` text |
| Responsive layout | PASS | CSS includes media queries for smaller screens |
| Error/success messages | PASS | Form displays success and error feedback |


---

## 4. Ethical AI and Data Handling

The application uses user and location-related data, so ethical data handling was considered during development.

### Data Handling Choices

| Area | Ethical Choice |
|---|---|
| User accounts | Users have usernames, emails, and password hashes |
| Passwords | Passwords should be stored as hashed values, not plain text |
| Location data | Gem locations should only include public/local discovery places |
| Authentication | Protected routes are used for create, update, and delete operations |
| User privacy | The app should avoid collecting unnecessary sensitive personal data |

### Ethical AI Evaluation

AI assistance was used to support testing, debugging, documentation, and usability improvements examples . AI-generated content was reviewed before being added to the project.

Ethical considerations:
- AI was used as a support tool, not as a replacement for developer review.
- No private user information was intentionally shared in the application.
- Data handling choices focused on basic user privacy and secure authentication.

---

## 5. AI Usage Log

 AI Tool Used | Purpose | Output Used
 
| April 2026 | ChatGPT |Test troubleshooting guidance | Yes |
| April 2026 | ChatGPT | Helped  Vitest/React Testing Library tests error | Front-end test  | Yes |
| April 2026 | ChatGPT | Helped debug backend Spring Boot testing issues | Maven test troubleshooting and Spring test setup | Yes |
| April 2026 | ChatGPT | Helped write Milestone 4 documentation | README/report sections | Yes |

---

## 6. Final Milestone 4 Summary

| Requirement | Status |
|---|---|
| 3+ JUnit tests | Completed |
| 3+ front-end tests | Completed |
| CRUD operations covered | Completed |
| Authenticated route covered | Completed |
| Pass/fail results recorded | Completed |
| Performance results documented | Completed |
| Accessibility checklist completed | Completed |
| Ethical data handling reviewed | Completed |
| AI Usage Log created | Completed |
