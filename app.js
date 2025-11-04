/**
 * PUPPETEER AUTO-REGISTER TOOL
 * Simple Node.js + Puppeteer example
 * @MatheusLimaDev
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');

// === CONFIG ===
const LOGIN_URL = 'https://stand-caxarias-usados.lovable.app/login';
const LOG_FILE = 'log_cadastros.txt';
const RESULT_FILE = 'results.txt';
const AUTHOR = chalk.cyan('@MatheusLimaDev');

// === ASCII BANNER ===
const BANNER = chalk.bold.magenta(`
  ___        _       ______           _     _            
 / _ \\      | |      | ___ \\         (_)   | |           
/ /_\\ \\_   _| |_ ___ | |_/ /___  __ _ _ ___| |_ ___ _ __ 
|  _  | | | | __/ _ \\|    // _ \\/ _\` | / __| __/ _ \\ '__|
| | | | |_| | || (_) | |\\ \\  __/ (_| | \\__ \\ ||  __/ |   
\\_| |_/\\__,_|\\__\\___/\\_| \\_\\___|\\__, |_|___/\\__\\___|_| v1.0
                                 __/ |                   
                                |___/                    
`);

// === CLI INPUT ===
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(chalk.yellow(q), res));

// === HELPERS ===
function log(msg) {
  const time = new Date().toLocaleString('en-US');
  fs.appendFileSync(LOG_FILE, `[${time}] ${msg}\n`);
}

function typeHuman(page, selector, text) {
  return new Promise(async (resolve) => {
    await page.focus(selector);
    await new Promise(r => setTimeout(r, 300));
    for (const char of text) {
      await page.keyboard.type(char);
      await new Promise(r => setTimeout(r, 40 + Math.random() * 80));
    }
    await new Promise(r => setTimeout(r, 1500));
    resolve();
  });
}

function saveResult(email, pass, status, detail = '') {
  const line = `${email}:${pass} | ${status} | ${detail} | ${new Date().toLocaleString('en-US')}\n`;
  fs.appendFileSync(RESULT_FILE, line);
}

// === MAIN SCRIPT ===
(async () => {
  console.clear();
  console.log(BANNER);
  console.log(chalk.bold.cyan(' Example code node.js / Puppeteer, its my favorite dependence of node! @MatheusLimaDev\n'));

  log('Script started - Mass registration with new browser per account');

  const listPath = path.join(__dirname, 'lista.txt');
  if (!fs.existsSync(listPath)) {
    console.log(chalk.red('[ - ] lista.txt not found!'));
    log('lista.txt not found');
    rl.close();
    return;
  }

  const accounts = fs.readFileSync(listPath, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.includes(':'));

  if (accounts.length === 0) {
    console.log(chalk.red('[ - ] No valid accounts in lista.txt!'));
    rl.close();
    return;
  }

  console.log(chalk.green(`[ + ] ${accounts.length} account(s) loaded.\n`));
  log(`${accounts.length} accounts loaded`);

  let stats = { success: 0, already: 0, fail: 0 };

  for (let i = 0; i < accounts.length; i++) {
    const [email, password] = accounts[i].split(':').map(s => s.trim());
    if (!email || !password) continue;

    let browser = null;

    try {
      log(`\n[INFO] Attempt ${i + 1}/${accounts.length}: ${email} - Starting new browser`);

      // === NEW BROWSER INSTANCE ===
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1200, height: 800 },
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();

      // 1. Open login page
      await page.goto(LOGIN_URL, { waitUntil: 'networkidle2', timeout: 10000 });
      await new Promise(r => setTimeout(r, 2500));
      log('Login page loaded');

      // 2. Click "Sign Up"
      await page.waitForSelector('#radix-\\:r3\\:-trigger-signup', { timeout: 5000 });
      await page.click('#radix-\\:r3\\:-trigger-signup');
      await new Promise(r => setTimeout(r, 2500));
      log('Signup button clicked');

      // 3. Fill form
      await typeHuman(page, '#signup-email', email);
      await typeHuman(page, '#signup-password', password);
      await typeHuman(page, '#confirm-password', password);
      log('Form filled');

      // 4. Submit
      await page.click('#radix-\\:r3\\:-content-signup > div > div.p-6.pt-0 > form > button');
      await new Promise(r => setTimeout(r, 4000));
      log('Form submitted');

      // 5. Check result
      const body = await page.evaluate(() => document.body.innerText);

      if (body.includes('Conta criada com sucesso!') || body.includes('Account created')) {
        console.log(chalk.green(`[ + ] Success | ${email} | ${password} | Account created. ${AUTHOR}`));
        saveResult(email, password, 'SUCCESS');
        stats.success++;
      } else if (body.includes('User already registered')) {
        console.log(chalk.red(`[ - ] DIE | ${email} | ${password} | Already registered. ${AUTHOR}`));
        saveResult(email, password, 'EXISTS');
        stats.already++;
      } else {
        console.log(chalk.yellow(`[ ! ] WARNING | ${email} | ${password} | ERROR ${AUTHOR}`));
        saveResult(email, password, 'FAIL', 'Unexpected response');
        stats.fail++;
      }

    } catch (err) {
      console.log(chalk.yellow(`[ ! ] WARNING | ${email} | ${password} | ERROR ${AUTHOR}`));
      saveResult(email, password, 'ERROR', err.message);
      stats.fail++;
      log(`ERROR: ${err.message}`);
    } finally {
      if (browser) {
        try { await browser.close(); log('Browser closed'); }
        catch (e) { log(`Failed to close browser: ${e.message}`); }
      }
    }

    if (i < accounts.length - 1) await new Promise(r => setTimeout(r, 3000));
  }

  // === FINAL SUMMARY ===
  console.log(chalk.bold('\n[ + ] DONE:'));
  console.log(chalk.green(`    Success: ${stats.success}`));
  console.log(chalk.red(`    Already exists: ${stats.already}`));
  console.log(chalk.yellow(`    Failed: ${stats.fail}\n`));

  log(`FINAL: ${stats.success} success, ${stats.already} exists, ${stats.fail} failed`);

  // === Ask to save results ===
  const save = await ask('[ ? ] Save results to results.txt? (y/n): ');
  if (['y', 'yes', 's', 'sim'].includes(save.toLowerCase())) {
    console.log(chalk.green(`[ + ] Results saved to ${RESULT_FILE}`));
    log('Results saved by user');
  } else {
    if (fs.existsSync(RESULT_FILE)) fs.unlinkSync(RESULT_FILE);
    console.log(chalk.gray('[ ! ] Results discarded.'));
    log('Results discarded');
  }

  console.log(chalk.cyan(`\n[ + ] Full log: ${LOG_FILE}`));
  console.log(chalk.magenta(`\n        Made with love by ${AUTHOR}\n`));
  log('Script finished');
  rl.close();
})();