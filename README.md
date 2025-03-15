<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About MASPOS

MASPOS is a lightweight, fast, and beginner-friendly Point of Sale (POS) application. It is built using the following technologies:
- **Laravel**: Backend framework
- **Inertia.js**: Middleware for connecting Laravel and React
- **React**: Frontend library
- **shadcn/ui**: UI components library

## Getting Started

To set up the application, follow these steps:

1. Install project dependencies:
   ```bash
   composer install
   npm install
   ```

2. Copy the `.env.example` file to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

3. Generate the application key:
   ```bash
   php artisan key:generate
   ```

4. Run the migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```

5. Run the application:
   ```bash
   php artisan serve
   ```

6. Use the following credentials to log in:
   - **Username:** `test@example.com`
   - **Password:** `password`

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
