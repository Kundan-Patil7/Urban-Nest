# API Documentation

## Products API
| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| PUT    | `/api/products/update`       | Update a product    |
| GET    | `/api/products/single/{id}`  | Get a single product by ID |
| DELETE | `/api/products/remove`       | Remove a product    |
| POST   | `/api/products/add`          | Add a new product   |

## Admin API
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/admin/stats`    | Get admin statistics |

## Appointments API
| Method | Endpoint                         | Description                   |
|--------|----------------------------------|-------------------------------|
| GET    | `/api/appointments/status`      | Get appointment statuses      |
| GET    | `/api/appointments/all`         | Get all appointments          |
| PUT    | `/api/appointments/update-meeting` | Update an appointment meeting |

## Dependencies
| Package                | Description                                       |
|------------------------|---------------------------------------------------|
| react-hot-toast       | Notifications and toasts                         |
| axios                 | HTTP client for making API requests              |
| react-router-dom      | Routing for React applications                    |
| motion               | Animation library for React                      |
| react-toastify        | Toast notifications for React                    |
| react-icons           | Popular icons for React                          |
| react-error-boundary  | Error handling for React components              |
| lucide-react          | Modern icon library for React                    |

## Notes
- Replace `{backendurl}` with your actual backend URL.
- Ensure proper authentication and authorization before making API requests.

