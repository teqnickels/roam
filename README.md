# Roam
 A travel community, code-named Roam for now, for users to share tips about their favorite locations around the world.

__INSTRUCTIONS__
__NOTE:__ If you have a database entitled `roam` on your system, it will be deleted by this setup. 

- `npm run setup`
- Set up a `.env` file at the top level, following `.env.template`
- `npm run start` or `npm run start:dev`

## Description

You have been commissioned to build a travel community, code-named Roam for now, for users to share tips about their favorite locations around the world.

The client has provided basic wireframes and user stories (broken into sprints). In some cases, these requirements may be vague or incomplete.

## Context

This goal will give you experience building an app from a set of client needs. The goal is to gain experience working on a development project in a group while navigating a client's feature list.

Choose this goal if you’ve already build full-stack JavaScript apps or are interested in leveling-up your skills. Roam requires that you implement authentication- not a trivial task! This will be an immersive, intensive, and highly structured study.

## Recommended Pace

The client contract consists of three core sprints and four bonus sprints. Each sprint contains a set of user stories.

You will work in a group of 2, and we expect you to pair program for the majority of the time you're writing code.

During morning standups and in smaller check-ins throughout the day, clearly communicate your current status and next steps to your teammates. Consider using a kanban-style scrum board such as GitHub Projects or Trello to organize tasks.

Commit changes at least once for each user story. Consider creating automated tests or even implementing TDD for any complex application behavior.

Put effort into your design. Use a CSS framework (e.g. Bootstrap) and some custom CSS or Sass/Less.

Work as git collaborators, build on feature branches, and submit pull requests for approval and merging.

After each sprint, deploy to heroku to get practice getting the app online. The earlier you resolve deployment, the easier it will be on each updated version.

Refactor your code after each sprint, considering:

Indentation
Readability/clarity
Naming
Organization
Commenting
DRYness
Wireframes

wireframes

Specifications

## Sprint 1: Basic Auth & Profiles

__A user should be able to:__

- [x] Navigate to "/" and see a basic splash page.
- [x] See the name of the website on the splash page.
- [x] See links to "Log In" and "Sign Up" on the splash page.
- [x] Sign up for an account.
- [x] Log in to their account if they already have one.
- [x] Be redirected to their public profile page after logging in.
- [x] On their public profile page, see their name, the current city they have set in their profile, and their join date.
- [x] See the site-wide header on every page.
- [x] See a link to "Log Out" if they're logged in in the site-wide header.
- [x] See links to "Log In" and "Sign Up" if they're logged out in the site-wide header.
- [x] Update their profile by making changes to their name and/or current city.
- [x] See the titles of all the posts they've contributed (start with pre-seeded data).
- [x] Click on the title of one of their posts and be redirected to a "show" page for that post.
- [x] View post "show" pages with title, author, and content.

## Stretch

__A user should be able to:__

- [ ] See a "default" profile photo on their profile page before adding their own photo.
- [ ] Update their profile photo (consider using Uploadcare).
- [ ] See their profile photo next to their posts.
- [ ] Receive a welcome email after creating an account.
- [ ] Sprint 2: Travel Tip CRUD

__A user should be able to:__

- [ ] Put at least 2 cities data in your database (make sure to include Oakland!)
- [ ] View the "Oakland" city page (at "/cities/1").
- [ ] See the site-wide header on the city page.
- [ ] See the name of the city on the city page.
- [ ] See an iconic photo of the city on the city page.
- [ ] View a list of posts on the Oakland page.
- [ ] See posts on city page sorted by newest first.
- [ ] Click on post titles to go to the individual post "show" pages.
- [ ] Use an "Add New Post" button on the Oakland city page to pull up the new post form.
- [ ] Create a new post for Oakland
- [ ] Click "Edit" on ANY individual post, and be redirected to the edit form.
- [ ] Click "delete" on ANY individual post.
- [ ] See a pop-up that says: "Are you sure you want to delete {{title}}?" when clicking "delete"
- [ ] Have the post deleted when confirming the pop-up.

## Stretch

__A user should be able to:__

