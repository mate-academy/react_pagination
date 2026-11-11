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
1. (\*) Use React Router to save `?page=2&perPage=7` in the URL and apply them on page load

## Instructions

- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://ptrodion.github.io/react_pagination/) and add it to the PR description.
  пиши задание этой задачи более понятно , я не понимаю с описания что на гитеЗавдання Pagination — це створити компонент пагінації для списку товарів/елементів.
  Що потрібно зробити
  У тебе є список елементів. Наприклад:

всього елементів: 42
на одній сторінці: 5
поточна сторінка: 1

Компонент має показувати лише елементи поточної сторінки та навігацію між сторінками.

1. Створити компонент Pagination
   Він отримує такі props:
   <Pagination
     total={42}
     perPage={5}
     currentPage={1}
     onPageChange={...}
   />

total — загальна кількість елементів;
perPage — скільки елементів показувати на сторінці;
currentPage — номер активної сторінки;
onPageChange — функція, яка викликається при переході на іншу сторінку.

Компонент має бути stateless: він сам не зберігає номер сторінки у state. За це відповідає App. 2. Показати всі номери сторінок
Для total = 42 і perPage = 5 буде:
42 / 5 = 9 сторінок
На екрані потрібно показати:
1 2 3 4 5 6 7 8 9
Поточна сторінка повинна мати клас:

<li class="active">

3. Кнопки « і »

« переходить на попередню сторінку;
» переходить на наступну сторінку;
на першій сторінці « має бути вимкнена;
на останній сторінці » має бути вимкнена.

Для вимкненої кнопки потрібні:

<li class="disabled">
<a aria-disabled="true">

4. Інформація про сторінку
   Потрібно показувати текст у елементі:
   data-cy="info"
   Наприклад, для першої сторінки:
   Page 1 (items 1 - 5 of 42)
   Для другої:
   Page 2 (items 6 - 10 of 42)
   Для останньої сторінки:
   Page 9 (items 41 - 42 of 42)

5. Зміна кількості елементів
   Створи select з атрибутом:
   data-cy="perPageSelector"
   У ньому мають бути варіанти:
   3, 5, 10, 20
   Якщо користувач вибирає інше значення, наприклад 10, потрібно:

показувати по 10 елементів;
перейти на першу сторінку;
оновити пагінацію.

6. Зв’язати все з App
   App має:

зберігати currentPage;
зберігати perPage;
передавати їх у Pagination;
обробляти onPageChange;
показувати правильну частину списку.

Наприклад, якщо вибрана сторінка 2, треба показати елементи з 6 по 10, коли perPage = 5.
Що означає частина про GitHub
Після виконання завдання потрібно:

Зберегти код у своєму GitHub-репозиторії.
Опублікувати проєкт через GitHub Pages.
Додати посилання на демо в опис Pull Request.

Посилання має виглядати приблизно так:
https://твій-github-username.github.io/react_pagination/
У завданні є посилання:
https://<your_account>.github.io/react_pagination/
Там потрібно замінити <your_account> на свій GitHub username. Наприклад:
https://ivan123.github.io/react_pagination/
Зірочка біля React Router означає, що збереження page і perPage в URL — це додаткова частина, не основна вимога.

Так, але основна HTML-розмітка вже має бути у стартовому проєкті. Тобі потрібно використати її та доповнити логікою пагінації.
Важливо не змінювати:

структуру елементів;
data-cy атрибути;
класи, які перевіряють тести;
структуру посилань і списків.

Ти маєш реалізувати JSX для:

номерів сторінок;
кнопок « і »;
активної сторінки через li.active;
вимкнених кнопок через li.disabled;
інформації в [data-cy="info"];
select[data-cy="perPageSelector"].

Тобто не потрібно створювати окремий дизайн з нуля. Відкрий готовий приклад або подивись на наявну розмітку в проєкті й збережи її структуру, додавши умови та обробники кліків.
