from app.routes import controle_financeiro, Usuarios, Login
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

# Configurando as APIs RESTful
api.add_resource(controle_financeiro, '/controle_financeiro')
api.add_resource(Usuarios, '/usuarios')
api.add_resource(Login, '/login')

# Rotas de Front-End
@app.route('/')
def login_page():
    return render_template('login.html')  # Página de login

@app.route('/dashboard')
def dashboard_page():
    return render_template('dashboard.html')  # Página principal com tabelas

@app.route('/gerenciamento-financeiro')
def financeiro():
    return render_template('financeiro.html')  # Página principal com tabelas

if __name__ == '__main__':
    app.run(debug=True, port=5000)
