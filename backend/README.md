# Blog backend

API for blog project.

## Running the application

Make sure that `Docker` and `docker-compose` are installed on your local machine before the installation. In order to launch the app fulfil these steps:

1. Create `.env` file. Check a list of required variables in `.env-template`.
2. Run `docker-compose up --build`.
3. Create superuser in `web` service - `docker-compose exec web python manage.py createsuperuser` if necessary.
