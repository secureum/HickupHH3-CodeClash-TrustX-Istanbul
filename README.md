## Intro
![Pixel Art](./pic.jpg)

Come create an art piece on a 8x8 pixel map canvas for TrustX Istanbul! Register as an individual or team, then start placing pixel colours!

## Sepolia Deployment
- `PixelsMap`: ``
- `X_IST`: ``

## Actions (Basic Explanation)

### Registration
First, join a team by calling `register(uint16 teamNumber)`. Largest team number is 1000 (ie. max 1000 teams). Then, set the team name (minimum of 5 characters) if it isn't already set by other team members by calling `setTeamName(string teamName)`.

### Placing Pixels
Call `placePixels(uint8[] pixels, uint8[] colors, false, "")` where the pixels are the pixel(s) you'd like to draw on, with the corresponding color(s). Please refer to the [colour section](#Colors) for the available colors.

### Placing Mines
Mining a pixel entitles the miner to receive 2x X_IST payable by the next caller on that pixel. Call `placeMines(uint8[] pixels)` to place mines on specified pixels.

### Resetting Pixels
Resetting the pixel resets its data and refunds the caller, provided that you're the pixel's painter. This action is performed by calling `resetPixels()`.

## Actions (Technical Explanation)
Note that actions generally require X_IST tokens that's minted upon registration (subject to availability and rate limits).

### 1. `register()`
Registers caller, thereby receiving some pseudorandom amount of X_IST tokens. Mints equivalent amount to the `PixelsMap` contract.

### 2. `setTeamName()`
Register team name. Minimally 5 characters, immutable once set!

### 3. `placePixels()`
Initialise / replace pixel colour.

### 4. `placeMines()`
Mining a pixel entitles the miner to receive 2x X_IST payable by the next caller on that pixel.

### 5. `resetPixels()`
Resets and refunds a fixed amount of X_IST tokens.

### Note
Miner payments and refunds are subject to the available funds held by the `PixelsMap` contract

## Colours
16 colours in total for simplicity, stored as `uint8`. No validation on value stored, anything larger than 15 will default to white `#FFFFFF`.

| Value | Hexcode | Image |
|:------|:---------|:-:|
| `0` | `#FFFFFF` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/FFFFFF'/></a> |
| `1` | `#F7E7CE` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/F7E7CE'/></a> |
| `2` | `#E81416` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/E81416'/></a> |
| `3` | `#7B3F00` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/7B3F00'/></a> |
| `4` | `#FFA500` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/FFA500'/></a> |
| `5` | `#F6C324` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/F6C324'/></a> |
| `6` | `#FAEB36` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/FAEB36'/></a> |
| `7` | `#79C314` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/79C314'/></a> |
| `8` | `#228B22` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/228B22'/></a> |
| `9` | `#0476D0` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/0476D0'/></a> |
| `10` | `#191970` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/191970'/></a> |
| `11` | `#4B369D` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/4B369D'/></a> |
| `12` | `#70369D` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/70369D'/></a> |
| `13` | `#FF69B4` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/FF69B4'/></a> |
| `14` | `#36454F` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/36454F'/></a> |
| `15` | `#000000` | <a href='#'><img valign='middle' src='https://readme-swatches.vercel.app/000000'/></a> |

## Award Categories
- Banksy: Team that paints the most pixels
- Justin Sun: Wallet holding the most X_IST tokens
- Samczsun: Most creative exploit

## UI Build
```
yarn
npm run dev
```