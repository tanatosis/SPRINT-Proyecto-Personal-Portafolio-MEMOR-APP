# Bootcamp RLAB-22-02-05-0017-1 - DAW FS JavaScript Trainee V2.0
# Alumno : Camilo Andrés Adones Soto
# Proyecto: MEMOR APP NODE JS API ARDUINO
# Para iniciar el proyecto en el terminal escribir : npm i express pg bcrypt  
# Para obtener conectar el arduino : npm i johnny-five

# Index.js

- // `Linea 1` : Importando el módulo express
- // `Linea 2` : Importando el módulo HBS
- // `Linea 9` : Importando el módulo johnny-five
- // `Linea 5` : Importa la biblioteca method-override que se utiliza para permitir que los métodos HTTP PUT y DELETE se utilicen en formularios HTML.
- // `Linea 7` : Importa Brypt para encriptar las contraseñas
- // `Linea 10`:  Configura la aplicación Express para usar HBS como motor de plantillas HTML.
- // `Linea 13` Configura la aplicación Express para utilizar method-override y permitir que los métodos PUT y DELETE se utilicen en formularios HTML.
- // `Linea 25` Enviando los datos de usuario resultantes como una respuesta en formato JSON
- // `Linea 33` Insertando el nuevo usuario en la base de datos y devolviendo el id del nuevo usuario
- // `Linea 50` Cuando la placa Arduino esté lista, se ejecutará este código
- // `Linea 61` Cuando el botón de encender se presione, se enciende el LED
- // `Linea 67` Cuando el botón de apagar se presione, se apaga el LED
- // `Linea 90` Define una ruta para mostrar la página de registro
- // `Linea 90` Define una ruta para mostrar la página de registro
- // `Linea 96` Renderiza la plantilla 'register' con los datos obtenidos de la API
- // `Linea 114` Validación de datos
- // `Linea 123` Enviar la solicitud POST a la API
- // `Linea 134` Si la respuesta es exitosa, redirige al usuario a la página de inicio de sesión
- // `Linea 138` Si la respuesta indica un error, renderiza la plantilla de registro con un mensaje de error
- // `Linea 160` Validación de datos del LOGIN
- // `Linea 176` Si el inicio fue exitoso renderiza según rol de usuario
- // `Linea 201` Se define una ruta para encender el LED
- // `Linea 207` Se define una ruta para apagar el LED
- // `Linea 207` Se define el puerto 
- // `Linea 228`muestra mensaje en consola según el puerto utilizado


# dasboard.hbs

- // `Linea 552` Se agrega el script para controlar los botones 
- // `Linea 560` Función para mostrar la alerta de encendido
- // `Linea 598` Función para mostrar la alerta de LED encendido por más de 10 segundos 
- // `Linea 618` Cuando se presione el botón de encender, se envía una petición al servidor y se muestra la alerta de encendido
- // `Linea 633` Cuando se presione el botón de apagar, se envía una petición al servidor y se muestra la alerta de apagado 
- // `Linea 654` Scripts jquery-bootstrap-chartjs

# mantenedor.hbs

- // `Linea 38` Función para descargar la tabla en excel
- // `Linea 54` Descarga el archivo CSV (Manipulación de datos)
- // `Linea 333` Tabla de usuarios conectada a la base de datos Postgress









 



