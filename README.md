# React Pagination

> Here is the [working version](https://mate-academy.github.io/react_pagination/)

You a given a list of items and markup for the `Pagination`. Implement the
`Pagination` as a stateless component to show only the items for a current page.

1. The `Pagination` should be used with the next props:
    ```jsx harmony
    <Pagination
      total={42} // total number of items to paginate
      perPage={5} // number of items per page
      currentPage={1} /* optional with 1 by default */
      onPageChange={(page) => { ... }}
    />
    ```
1. Keep the HTML stucture `data-cy` attributes;
1. Show all the existing pages considering `total` and `perPage`
1. Current page should be highlighted with `li.active`;
1. `onPageChange` callback should be triggered only if page was changed;
1. The `App` should listen to the `onPageChange` and save a new page;
1. `«` and `»` links should open the prev and the next pages accordingly
    - disable each of them if it is already the first or the last page (use `li.disabled` and `a[aria-disabled="true"]`)
1. Show the pagination info inside `data-cy="info"` in the next format `Page 1 (items 1 - 5 of 42)`;
1. Implement the `<select data-cy="perPageSelector">` with `3`, `5`, `10`, `20` options to change the `perPage`;
    - show the 1st page after changing a `perPage`;
1. (*) Use React Router to save `?page=2&perPage=7` in the URL and apply them on page load

## Instructions

- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://associate2coder.github.io/react_pagination/) and add it to the PR description.
