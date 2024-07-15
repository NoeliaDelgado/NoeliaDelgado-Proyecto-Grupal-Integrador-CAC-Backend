from flask import Flask, render_template, request, jsonify, session,  send_from_directory, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS 
import os


# Crear la app
app = Flask(__name__)
# permita acceder desde el frontend al backend
CORS(app)
 

app.config['SECRET_KEY'] = '7110c8ae51a4b5af97be6534caef90e4bb9bdcb3380af008f90b23a5d1616bf319bc298105da20fe'
# Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost:3306/db_medicos'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://silvinadelgado:cacmedical@silvinadelgado.mysql.pythonanywhere-services.com/silvinadelgado$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)


class Especialidad(db.Model):
    id_especialidad = db.Column(db.Integer, primary_key=True)
    especialidad = db.Column(db.String(100), nullable=False)

    def __init__(self,especialidad):   #crea el  constructor de la clase
        self.nombre = especialidad   # no hace falta el id porque lo crea sola mysql por ser auto_incremento



# Definir la tabla 
class Medico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
    foto = db.Column(db.String(400))
    id_especialidad = db.Column(db.Integer, db.ForeignKey('especialidad.id_especialidad'), nullable=False)
    descripcion =db.Column(db.String(500))

    def __init__(self,nombre,foto, id_especialidad, descripcion):   #crea el  constructor de la clase
        self.nombre = nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.foto = foto
        self.id_especialidad = id_especialidad
        self.descripcion = descripcion

     # Aqui pasamos el nombre de las clases y no el nombre de la tabla
    especialidad = db.relationship('Especialidad')

 # 8. Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()



# Crear ruta de acceso
# / es la ruta de inicio

# Crear un registro en la tabla Medicos
@app.route("/registro", methods=['POST']) 
def registro():
    data = request.get_json()
    nombre_recibido = data.get("nombre")
    foto = data.get('foto')
    id_especialidad = data.get('id_especialidad')
    descripcion = data.get('descripcion')


    # Crear una instancia del modelo Medico
    nuevo_medico = Medico(
        nombre=nombre_recibido,
        foto=foto,  # Guardar solo el nombre del archivo
        id_especialidad= id_especialidad,
        descripcion=descripcion
    )

    db.session.add(nuevo_medico)
    db.session.commit()

    return "Solicitud de post recibida"



@app.route('/medicos')
def mostrarMedicosYEspecialidades():
    # Consulta a la base de datos usando SQLAlchemy
    all_medicos = Medico.query.all()
    all_especialidades = Especialidad.query.all()
    
    # Serializar los datos para pasarlos a la plantilla
    medicos_serializados = []
    for medico in all_medicos:
        medico_dict = {
            "id": medico.id,
            "nombre": medico.nombre,
            "foto": medico.foto,
            "id_especialidad": medico.id_especialidad,
            "descripcion": medico.descripcion,
        }
        medicos_serializados.append(medico_dict)
    
    especialidades_serializadas = []
    for esp in all_especialidades:
        especialidad_dict = {
            "id_especialidad": esp.id_especialidad,
            "especialidad": esp.especialidad,
        }
        especialidades_serializadas.append(especialidad_dict)
    
    response_data = {
        "medicos": medicos_serializados,
        "especialidades": especialidades_serializadas
    }

    return jsonify(response_data)



# Modificar un registro
@app.route('/update/<id>', methods=['PUT'])
def update(id):
    # Buscar el registro a modificar en la tabla por su id
    medico = Medico.query.get(id)

    # {"nombre": "Felipe"} -> input tiene el atributo name="nombre"
    nombre = request.json["nombre"]
    foto=request.json['foto']
    idEspecialidad=request.json['id_especialidad']
    descripcion=request.json['descripcion']

    medico.nombre=nombre
    medico.foto=foto
    medico.id_especialidad=idEspecialidad
    medico.descripcion=descripcion
    
    db.session.commit()

    data_serializada = [{"id":medico.id, 
                        "nombre":medico.nombre, 
                        "foto":medico.foto, 
                        "id_especialidad":medico.id_especialidad, 
                        "descripcion":medico.descripcion}]
    
    return jsonify(data_serializada)

   
@app.route('/borrar/<id>', methods=['DELETE'])
def borrar(id):
    
    # Se busca a la productos por id en la DB
    medico = Medico.query.get(id)

    # Se elimina de la DB
    db.session.delete(medico)
    db.session.commit()

    data_serializada = [{"id":medico.id, 
                        "nombre":medico.nombre, 
                        "foto":medico.foto, 
                        "id_especialidad":medico.idEspecialidad, 
                        "descripcion":medico.descripcion}]
    
    return jsonify(data_serializada) 




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/coberturas')
def coberturas():
    return render_template('coberturas.html')

@app.route('/quienesSomos')
def quienesSomos():
    return render_template('quienesSomos.html')

@app.route('/especialidades')
def especialidades():
   if 'logged_in' in session and session['logged_in']:
        return render_template('crear_medico.html')
   else:
        especialidades = Especialidad.query.all()
        data = []
        for esp in especialidades:
            medicos = Medico.query.filter_by(id_especialidad=esp.id_especialidad).all()
            data.append({'especialidad': esp, 'medicos': medicos})
        return render_template('especialidades.html', especialidades=data)
    
@app.route('/editar_medico')
def editar_medico():
    return render_template('editar_medico.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/turnos')
def turnos():
    return render_template('turnos.html')




@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        usuario = data.get('username')
        password = data.get('password')
        if usuario == 'admin' and password == 'admin':
            session['logged_in'] = True
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 400
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('Has cerrado sesión', 'success')
    return redirect(url_for('login'))



@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)



if __name__ == "__main__":
    app.run(debug=True)

