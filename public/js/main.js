

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDDqIAGklpgtId_qQ_cZCeP0Dw0pmbUBms",
    authDomain: "mylibreria-d37f3.firebaseapp.com",
    databaseURL: "https://mylibreria-d37f3.firebaseio.com",
    projectId: "mylibreria-d37f3",
    storageBucket: "",
    messagingSenderId: "189273601864"
  };
  firebase.initializeApp(config);

var saludo = document.getElementById('hello');
var dbRef = firebase.database().ref().child('text');
//creamos locaclizacion hija con un texto
dbRef.on('value', snap => saludo.innerText = snap.val() );

//obtener elementos 
const preObject = document.getElementById('objeto');
const ulList = document.getElementById('lista')

//referencia a la base de datos
const dbRefObject = firebase.database().ref().child('objeto');
const dbRefList = dbRefObject.child('habilidades');//le indicamos que llame al hijo de objeto llamado habilidades
//la funcion ref nos va a conducir a firebase
//llamamos a child para crear una clave 
//metodos poderoso on
dbRefObject.on('value', snap => {
  preObject.innerText = JSON.stringify(snap.val(),null,3);
  //JSON.stringify(valor,[remplazo[espacios al tabular ]]) Recibe 3 parametros
  //PreObject es la cosntante creadada en el index
  //con innet text le agregamos el objeto creado en firebase atravez del metodo stringify de json
});
//el primero de parametro que pasamos al metodos on osea value, el segundo parametro la funcion callback que controla el evento.. esta funcion sera llamada cada vez qu
//haya un cambio en la base de datos 
//funcion arrow emna 2015
//snap fotofija de la informacion .
dbRefList.on('child_added', snap => { //le ponemos el evento child-added y llamamos a la funcion calbak snap que nos haga una foto de firebase en la pagina
  //creamos un item list con documente create element
  const li = document.createElement('li');
  li.innerText = snap.val();
  li.id = snap.key; 
  ulList.appendChild(li);

});
dbRefList.on('child_changed', snap => { //le ponemos el evento child-added y llamamos a la funcion calbak snap que nos haga una foto de firebase en la pagina
  //creamos un item list con documente create element
  const liChanged = document.getElementById('snap.key');
  liChanged.innerText = snap.val();


});
dbRefList.on('child_removed', snap => { //le ponemos el evento child-added y llamamos a la funcion calbak snap que nos haga una foto de firebase en la pagina
  //creamos un item list con documente create element
  const liToRemove = document.getElementById('snap.key');
  liToRemove.innerText = snap.val();
});

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
//Ayuda
const btnLogout = document.getElementById('btnLogout');
const btnR = document.getElementById('btnR');

btnLogin.addEventListener('click', e => {

  //e funcion callback de respuesta cuando hagamos click
  //Obtener valores email. Password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //sing IN
  const promise = auth.signInWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));

});
//registro
btnR.addEventListener('click', e => {
  //e funcion callback de respuesta cuando hagamos click
  //Obtener valores email. Password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //sing IN
  const promise = auth.createUserWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));

});
//sing out
btnLogout.addEventListener('click', e => {
  
  firebase.auth().signOut();

});

//comprobar estado de usuario
firebase.auth().onAuthStateChanged(firebaseUser => {
  //condicional callBack funcion 
  if(firebaseUser){
    console.log('no logueado');
    btnLogout.classList.remove('hide')
  }
});
var uploader = document.getElementById('uploader');
var filebotton = document.getElementById('fileButton');

//vigialar cuando un archivo haya sido seleccionado
fileButton.addEventListener('change', function(e){
  //obtener un archivo
  var file = e.target.files[0];
//crear un storage ref  referencia en firebase en donde vamos a almacenar los archivos
var storageRef = firebase.storage().ref(file.name);

//  subir archivo
//el metodo put subira el archivo que hayamos seleccionado y lo subira a firebase
var task = storageRef.put(file);
//actualizar barra de progreso
//evento state-changed 
task.on('state_changed',

  //funcion para la barra de progresso divir el numero de bytes transferidos 
  function progress(snapshot){
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploader.value = percentage;

  },
  function error(err){},
  function complete(){}



  )




});
















