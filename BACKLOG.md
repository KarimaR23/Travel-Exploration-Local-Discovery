# 📋 Product Backlog

## Project Name
Travel-Exploration-Local-Discovery

## Team Members
- Member 1:Karima Dewdney
- Member 2:Keshawn Ross
- Member 3:Jarrett Gilbert

---

## 📖 Instructions

- Write all features as **user stories**
- Use the format:  
  **As a [user], I want to [action] so that [benefit]**
- Prioritize each item (High, Medium, Low)
- Assign ownership during sprint planning
- Update status as work progresses

---

## 🧩 Product Backlog

| ID | User Story                                                                      | Priority (H/M/L) | Assigned To     | Status (Not Started / In Progress / Done) |
|----|---------------------------------------------------------------------------------|------------------|-----------------|-------------------------------------------|
| 1  | As a user, I want to create an account so that I can save and post gems.        | High             | Karima Dewdney  | In progress                               |
| 2  | As a user, I want to log in so that I can acccess my account.                   | High             | Keshawn Ross    | In progress                               |
| 3  | As a user, I want to add a new gem so that I can share a hidden location.       | Medium           | Karima Dewdney  | In progress                               |
| 4  | As a user, I want to view all gems so that I can discover new places.           | Medium           | Jarrett Gilbert | In progress                               |
| 5  | As a user, I want to filter gems so that I can find what im interested in.      | Medium           | Karima Dewdney  | In progress                               |
| 6  | As a user, I want to upvote a gem so that I can show it is a good spot.         | Low              | Jarret Gilbert  | In progress                               |
| 7  | As a user, I want to view details of a gem so that I can learn more about it.   | Low              | Keshawn Ross    | In progress                               |
| 8  | As a user, I want to edit or delete my gem so that I can update my posts.       | Medium           | Jarrett Gilbert | In progress                               |
| 9  | As a user, I want to see gems on a map so that I can find locations near me.    | Low              | Karima Dewdney  | In progress                               |
| 10 | As a user, I want to save favortite gems so that I can come back to them later. | Low              | Keshawn Ross    | In progress                               |

---

## 🚀 Sprint 1 Plan (1 Week)

### Sprint Goal
Establish the core backend foundation by implementing the User, Gem, and Category models, repository interfaces, and service-layer logic to support future database integration.
---

### Selected User Stories

| ID | User Story                                                                                 | Assigned To     | Status      |
|----|--------------------------------------------------------------------------------------------|-----------------|-------------|
| 1  | As a user, I want to create an account so that I can save and post gems.                   | Karima Dewdney  | In progess  |
| 3  | As a user, I want to add a new gem so that I can share a hidden location.                  | Keshawn Ross    | In progress |
| 4  | As a user, I want to view all gems so that I can discover new places.                      | Jarrett Gilbert | In progress |
| 5  | As a user, I want to filter gems by category so that I can find what I'm interested in.    | Jarrett Gilbert | In progress |
| 8  | As a user, I want to edit or delete my gem so that I can update my posts.                  | Keshawn Ross    | In progress |

---

## 🧠 Notes / Decisions

- Key design decisions:
  - We are implementing a One-to-Many relationship where one User can create many Gems. 
  - The system uses a Category entity instead of "Upvotes" to power the Discovery Module's filtering capabilities.
- Assumptions:
  - The backend will store geolocation data as Double values because of latitude and longitude to support future map integration.
- Risks / Challenges:
  - Ensuring the package structure remains consistent across team commits to avoid path errors in Git.

---

## 🔄 Sprint Retrospective (Complete After Sprint)

### What went well?
- Backend Architecture: We successfully translated our project proposal into a Spring Boot structure, establishing the core User, Gem, and Category models. 
- Package Organization: The project is now logically organized into distinct controller, service, repository, and model packages, matching professional standards. 
- Collaborative Planning: The team effectively defined 10 user stories and prioritized the backlog to focus on the most critical MVP features.

### What could be improved?
- Version Control Management: Significant time was lost troubleshooting Git path and directory nesting errors. We need to be more careful with folder movements within the IDE. 
- Design Consistency: We initially had conflicting ideas about the "Upvote" vs. "Category" logic, which required us to refactor our models mid-sprint.

### What will we change next sprint?
- Branch Strategy: We will implement a stricter "pull-before-push" rule and use feature branches to avoid overwriting each other's work or causing rejected push errors. 
- Earlier Integration: We will begin the database configuration PostgreSQL at the start of the next sprint to ensure we have ample time to troubleshoot connectivity and persistence logic.

---

## 🤖 AI Usage (Brief Summary)

- Tool(s) used:Gemini AI
- Purpose:
  - Generating initial model structures. 
  - Suggesting service-layer methods. 
  - Debugging package and directory structure errors.
- How output was modified or validated:
  - validated

(Full AI log should be submitted separately if required)

---
