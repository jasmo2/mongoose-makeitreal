# Mongoose

Es un driver para NodeJS con cual se comunica con MongoDB.
Con la ayuda de esta librería podemos hacer las operaciones CRUD.

- Create
- Read
- Update
- Delte

###### Adicionalmente, podemos insertar funciones personalidades en caso de necesitar _pre o pos procesamientos_ de los datos

Antes de iniciar con las funciones CRUD debemos establecer una conexión con la **Base de Datos**
; para eso debemos inicializar algunas las configuraciones al iniciar la conexión.

```
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/DBName', {
  useUnifiedTopology: true
})
```

###### La opción que estamos pasando remueve opciones de conexiónes que estan en proceso de deprecación.

###### [https://mongoosejs.com/docs/deprecations.html#useunifiedtopology](https://mongoosejs.com/docs/deprecations.html#useunifiedtopology)

##### EX: [0-DB.js](./0-Db-A.js)

---

## Schemas

### ¿Qué son?

### ¿Porqué usarlos?

Son los que definen la estructura de los documentos que nuestro programa usurá.

En otras palabras son los contratos que se usan durante la ejecución de nuestro programa.

#### Tipos

Los tipos que Mongoose(MongoDB) se maneja a la hora de definir un schema y definir el contrato.

- String
- Number
- Date
- Buffer (se utiliza para manejar datos binarios)
- Boolean
- Mixed (cualquier tipo)
- ObjectId (se utiliza para generar los ids)
- Array

## Metodos de instancia

Son los que se agregan al modelo y pueden usarse en el documento. Para poder agregar nuevos metodos se usa el metodo clave `.methods.nuevoMetodo = fn()`

###### Definición

```
Kitten.methods.whichAnimal = function() {
  const {type, subType} = this.animal
  return `${type} - ${subType}`
};
```

###### Uso

```
var kitty = new Kitten({
  name: "Michis",
  animal: {
    type: "Feline",
    subType: "small kitty"
  }
});

kitty.whichAnimal(); // Feline - small kitty
```

## Metodos Estaticos

Son metodos que se le agregan directamente al modelo. Aquí un ejemplo:

```
schema.statics.findBysubType = function(subType, cb) {
  return this.find({ animal: {subType: new RegExp(name, 'i')} }, cb);
};
```

Con esto lo que podemos encontrar la instancía que queramos sin hacer pasos adicionales.
Kitten.findBysubType('small kitty', function(err, kittens) {
console.log(kittens);
});)

## Atributos Virtuales

Su nombre lo indica. Estos Atributos _**NO** van a ser persistidos en la base de datos_.

```
// el schema
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

// el atributo virtual
personSchema.virtual("fullName")
  .get(function() { return this.name.first + " " + this.name.last })
  .set(function(v) {
    this.name.first = v.substr(0, v.indexOf(" "));
    this.name.last = v.substr(v.indexOf(" ") + 1);
  });

// compile our model
var Person = mongoose.model('Person', personSchema);
```

##### NOTE: las arrow function pueden llegar a tener problemas en mongoose

> https://mongoosejs.com/docs/guide.html#methods

---

---

#### Insertar documentos.

```
Kitten.create({ name: "kitty 2"}, function(err) {
  if (err) return console.error(err);
});

// multiples inserciones

Kitten.insertMany(
  [{ name: "kitty 3"}, {name: 'kitty 4'}],
  (err) => {
    if (err) {
      return console.error(err);
    }
  }
)
```

###### Ex: [1-create.js](./1-create.js)

#### Listar Documentos

De esta forma busca por Id al documento.

```
Kitten.findById("...", function(err, kitten) {
  if (err) return console.error(err);
  console.log('TCL: kitten', kitten)
});
```

De otra manera podemos buscar de forma más general y como respuesta obener multiples resultados.

```
Kitten.find({ name: {$regex : "kitty *", $options: "i"} }, function(err, kitties) {
  if (err) return console.error(err);
  console.log(kitties);
});
```

###### EX: [2-list.js](./2-list.js)

#### Actualizar Documentos

Existen 2 formas de actulizar documentos. La primera sería hayando el documento y luego en la instacía invocando `.save()` sobre esta.

La otra sería sobre el schema invocando la función `update({..args}, fun (err) { console.error (err)})`

> Forma A

```
Kitten.findById({id: '...' } }, function(err, kitty) {
  if (err) return console.error(err);
  kitty.name = "Kual";
  kitty.save(function(err) {
    if (err) return console.error(err);
  });
});
```

> Forma B

```
Kitten.update({ name: "Kien" }, { tamaño: "sm" }, function(err) {
  if (err) return console.error(err);
});
```

##### Como vemos la 2º forma es mucho más consisa y en lo general les recomiendo.

##### También porqué así haremos una solamente un llamado a la base de datos, encontrario con la `forma A` que hace 2 llamados a la DB.

###### EX: [3-update.js](./3-update.js)

#### Eliminar Documentos

Puede comparar con _la actualización de documentos_ porqué se puede hacer de ambos metodos también.

> Forma A

```
Kitten.findById({id: '...' } }, function(err, kitty) {
  if (err) return console.error(err);

  kitty.remove(function(err) {
    if (err) return console.error(err);
  });
});
```

> Forma B

```
Kitten.deleteOne({ name: "Kien" }, { tamaño: "sm" }, function(err) {
  if (err) return console.error(err);
});
```

###### EX: ()[]