- [ ] Visit city pages via pretty urls, like "/cities/san-francisco".
- [ ] Visit user profile pages via pretty urls, like "/users/james".
- [ ] See post content truncated to 1000 characters max, with a link to view more on a city's page.
- [ ] See a relative published date, e.g. "2 days ago" on a city's page.

## Sprint 2: Travel Tip CRUD
__A user should be able to:__
- [ ] Put at least 2 cities data in your database (make sure to include Oakland!)
- [ ] View the "Oakland" city page (at "/cities/1").
- [ ] See the site-wide header on the city page.
- [ ] See the name of the city on the city page.
- [ ] See an iconic photo of the city on the city page.
- [ ] View a list of posts on the Oakland page.
- [ ] See posts on city page sorted by newest first.
- [ ] Click on post titles to go to the individual post "show" pages.
- [ ] Use an "Add New Post" button on the Oakland city page to pull up the new post form.
- [ ] Create a new post for Oakland
- [ ] Click "Edit" on ANY individual post, and be redirected to the edit form.
- [ ] Click "delete" on ANY individual post.
- [ ] See a pop-up that says: "Are you sure you want to delete ?" when clicking "delete"
- [ ] Have the post deleted when confirming the pop-up.

__Stretch__
A user should be able to:
Visit city pages via pretty urls, like "/cities/san-francisco".
Visit user profile pages via pretty urls, like "/users/james".
See post content truncated to 1000 characters max, with a link to view more on a city's page.
See a relative published date, e.g. "2 days ago" on a city's page.

## Sprint 3: Validations & Authorization

__A user should be able to:__

- [ ] View city pages for "London" and "Gibraltar".
- [ ] Verify that a new post they create is successfully published on the correct city page.
- [ ] A user CANNOT save invalid data to the database, according to the following rules:

- [ ] A user CANNOT sign up with an email (or username) that is already in use.
- [ ] A post's title must be between 1 and 200 characters.
- [ ] A post's content must not be empty.
- [ ] A user is authorized to perform certain actions on the site, according to the following rules:

- [ ] A user MUST be logged in to create/update/destroy resources.
- [ ] A user may only edit their own profile and edit/delete their own posts.

## Stretch

__A user should be able to:__

- [ ] View an error message when form validations fail, for the following validations:
- [ ] Title must be between 1 and 200 characters.
- [ ] Content must not be empty.
- [ ] View only the 10 most recent posts on a city page (pagination).
- [ ] View a link/button to the "Next" 10 on the city page (pagination).
- [ ] View a link/button to the "Previous" 10 on the city page (pagination).
- [ ] See a list of the city pages they've contributed to, on their public profile
- [ ] See the number of posts they've written for each city, next to the city's name in their profile.
- [ ] View all vagabond cities as markers/pins on a map on the site's homepage.
- [ ] Click on a pin on the homepage map and be redirected to the corresponding city page.

## Sprint 4: Commenting

## Stretch

__A user should be able to:__

- [ ] Comment on individual posts.
- [ ] See the number of comments a post has on the post's "show" page.
- [ ] See the number of comments they've left, on their public profile.
- [ ] Only add a comment when logged in.
- [ ] Only edit/delete their own comments.

## Resources

Use these resources to fill in the gaps in your skills and knowledge as you find them. There is more here than you can do in a week, so focus on the areas that are in your zone of proximal development (ZPD).

Passport Example apps

Passport Express Example: Note that there is no real DB here, data lives only on the server
Passport Express, Twitter login
Tools

[Express.js][express]: "Fast, unopinionated, minimalist web framework for Node.js"
Passport: "Simple, unobtrusive authentication for Node.js"
Guides

The official [Express.js Guide][express-guide] #express #nodejs
MDN: Introduction to the DOM #html #dom #js
MDN: Guide to Event Handlers #dom #js
Courses

Treehouse: Express Basics (3h) #express #nodejs
Treehouse: Understanding Express Middleware (23m) #express #middleware
Code School: Building Blocks of Express.js (5h) #express #js
Books

Eloquent JavaScript #js
Especially Chapter 20: Node.js #nodejs
