import hashlib

def gerar_hash(senha):
    hash = hashlib.sha256(senha.encode()).hexdigest()
    
    return hash[:32]