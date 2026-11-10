---
name: rilascio
description: Prepara e pubblica un rilascio dell'app to-do. Esegue i test e la build, fa il commit delle modifiche e il push su main su GitHub, chiedendo conferma prima di commit e push. Da usare solo quando l'utente scrive /rilascio.
disable-model-invocation: true
---

Prepara un rilascio di questa app (React + Vite). Rispondi in italiano, in modo breve e chiaro.

## 1. Controlla lo stato

- Esegui `git status -sb` e `git log --oneline -5`.
- Riassumi: su quale branch siamo, quali file sono modificati o nuovi, se ci sono commit non ancora pubblicati.
- Se non c'è niente da rilasciare (nessuna modifica e nessun commit non pubblicato), dillo e fermati.

## 2. Test

- Esegui `npm test`.
- Se qualche test fallisce: mostra quale test, cosa si aspettava e cosa è successo, e **fermati**. Non correggere niente da solo.

## 3. Build

- Esegui `npm run build`.
- Se fallisce: mostra l'errore e **fermati**.

## 4. Commit

- Se ci sono modifiche non committate, mostra `git diff --stat` e proponi un messaggio di commit breve, in inglese, che descriva il cambiamento.
- **Chiedi conferma** del messaggio e di quali file includere prima di fare il commit.
- Non includere mai `node_modules/`, `dist/` o file con password o chiavi.

## 5. Portare su main

- Se siamo già su `main`, passa al punto 6.
- Se siamo su un altro branch, spiega la situazione e **chiedi** se:
  1. unire il branch in `main` in locale (`git checkout main`, `git merge <branch>`), oppure
  2. pubblicare solo il branch e aprire una pull request su GitHub.

## 6. Push

- Mostra cosa verrà pubblicato (`git log --oneline origin/main..HEAD`) e **chiedi conferma** prima del push.
- Esegui `git push`. Non usare mai `--force`.
- Dopo il push, dai il link al repo: https://github.com/Gazzetto83/simple-claude-project

## Regole

- Fermati al primo errore e spiega cosa è successo.
- Non saltare mai i test o i controlli (niente `--no-verify`).
- Non cancellare branch senza chiedere.
- L'avviso `git: 'credential-manager-core' is not a git command` è innocuo: se il push riesce, ignoralo.
