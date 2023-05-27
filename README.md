# Proyecto-e2e

## Integrantes: 

    - Monica Alejandra Muñoz Beltran (ma.munozb1@uniandes.edu.co)
    - Humberto Enrique Maury Maury (h.maury@uniandes.edu.co)
    - Daniel Santiago Rondon Cardenas (ds.rondon@uniandes.edu.co)
    - Fredy Antonio Alarcon Fonseca (f.alarconf@uniandes.edu.co)

## Prerrequisitos

    - Ghost versión 3.41.1, usar el siguiente comando para instalar dicha versión: 
        ghost install 3.41.1 --local --force
        
    - Kraken-node versión 1.0.24
    
    - Node versión 14.18.0
    
    - Cypress versión 12.9.0

    - Tener creado un usuario y sitio en ghost 

    - Ghost debe estar ejecutado


## Ejecucion de Cypress
    
    - Edite el archivo cypress\cypress\e2e\ghost3\semana7\a-priori\data\login_correcto.json usando sus credenciales de acceso a Ghost
    - Cambie los valores de las constantes username y password con las credenciales de ghost validas.
    - De ser necesario edite el puerto que utiliza Ghost, por defecto esta en 2368. Puede editarlo en la linea 2 del archivo cypress\cypress\e2e\ghost3\semana7\page-object\site\site.js
    - Abrir la terminal
    - Ingresar a la carpeta cypress
    - Correr el comando npm install si aun no lo ha hecho.
    - Iniciar proyecto usando el comando `cypress open`.
    - En caso de no tener el proyecto agregado, usar la ruta: ./cypress 
    - Seleccionar pruebas E2E.
    - Seleccionar navegador y ejecutar el navegador.
    - En el menú lateral seleccionar la opción specs, dirijase a la carpeta cypress\e2e\ghost3\semana7, allí encontrá 3 carpeta con cada una de las estrategias trabajadas: a priori, aleatorios y dinamicos (pseudo aleatorios).
    - Ejecute uno a uno los escenarios dentro de las 3 carpetas.

## Ejecución de Kraken:
    - Editar el archivo kraken/properties.json
    - Configure los valores de USERNAME1 y PASSWORD1 con las credenciales de ghost validas.
    - De ser necesario edite el puerto que utiliza Ghost, por defecto esta en 2368. Puede editarlo en el valor URL en el archivo kraken/properties.json 
    - En la carpeta kraken/feature/escenarios_semana7 encontrara los archivos txt para cada escenario de pruebas (encontrará 5 escenarios), copie y pegue el contenido del txt que desee ejecutar dentro del archivo my_first.feature dejando las lineas de codigo ahi presente.
    - Abrir la terminal
    - Ingresar a la carpeta kraken
    - Iniciar el proyecto usando el comando `kraken-node run`.

## Ejecucion de Monkey
    
    - Edite el archivo monkey\cypress\e2e\monkey\monkey.cy.js usando sus credenciales de acceso a Ghost y la URL de ghost
    - Cambie los valores de las constantes username y password con las credenciales de ghost validas.
    - Abrir la terminal
    - Ingresar a la carpeta monkey
    - Correr el comando npm install si aun no lo ha hecho.
    - Iniciar proyecto usando el comando `cypress open`.
    - En caso de no tener el proyecto agregado, usar la ruta: ./cypress 
    - Seleccionar pruebas E2E.
    - Seleccionar navegador y ejecutar el navegador.
    - En el menú lateral seleccionar la opción specs, dirijase a la carpeta cypress\e2e\monkey.
    - Ejecute la prueba dentro de la carpeta.


## Estrategias usadas

### A priori

Usando la herramienta Mockaroo se generaron los datos en lsitas guardadas en archivos json, estos archivos fueron importados en las clases de page-object de cada funcionalidad. Estos archivos se pueden encontrar en cypress\cypress\e2e\ghost3\semana7\a-priori\data.
Para la ejecucion de las pruebas se selecciona de manera aleatoria el indice para extraer los datos desde los archivos .json 

### Dinamico (Pseudo Aleatorio)

En el beforeAll de cada escenario de pruebas se generarón datos usando faker.js, dichos datos fueron generados con la misma estructura de los .json para usar estos durante la ejecucion de las pruebas en vez de los datos a priori.

### Aleatorios

Usando Faker se generan datos de manera aleatoria para cada uno de los valores en el momento en que son requeridos en el escenario de pruebas.
Para los escenarios realizados en Kraken se usó el generador de cadenas falsas gracias al paquete NPM @faker-js/faker, en los archivos .feature se encuentra la declaración de la cadena falsa como por ejemplo $name_1 o $string_1.   

## Descripcion de los escenarios

En la siguiente pagina, dentro de la wiki, encontrará la lsita de los escenarios con su correspondiente estrategia de generacion de datos de prueba:
https://github.com/hmauryuniandes/proyecto-e2e/wiki/Escenarios-con-estrategias-de-generaci%C3%B3n-de-datos

