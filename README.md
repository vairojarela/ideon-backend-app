# ideon

<br>

## Description

This is an app to post project ideas with a short description, tags, labels, categories, upvote or downvote them and comment. Made for helpless UX/UI designers and developers who have no idea what to do as exercises. We believe that every TODO React app kills aprox. 2.7 baby dolphins. Save the dolphins. Try ideon.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start playing into competition
-  **Login:** As a user I can login to the platform so that I can play competitions
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Edit user profile** As a user I can edit my profile information
-  **Delete user profile** As a user I can delete my profile information
-  **Add Ideon** As a user I can add an ideon
-  **Edit Ideon** As a user I can edit an ideon
-  **Delete Ideon** As a user I can delete an ideon
-  **Add Comment** As a user I can add comment on any ideon
-  **Edit Comment** As a user I can add comment on any ideon
-  **View Ideons** As a user I can see a feed of recent ideons




## Backlog

Admin Area / CMS:
- superUser with extra pivileges
- can CRUD any profile (admin or user)
- can CRUD any ideon
- can CRUD any category/tags

User profile:
- Google / Github Sign In
- Add weather widget
- add geolocation to events when creating


<br>


# Client / Frontend

## Routes (React App)
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public      | Home page                                        |
| `/auth/signup`            | SignupPage           | anon only   | Signup form, link to login, navigate to homepage after signup |
| `/auth/login`             | LoginPage            | anon only   | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | anon only   | Navigate to homepage after logout, expire session            |
| `/ideons`            | TournamentListPage   | user only   | Shows all ideons in a list                              |
| `/ideons/add`        | TournamentListPage   | user only   | Edits a tournament                                           |
| `/ideons/:id`        | TournamentDetailPage | user only   | Details of a tournament to edit                              |
| `/ideons/:id/delete`         | n/a                   | user only   | Delete tournament                                            |
| `/profile/:id`     | ProfilePage      | user only   | User profile                              |
| `/profile/edit` | ProfileEditPage      | user only   | Edit profile info                               |
| `/tournament/players/:id` | PlayersDetailPage    | user only   | Edit player for tournament                                   |
| `/tournament/players/:id` | PlayersListPage      | user only   | Delete player from tournament                                |
| `/tournament/tableview`   | TableView            | user only   | Games view and brackets                                      |
| `/tournament/ranks`       | RanksPage            | user only   | Ranks list                                                   |
| `/tournament/game`        | GameDetailPage       | user only   | Game details                                                  |
| `/tournament/game`        | Game                 | user only   |                                                              |


## Components

- LoginPage

- SplashPage

- IdeonsListPage

- IdeonCard

- IdeonDetailPage

- TableViewPage

- ProfilePage

- Navbar


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tournament Service
  - ideon.list()
  - ideon.detail(id)
  - ideon.add(id)
  - ideon.delete(id)
  
- Profile Service 

  - user.detail(id)
  - user.add(id)
  - user.delete(id)

- Ideons Service

  - Ideon.put(id)



<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String},
  points: {type: Number},
  ideas: [{type: Schema.Types.ObjectId,ref:'Idea'}],
  votes: [{type: Schema.Types.ObjectId,ref:'Idea'}],
  comments: [{type: Schema.Types.ObjectId,ref:'Comment'}],
  interests: [{type: Enum}],
  timestamps
}
```

Idea model

```javascript
 {
   title: {type: String, required: true},
   description: {type: String},
   category: {type: String},
   img: {type: String},
   votes: {type: Number},
   comments: [{type: Schema.Types.ObjectId,ref:'Comment'}],
   timestamps
 }
```



Comment model

```javascript
{
  message: {type: String, required: true},
  authorID: [{type: Schema.Types.ObjectId,ref:'User'}],
  ideaID: [{type: Schema.Types.ObjectId,ref:'Idea'}],
  timestamps
}
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/ideons`                |                              |                | 400          | Show all tournaments                                         |
| GET         | `/ideons/:id`            | {id}                         |                |              | Show specific tournament                                     |
| POST        | `/ideons/add-ideons` | {}                           | 201            | 400          | Create and save a new tournament                             |
| PUT         | `/ideons/edit/:id`       | {name,img,players}           | 200            | 400          | edit tournament                                              |
| DELETE      | `/ideons/delete/:id`     | {id}                         | 201            | 400          | delete tournament                                            |
| GET         | `/user`                    |                              |                | 400          | show players                                                 |
| GET         | `/user/:id`                | {id}                         |                |              | show specific player                                         |
| POST        | `/user/add`         | {name,img,tournamentId}      | 200            | 404          | add player                                                   |
| PUT         | `/user/edit/:id`           | {name,img}                   | 201            | 400          | edit player                                                  |
| DELETE      | `/user/delete/:id`         | {id}                         | 200            | 400          | delete player                                                |
| GET         | `/games`                      | {}                           | 201            | 400          | show games                                                   |
| GET         | `/games/:id`                  | {id,tournamentId}            |                |              | show specific game                                           |
| POST        | `/games/add-game`             | {player1,player2,winner,img} |                |              | add game                                                     |
| POST        | `/games/add-all-games`        |                              |                |              | add all games from a tournament. Gets a list of players and populates them via algorithm. |
| PUT         | `/games/edit/:id`             | {winner,score}               |                |              | edit game                                                    |


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)



# Auth backend server


💣💣💣💣 rename the file `.env.sample` to `.env` and spicify your database name; 💣💣💣💣

## Routes

| Method | Path | Description |
|--------|------|-------------|
| `get`  | `/auth/me` | check if i'm logged |
| `post` | `/auth/login` | login |
| `post` | `/auth/signup` | signup |
| `post` | `/auth/logut` | logout |
| `get`  | `/auth/private` | private route for test |

## Login & Signup

this is the following `body` for the `login` and `signup` request;

```json
{
  "username": "demo",
  "password": "demo"
}
```
