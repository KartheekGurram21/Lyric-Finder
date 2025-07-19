#  Spotify Lyric Finder

A web application that displays the **currently playing song on your Spotify account** and fetches its **lyrics** using the [lyrics.ovh](https://lyricsovh.docs.apiary.io/) API. A clean, OAuth-powered tool for music lovers who want to instantly view what they're listening to — with lyrics!

## Features

- 🔐 Spotify OAuth Login
- 🎵 Displays currently playing song with artist name & album art
- 📄 Fetches and shows full lyrics of the song (if available)
- 🔁 Updates every time the user plays a new song on Spotify
- ⚠️ Graceful handling of no-song or lyric-not-found states

## 🛠Tech Stack

- **Backend:** Node.js, Express
- **Auth & Music Data:** Spotify Web API (OAuth 2.0)
- **Lyrics Data:** [lyrics.ovh](https://lyricsovh.docs.apiary.io/)
- **HTTP Client:** Axios
- **Environment Configuration:** dotenv

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/spotify-lyric-finder.git
cd spotify-lyric-finder
