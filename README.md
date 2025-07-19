# 🎧 Spotify Lyric Finder

**Spotify Lyric Finder** is a Node.js-based web application that shows the **currently playing song on your Spotify account** and fetches its **lyrics** using the [lyrics.ovh](https://lyricsovh.docs.apiary.io/) API.

Perfect for music lovers who want a live, instant display of their music — with lyrics.

---

## 🚀 Features

- 🔐 Login with Spotify via OAuth 2.0
- 🎵 Displays currently playing song details (title, artist, album art)
- 📄 Fetches and displays lyrics for the current song
- ❌ Gracefully handles cases where no song is playing or lyrics are not available
- ⚡ Lightweight backend-only app (HTML generated from Express)

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **OAuth & Music Info:** Spotify Web API
- **Lyrics API:** [lyrics.ovh](https://lyrics.ovh/)
- **HTTP Requests:** Axios
- **Environment Variables:** dotenv

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/spotify-lyric-finder.git
cd spotify-lyric-finder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Add the following redirect URI in app settings:

   ```
   http://localhost:8888/callback
   ```

4. Note down your **Client ID** and **Client Secret**

### 4. Configure Environment Variables

Create a `.env` file in the root folder:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:8888/callback
```

### 5. Start the Server

```bash
node index.js
```

Open your browser and go to:

```
http://localhost:8888
```

---

## 🌐 How It Works

1. Visit `/` and click **Login with Spotify**
2. Authorize the app via Spotify OAuth
3. The app fetches:
   - The currently playing song
   - Song title, artist, album art
4. The app then requests lyrics using [lyrics.ovh](https://lyrics.ovh/)
5. Lyrics are displayed below the song details

---

## 📁 Project Structure

```
spotify-lyric-finder/
├── .env                  # Spotify credentials and redirect URI
├── index.js              # Main server logic
├── package.json          # Project dependencies and scripts
└── README.md             # App documentation
```

---

## 🔍 Example

```
Song: Shape of You
Artist: Ed Sheeran
Album Art: [Image]
Lyrics:
    The club isn't the best place to find a lover...
```

---
