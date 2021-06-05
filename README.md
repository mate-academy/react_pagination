# React Pagination
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://mariiakornieva.github.io/react_pagination/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

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

7. (*) Integrate React Router to show selected `?page=2&perPage=7` as `queryParams`
    - Read the `queryParams` from URL when component appears and apply them
