# Guia Completo: Como Instalar e Configurar o CodeGPT com API da Perplexity no VS Code/Codespaces

Com base na imagem que você enviou, vejo que está enfrentando o erro "Unable to connect to the extension services" no CodeGPT. Este é um problema comum, especialmente quando se usa ambientes como Codespaces. Vou te ajudar a resolver isso e configurar tudo corretamente com sua API da Perplexity.

## Problemas Identificados e Soluções

### 1. Erro de Conexão com os Serviços da Extensão

O erro mostrado na sua imagem indica que o CodeGPT não consegue se conectar ao servidor local na porta 54112. Este é um problema conhecido, mas existem algumas soluções possíveis.

#### Soluções Principais

##### Verificar Porta 54112

1. Abra o terminal e verifique se a porta está livre:
   - **Windows:** `netstat -aon | findstr :54112`
   - **Linux/Mac:** `lsof -i :54112`
2. Se houver algo rodando na porta, finalize o processo.

##### Reiniciar Completamente

1. Feche o VS Code completamente.
2. Reinicie seu computador.
3. Abra o VS Code novamente.

##### Limpar Cache

1. Pressione `Ctrl + Shift + P`.
2. Digite "Clear Editor History".
3. Pressione Enter.
4. Feche o VS Code e reinstale o CodeGPT.

### 2. Problemas Específicos do Codespaces

Se você está usando GitHub Codespaces, há considerações especiais.

#### Configuração de Porta

- O CodeGPT requer acesso à porta 54112.
- No Codespaces, você precisa configurar o port forwarding.
- Adicione o trecho abaixo ao seu `devcontainer.json`:

```json
{
  "forwardPorts": [54112],
  "portsAttributes": {
    "54112": {
      "label": "CodeGPT Server"
    }
  }
}
```

#### Limitações Conhecidas

- O CodeGPT não é compatível com VS Code Tunnel.
- Funciona melhor em ambientes locais.

## Configuração Completa da API da Perplexity

### Passo 1: Obter sua Chave da API da Perplexity

1. Acesse <https://www.perplexity.ai/account/api/keys>.
2. Faça login na sua conta.
3. Clique em "Create API Key".
4. Copie a chave imediatamente (ela só aparece uma vez).

> **Importante:** Mantenha a chave segura e nunca compartilhe.

### Passo 2: Instalar o CodeGPT

1. Abra o VS Code.
2. Vá para **Extensions** (`Ctrl + Shift + X`).
3. Pesquise por "CodeGPT: Chat & AI Agents".
4. Instale a extensão oficial da JudiniLabs.

### Passo 3: Configurar a Perplexity no CodeGPT

1. Abra o painel do CodeGPT no VS Code.
2. Clique no dropdown de modelos.
3. Selecione "View More".
4. Escolha **LLMs Cloud model**.

#### Configurações

- **Provider:** Selecione "Perplexity".
- **Model:** Escolha um modelo (por exemplo: `pplx-7b-chat` ou `sonar-pro`).
- **API Key:** Cole sua chave da Perplexity.
- Clique em "Connect".

### Modelos Perplexity Disponíveis

Os principais modelos que você pode usar com seus US$ 5 de crédito:

- `pplx-7b-online`: modelo menor com acesso à internet.
- `pplx-70b-online`: modelo maior com acesso à internet.
- `sonar-small-online`: modelo mais recente, pequeno.
- `sonar-medium-online`: modelo médio com busca web.
- `sonar-pro`: modelo profissional.

## Troubleshooting Adicional

### Se o Erro Persistir

#### Verificar Requisitos

- VS Code versão **1.96.0** ou superior.
- Node.js versão **20.0.0** ou superior.

#### Problemas de Rede

- Desconecte de VPNs, se estiver usando.
- Verifique se o firewall não está bloqueando `api.codegpt.co`.

#### Versão Específica

- Se nada funcionar, tente fazer **downgrade** para a versão 3.8.20 do CodeGPT.

### Para Ambientes Docker/DevContainer

Adicione ao seu `docker-compose.yml`:

```yaml
services:
  your-service:
    ports:
      - "54112:54112"
```

## Testando a Configuração

Após configurar tudo:

1. Abra o chat do CodeGPT.
2. Digite uma pergunta simples, como: "Explique o que é React".
3. Se funcionar, você verá uma resposta da Perplexity com citações de fontes web.

## Gerenciamento de Créditos

Com seus US$ 5 da API da Perplexity:

- Modelos pequenos: ~US$ 0,20 por 1 milhão de tokens.
- Modelos médios: ~US$ 0,60 por 1 milhão de tokens.
- Modelos grandes: ~US$ 1,00 por 1 milhão de tokens.
- Modelos "online" incluem busca web sem custo extra.

## Alternativas se Problemas Persistirem

Se o CodeGPT continuar com problemas no Codespaces, considere:

- **Cursor IDE:** alternativa ao VS Code com IA integrada.
- **VS Code Local:** use um ambiente local em vez de Codespaces.
- **OpenRouter:** intermediário para acessar a Perplexity.

Seguindo este guia, você deve conseguir resolver o erro de conexão e configurar com sucesso o CodeGPT com sua API da Perplexity para automatizar modificações no seu código!
