const fs = require('fs');

class Contenedor {

    constructor( nombreArchivo ){

        this.nombre     = nombreArchivo;
        this.id         = 0

    }

    crear(nombre) {
        try {
            fs.writeFileSync(nombre,"");
        } catch (error) {
            console.log(error)
        }
    }

    asignarId(){
        let retorno = 0;
        let data = this.getAll();
        if(data.length > 0) {
            retorno = JSON.parse(data[data.length -1]).id + 1
            this.id=retorno;
        }
        return retorno;
    }

    save( datos, id=null ) {
        try {

            if (id) {
                datos.id = id;
            } else {
                datos.id  = this.asignarId();
            }
            fs.appendFileSync(this.nombre,JSON.stringify(datos)+"\n",'utf-8');
            return datos.id;
        } catch (error) {
            console.log(error);
        }
    };

    getById( id ) {
        try {
            let arrayData = this.getAll();
            let encontrado = null;
            // console.log(arrayData);
            for (let e of arrayData) {
                e = JSON.parse(e)
                if(e.id === id) {
                    encontrado = e;
                    break;
                }
            }
            // console.log("Respuesta de encontrado", encontrado)
            return encontrado;
        } catch (error) {
            console.log(error);
        }
    };

    getAll() {

        try {
            let data = fs.readFileSync(this.nombre,'utf-8');
            data = data.split('\n');
            data.pop();
            // console.log("obtuvimos los datos")
            return data;

        } catch (error) {
            console.log(error);
        }
    };

    deleteById( idArchivo ) {
        try {
            const arrayData = this.getAll();
            this.deleteAll();
            arrayData.forEach(elem => {
                let valor = JSON.parse(elem);    
                if(valor.id != idArchivo) {
                    this.save(valor, valor.id);
                }
            });
            console.log("quitamos el elemento del archivo")
            // fs.writeFileSync(this.nombre, JSON.stringify(nuevoArchivo));

        } catch (error) {
            console.log(error);
        }

    };

    deleteAll(){
        try {
            // En caso de querer borrarlo
            // fs.unlinkSync(this.nombre);
            // En caso de no querer borrarlo lo limpiamos
            fs.writeFileSync(this.nombre, "");
            console.log("lo limpiamos");
            
        } catch (error) {
            console.log(error);
        }
    };

}

module.exports = Contenedor;