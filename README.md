# MiniMart Inventory

MiniMart Inventory is a small inventory-management practice project. It provides a browser interface and a JSON API for viewing products, searching by name, and adding products to a SQLite database.

## Features

- View the products stored in the database.
- Search products by a partial name match.
- Add products with a name, positive price, and non-negative whole-number stock quantity.
- Serve the browser interface and its stylesheet from the Express application.
- Validate product submissions with Zod and return JSON responses.

## Technology stack

- **Runtime:** Node.js
- **Server:** Express 5
- **Database:** SQLite, accessed with `sqlite3`
- **Validation:** Zod
- **Browser interface:** HTML, CSS, and browser-native JavaScript
- **Development utility:** Nodemon

`lodash` is also listed as a project dependency, though it is not used by the checked-in application source.

## Project structure

```text
.
├── app.js                          # Express app setup and HTTP listener
├── controllers/
│   └── productControllers.js       # Product list, search, and insert handlers
├── database/
│   └── db.js                       # SQLite database connection
├── ecommerce.db                    # Bundled SQLite database and sample data
├── middlewares/
│   ├── errorhandling.js            # JSON error response middleware
│   └── validatormiddleware.js      # Product request validation
├── public/
│   ├── index.html                  # Inventory browser interface
│   └── style.css                   # Interface styles
├── routes/
│   └── products.js                 # Product API routes
├── validators/
│   └── productvalidators.js        # Product input schema
├── package.json                    # Dependencies and npm scripts
├── package-lock.json               # Locked dependency versions
└── sqlite3.exe                     # SQLite command-line executable for Windows
```

## Requirements

- Node.js and npm
- Windows, if you want to use the included `sqlite3.exe` command-line tool

## Setup and current run limitation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/startupstudio07-dev/project1.git
cd project1
npm install
```

The checked-in project currently has path and entry-point issues that prevent a fresh checkout from starting as-is:

- `npm start` and `npm run dev` refer to `main2.js`, which is not present in the repository.
- The Express setup in `app.js` imports the product routes and error middleware using absolute paths from a different local directory.
- The SQLite connection in `database/db.js` also points to a database path from a different local directory.

Consequently, neither the declared start scripts nor running `app.js` directly is a reliable way to launch the application from a fresh clone without correcting those paths and the start-script entry point. Those application changes are outside the scope of this README.

The application code is configured to listen on port `3000` once it can start. No environment variables are read by the checked-in application, and no `.env` template is included.

## Database

The bundled `ecommerce.db` is a SQLite database containing a `products` table:

| Column | Type | Description |
| --- | --- | --- |
| `id` | Integer primary key | Auto-incremented product identifier |
| `name` | Text | Product name; required |
| `price` | Real | Product price; required |
| `stock` | Integer | Stock quantity; required |

The checked-in database contains 16 product rows. The application code expects to open a database named `ecommerce.db`, but its current connection path is machine-specific (see [Setup and current run limitation](#setup-and-current-run-limitation)).

## API

The API is mounted at `/products`. Successful product reads return JSON arrays.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products` | Return all products |
| `GET` | `/products/search?name=<term>` | Return products whose names contain the supplied search term |
| `POST` | `/products` | Add a product |

Submit a product as JSON:

```json
{
  "name": "Notebook",
  "price": 4.5,
  "stock": 12
}
```

`name` must be a non-empty string, `price` must be positive, and `stock` must be a non-negative integer. The API responds with HTTP `201` and `{"message":"added"}` when the insert succeeds, or HTTP `400` with validation issues for invalid input. Database errors are returned as HTTP `500` JSON responses.

## Browser interface

The static interface in `public/index.html` provides controls to search for products, add a product, and refresh the product list. The page requests the API at `/products`. When the server is running, the intended interface URL is `http://localhost:3000/`.

## Tests and license

No test files or test script are present in the repository. `package.json` lists the `ISC` license, but there is no `LICENSE` file; confirm the intended license and add its text before relying on the metadata for public distribution.
