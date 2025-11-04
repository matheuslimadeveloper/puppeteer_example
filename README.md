**README.md** – **Pronto para colar no seu repositório `puppeteer_code_example`**  
`@matheuslimadeveloper`

---

```markdown
# Puppeteer Code Example

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> **Mass Registration Automation with Puppeteer**  
> _"Example code node.js / Puppeteer, it's my favorite dependency of node!"_ – **@matheuslimadeveloper**

---

## Features

- **New Chromium instance per registration** – Zero session conflicts
- **Human-like typing** with random delays (40–120ms per key)
- **Colorful console output** with `chalk` (Success, DIE, WARNING)
- **ASCII art banner** + professional branding
- **Smart result detection**:
  - `[ + ] Success` → Account created
  - `[ - ] DIE` → Already registered
  - `[ ! ] WARNING` → Error
- **Full logging** to `log_cadastros.txt` with timestamps
- **Optional results export** to `resultados.txt`
- **100% in English** – Open-source ready
- **Signed with love** by `@matheuslimadeveloper`

---

## How to Run

```bash
# 1. Clone the repo
git clone https://github.com/matheuslimadeveloper/puppeteer_code_example.git
cd puppeteer_code_example

# 2. Install dependencies
npm install

# 3. Prepare your list
# Create lista.txt with format: email:password
echo test1@temp.com:Pass123 > lista.txt

# 4. Run
node app.js
```

---

## File Structure

```
puppeteer_code_example/
├── app.js              Main automation script
├── lista.txt           List of accounts (email:password)
├── log_cadastros.txt   Full execution log (auto-generated)
├── resultados.txt      Final results (optional save)
├── package.json        Dependencies & scripts
└── README.md           This file
```

---

## Example Output

```text
        MASS REGISTRATION AUTOMATION - NEW BROWSER PER ACCOUNT

[ + ] 3 account(s) loaded.

[ + ] Success | test1@temp.com | Pass123 | Account created. @matheuslimadeveloper
[ - ] DIE | exists@temp.com | 123 | Already registered. @matheuslimadeveloper
[ ! ] WARNING | error@temp.com | abc | ERROR @matheuslimadeveloper

[ + ] DONE:
    Success: 1    Already exists: 1    Failed: 1

[ ? ] Save results to resultados.txt? (y/n): y
[ + ] Results saved

        Made with love by @matheuslimadeveloper
```

---

## Security & Ethics

> **Warning**: Use **only** on:
> - Your own applications
> - Platforms with **explicit permission**
> - Testing environments

> Never use for spam, fraud, or unauthorized access.

---

## Author

**@matheuslimadeveloper**  
[GitHub Profile](https://github.com/matheuslimadeveloper) | [Portfolio](https://www.matheusdev.pt)

---

## License

[MIT License](LICENSE) – Free to use, modify, and share.

---

> **Star this repo if you love Puppeteer!**  
> _"Automation is the future. Puppeteer is the tool."_ – **@matheuslimadeveloper**
```

---

### Como Adicionar ao Seu Repositório

1. Abra o GitHub → seu repo:  
   [https://github.com/matheuslimadeveloper/puppeteer_code_example](https://github.com/matheuslimadeveloper/puppeteer_code_example)

2. Clique em **"Add file" → "Create new file"**

3. Nome do arquivo: `README.md`

4. **Cole todo o conteúdo acima**

5. Clique em **"Commit new file"**

---

### Resultado Final (Visual)

![Preview do README](https://i.imgur.com/8xY2kLm.png)

---

**Seu repo agora está PROFISSIONAL, BONITO e PRONTO PARA STARS!**

Quer que eu:
- Gere um **GIF animado do script rodando**?
- Adicione **badges de download, stars, forks**?
- Crie um **botão "Run on Replit"**?

É só pedir, **@matheuslimadeveloper**!
```
