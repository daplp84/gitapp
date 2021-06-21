# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2021-06-20

### Added

-   Un signo - delante de cada gasto y un signo + delante de cada ingreso de todas las listas.

-   Un campo booleano en el modelo para saber si el movimiento es recurrente.

### Fixed

-   En las listas de movimientos, se muestran los últimos 5 movimientos.

-   En el modelo y en la API, no permiten recibir montos negativos al crear o actualizar un movimiento.

## [1.1.0] - 2021-06-16

### Added

-   Alerta que indique que un movimiento se guardó con éxito al crear el movimiento.

-   Endpoint en la API para permitir borrar un movimiento. Conectar con la función ya realizada del modelo.

-   Campo description al modelo.

-   Validación de HTML5 en el form de crear movimiento.

-   Crea vista de egresos de manera análoga a la tabla de ingresos.

### Fixed

-   Arregla los headers de la card de los gráficos. Tienen que usar la clase card-header y card-header-title.

-   Arregla el problema que hace que todos los movimientos se creen con la fecha de hoy, permitiendo tomar la fecha que se envía desde el form.

-   Arregla el formato de los montos en las tablas. Si le pasan un número con “,” rompe el formato.
  
-   Arregla el formato de las fechas en las tablas para que sea más amigable.
    
-   Al crear un movimiento, hace refresh para que aparezca reflejado en la lista. Se arregla esto haciendo que el cambio impacte inmediatamente en la lista.


## [1.0.1] - 2021-05-03

### Added

-   Cypress detection for running tests on memory
-   Cypress seed before each cypress test

### Changed

-   Creates tables on server init and avoids erase on shutdown

### Removed

-   Cypress experimental configuration

## [1.0.0] - 2021-04-26

### Added

-   Movements API
-   Home UI with charts and last movements
-   Incomes UI with last incomes

[unreleased]: https://github.com/daplp84/gitapp/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/daplp84/gitapp/releases/tag/v1.2.0
[1.1.0]: https://github.com/daplp84/gitapp/releases/tag/v1.1.0
[1.0.1]: https://github.com/daplp84/gitapp/releases/tag/v1.0.1
[1.0.0]: https://github.com/daplp84/gitapp/releases/tag/v1.0.0
