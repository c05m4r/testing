# python3 -m venv env
# source env/bin/activate
# pip install tcms-api
# touch .tcms.conf
# echo -e "[tcms]\nurl = https://localhost/xml-rpc/\nusername = admin\npassword = admin" > ~/.tcms.conf
# python3 kiwi_api.py

# https://kiwitcms.readthedocs.io/en/latest/modules/tcms.rpc.api.html

import ssl
from pprint import pprint
from tcms_api import TCMS

# Crear un contexto SSL que no verifique los certificados
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Crear un objeto TCMS
rpc = TCMS().exec

# Obtener Version de Kiwi TCMS
# data = rpc.KiwiTCMS.version()

# Obtener lista de usuarios
# data = rpc.User.filter({})

# Obtener estados
# data = rpc.TestExecutionStatus.filter({}) 

# Obtener prioridades
# data = rpc.Priority.filter({})

# Obtener categorias
# data = rpc.Category.filter({})

# Obtener productos
# data = rpc.Product.filter({})

# Obtener una versión de producto
# data = rpc.Version.filter({'product_id': 1})

# Obtener casos de prueba
# data = rpc.TestCase.filter({})
# pprint(data)

# Obtener un caso de prueba segun ID
# data = rpc.TestCase.filter({'pk': 1})

# Crear un nuevo caso de prueba
# data = rpc.TestCase.create({
#     'summary': 'test case 9999',
#     'is_automated': True,
#     'notes': 'una nota',
#     'text': 'mucho texto',
#     'case_status': 1,
#     'priority': 1,
#     'category': 1,
#     'author': 2
# })

# Obtener planes de prueba
# data = rpc.TestPlan.filter({})

# Obtener tipos de plan
# data = rpc.PlanType.filter({})

# Crear un nuevo plan de pruebas
# data = rpc.TestPlan.create({
#     'name': 'test plan 9999',
#     'text': 'descripcion',
#     'type': 1,
#     'product': 1,
#     'product_version': 1,
#     'is_active': True,
# })

# Agregar caso de prueba a un plan
# data = rpc.TestPlan.add_case(1, 1)  # plan_id, case_id

# Obtener test runs existentes
# data = rpc.TestRun.filter({})

# Crear un nuevo test run
# data = rpc.TestRun.create({
#     'plan': 1,
#     'manager': 2,
#     'build': 1,
#     'summary': 'Test run de prueba'
# })

# Agregar casos de prueba a un test run
# data = rpc.TestRun.add_case(1, 1)  # run_id, case_id

# Agregar casos de prueba a un test run usando un test plan
# data = rpc.TestRun.update(1, {'plan': 2})  # ID del TestRun, ID del TestPlan

# Obtener los casos de prueba en una ejecución
# data = rpc.TestExecution.filter({})

# Cambiar el estado de un caso de prueba en un test run
# data = rpc.TestExecution.update(2, {'status': 2}) # execution_id, values, **kwargs

pprint(data)