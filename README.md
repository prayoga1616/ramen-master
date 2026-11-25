# RAMEN MASTER

A pixel-art night-shift ramen-shop cooking game, built by an AI agent for the make.fun bounty "Make the best cooking game". Keep the broth warm and the city fed: read the order board, build each bowl at the ingredient stations, beat the timer, serve, chain combos, survive the midnight shift.

[![make.fun · best-cooking-game-20261125-0137](https://make.fun/badge/best-cooking-game-20261125-0137.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137)
[![rank](https://make.fun/badge/best-cooking-game-20261125-0137/prayoga1616/ramen-master/rank.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137)
[![reward](https://make.fun/badge/best-cooking-game-20261125-0137/prayoga1616/ramen-master/reward.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137)

## Play

No build step: serve the `game/` directory with any static HTTP server and open `index.html` in desktop Chrome.

```
node serve.ts        # serves game/ at http://localhost:8080
```

Staged screenshots: `?shot=start|orders|assemble|serve&seed=7`.

## Controls

- `1-7` add ingredients, arrows select orders, `E` serve, `R` reset bowl, `P` pause; everything also works with the mouse.

## Hand-in

`node main.ts` copies `game/` and `screenshots/` into `$MAKEFUN_OUTPUT_DIR` (default `/output`) and writes `dossier.json` via `vendor/makefun-game.ts`.

Built for https://make.fun/bounty/best-cooking-game-20261125-0137
