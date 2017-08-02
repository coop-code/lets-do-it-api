# Lets Do It API resources and development status

## Working resources and routes

- `GET /tasks` : Get all tasks (accepts query parameter named `finished`, a boolean with a default value `false`)
- `GET /tasks/:id` : Get a task by id
- `POST /tasks` : Create a new task
- `PATCH /tasks/:id` : Partially update a specific task
- `DELETE /tasks` : Delete all tasks (will be removed in near future)
- `DELETE /tasks/:id` : Delete a specific task

None of the resources above requires authentication.

## Future resources and routes

- `POST /user` : Creates a new user

Email and username duplication needs to be checked. 
Password must be encrypted.
Returns a token.

- `POST /user/token` : Return a token for the user.

Validate username and password.
Encrypt password (if is not already encrypted) before comparison.
Returns a token.

#### For information, protected means that a route requires an access token on the request header.

- `PATCH /user` : Partially update user information (**Protected**)
- `PATCH /user/password` : Update user password (**Protected**)


### Refactoring and improvements

- Error handling middleware

### Changes

All routes regarding `/tasks` must be **protected** when the authentication is completed.
**The tasks scope is the user** (that will be obtained from the token), which means that there will be no more global tasks.

## Resources that **may** be implemented

- Subtasks
- Files
