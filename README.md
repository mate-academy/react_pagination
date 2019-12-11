# React Pagination

## Task 
    
1. Implement `Pagination` component
    ```jsx harmony
    <Pagination
      total={42} /* required */
      perPage={5} /* optional with 5 by default */
      page={1} /* optional with 1 by default */
    />
    ```
    - it should show buttons for all available pages.
      You may use [this markup](https://getbootstrap.com/docs/4.3/components/pagination/)
    - current page should be highlighted 
2. Implement `onPageChange` callback getting selected page as a param
    - should be triggered if only page was changed
    - `Pagination` should work like a controlled `input` all the params are set from outside.
      So the `App` should listen to a callback and sets a changed `page` to the `Pagination` 
3. Implement `prev` and `next` buttons
    - disable buttons if a move is not possible now
4. Add an optional param `withInfo` to show extra info before the buttons (`6 - 10 of 20`)
5. (*) Implement `<select>` (`3, 5, 10, 20`) field to change `perPage` and `onPerPageChange` callback
    - should be triggered if only `perPage` was changed
6. (*) Change view to show buttons only for the `first`, `last`, `current`, one `precurrent` and `postcurrent` pages
    - `< 1 ... 4 [5] 6 ... 12 >`
    - `< [1] 2 ... 12 >`


## Workflow

- Fork the repository with task
- Clone forked repository 
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop


## Development mode 

- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for 
    writing commands until you stop server (`ctrl + c`). All other commands you 
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy` 
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://AnnaGerdii.github.io/react_pagination/)` - this will be a 
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo 
(`master`).
- Add a link at `PR` to Google Spreadsheets.


## Project structure

You should be writing your code in `src/` directory.
