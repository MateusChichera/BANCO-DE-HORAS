#!/bin/bash

KEY_PATH="/c/Users/mateus/Desktop/Horas/VM/VMnodejs.key"
LOCAL_DIR="/c/Users/mateus/Desktop/Horas"
REMOTE_USER="ubuntu"
REMOTE_IP="152.67.45.250"
REMOTE_PATH="/home/ubuntu/projetohoras"

echo "🚀 Enviando arquivos com SCP (sem node_modules)..."

# Compacta o projeto ignorando node_modules
cd "$LOCAL_DIR"
zip -r projeto.zip . -x "node_modules/*" > /dev/null

# Envia o zip pra VM
scp -i "$KEY_PATH" projeto.zip ${REMOTE_USER}@${REMOTE_IP}:/home/ubuntu/

# Conecta na VM, descompacta e reinicia o PM2
ssh -i "$KEY_PATH" ${REMOTE_USER}@${REMOTE_IP} << EOF
  unzip -o projeto.zip -d $REMOTE_PATH
  rm projeto.zip
  cd $REMOTE_PATH
  pm2 restart projetohoras || pm2 start server.js --name projetohoras
EOF

echo "✅ Projeto enviado e rodando!"
