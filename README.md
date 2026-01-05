# Blackjack Burger

A kid-friendly blackjack game where you collect ingredients to build the ultimate burger meal!

## Game Rules

- **Goal**: Collect all 12 ingredients to complete a burger meal (burger + fries + shake)
- **Start**: Each player gets 10 tokens
- **Each hand**: Wager 1-5 tokens and choose which ingredient you're playing for
- **Win**: Get the ingredient + keep your tokens
- **Blackjack**: Get the ingredient + win bonus tokens equal to your wager!
- **Lose**: Lose your wagered tokens
- **Game Over**: Run out of tokens
- **Victory**: Collect all 12 ingredients!

## Ingredients to Collect

| Burger (6) | Fries (3) | Shake (3) |
|------------|-----------|-----------|
| Top Bun    | Fries     | Cup       |
| Bottom Bun | Ketchup   | Ice Cream |
| Patty      | Salt      | Milk      |
| Cheese     |           |           |
| Lettuce    |           |           |
| Tomato     |           |           |

## Features

- Single player or multiplayer (2-4 players, pass & play)
- Works offline (PWA - can be installed on mobile)
- Pixel art / retro style

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
