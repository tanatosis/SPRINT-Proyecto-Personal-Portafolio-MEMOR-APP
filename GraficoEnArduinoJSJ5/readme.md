# Bootcamp RLAB-22-02-05-0017-1 - DAW FS JavaScript Trainee V2.0
# Alumno : Camilo Andrés Adones Soto
# Conexión arduino entregando valores a tiempo real CHART JS
# Para iniciar el proyocto en el terminal escribir : npm i express socket.io

`En este código podremos encontrar un proyecto realizado en node js, con las librerias express -hbs--socket.io.`
`Esté codigo representa datos simulados entregados del Arduino UNO el cual es programado para envíar un counter, simula la entrega de watts conectados a algún dispositivo con corriente. Al obtener los watts se puede calcular cuanto es el gasto de dinero en la electricidad de un hogar y lo pueden ver a tiempo real en la aplicación. Se realizo la carpeta de manera separada ya que el gráfico funciona si está contectado al Arduino, por lo cuál en el APP si estuviera presente se vería el gráfico vacio, visualmente no sería adecuado para un prototipo. El proyecto sigue en construcción, hay que agregar mas componentes para realizar nuevas mediciones y poder lograr ayudar a las personas con problemas de memoria con la app MEMOR, mas información en el PDF adjunto con los archivos. `

Explicación por linea.

- // `Linea 2` : Importando el módulo express
- // `Linea 4` : Se importa el módulo socket.io, el cual es una biblioteca de Node.js que permite la comunicación en tiempo real entre el servidor y el cliente a través de WebSockets.
- // `Linea 5` : Importando el módulo hbs 

- // `Linea 7` : Se crea una instancia de la aplicación express. 
- // `Linea 8` : Se crea un servidor HTTP utilizando la instancia de la aplicación express.
- // `Linea 9` : Se crea una instancia de socket.io que escucha en el servidor HTTP creado anteriormente.
- // `Linea 11` : Se establece la ruta donde se encuentran las vistas de la aplicación. 
- // `Linea 12` : Se establece el motor de plantillas que se utilizará para renderizar las vistas.
- // `Linea 16` :  Se renderiza la vista 'index.hbs' utilizando el motor de plantillas definido anteriormente.
- // `Linea 32` :  Ruta para servir archivos estáticos
- // `Linea 35` :  Conexión con Johnny-Five
- // `Linea 40` :  Conexión con el Arduino y funciones para envíar datos simulados
- // `Linea 42` :  Se importa la clase Board desde el módulo johnny-five.
- // `Linea 46 - 50` : Inicializo las variables "counter", "power", "totalMoneySpent" y "costPerWatt"
- // `Linea 55` : Agrego un número aleatorio entre 200 y 500 a la variable "power"
- // `Linea 58` : Resta un número aleatorio entre 50 y 150 a la variable "power"
- // `Linea 62` : Calculo el costo del consumo de energía durante el intervalo de tiempo de 2 segundos
- // `Linea 65` : Sumo el costo a la variable "totalMoneySpent" para rastrear el costo total de la energía consumida
- // `Linea 68` : Imprimo el consumo de energía y el costo total en la consola
- // `Linea 71` : Incrementa el contador en uno
- // `Linea 74` : Emite un evento "counter" utilizando la biblioteca Socket.IO
- // `Linea 85` : Iniciar el servidor


